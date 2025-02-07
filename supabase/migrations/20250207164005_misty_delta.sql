/*
  # Initial Schema Setup for Tukang Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tukangs`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `skills` (text[])
      - `location` (text)
      - `min_price` (integer)
      - `max_price` (integer)
      - `whatsapp` (text)
      - `about` (text)
      - `rating` (numeric)
      - `jobs_completed` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `ratings`
      - `id` (uuid, primary key)
      - `tukang_id` (uuid, references tukangs)
      - `user_id` (uuid, references profiles)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tukangs table
CREATE TABLE IF NOT EXISTS tukangs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  skills text[] NOT NULL DEFAULT '{}',
  location text NOT NULL,
  min_price integer NOT NULL,
  max_price integer NOT NULL,
  whatsapp text NOT NULL,
  about text,
  rating numeric DEFAULT 0,
  jobs_completed integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tukang_id uuid REFERENCES tukangs ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tukangs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Tukangs policies
CREATE POLICY "Tukang profiles are viewable by everyone"
  ON tukangs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create tukang profile"
  ON tukangs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Tukangs can update own profile"
  ON tukangs FOR UPDATE
  TO authenticated
  USING (auth.uid() = profile_id);

-- Ratings policies
CREATE POLICY "Ratings are viewable by everyone"
  ON ratings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update tukang rating
CREATE OR REPLACE FUNCTION update_tukang_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tukangs
  SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM ratings
    WHERE tukang_id = NEW.tukang_id
  )
  WHERE id = NEW.tukang_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating tukang rating
CREATE TRIGGER update_tukang_rating_trigger
AFTER INSERT OR UPDATE ON ratings
FOR EACH ROW
EXECUTE FUNCTION update_tukang_rating();