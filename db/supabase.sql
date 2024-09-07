-- Enable UUID generation extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop the existing users table if it exists
DROP TABLE IF EXISTS auth.users CASCADE;

-- Recreate the users table with UUID auto-generation
CREATE TABLE auth.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  encrypted_password TEXT NOT NULL
);

-- Create profiles table
DROP TABLE IF EXISTS profiles;
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  github_username TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create challenges table
DROP TABLE IF EXISTS challenges;
CREATE TABLE challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Expert')),
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  buy_in DECIMAL(10, 2),
  prize_pool DECIMAL(10, 2),
  github_repo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on challenges
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Create teams table
DROP TABLE IF EXISTS teams;
CREATE TABLE teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on teams
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Create team_members table
DROP TABLE IF EXISTS team_members;
CREATE TABLE team_members (
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES auth.users(id),
  role TEXT CHECK (role IN ('Leader', 'Member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (team_id, user_id)
);

-- Enable RLS on team_members
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create enrollments table
DROP TABLE IF EXISTS enrollments;
CREATE TABLE enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  challenge_id UUID REFERENCES challenges(id),
  team_id UUID REFERENCES teams(id),
  status TEXT CHECK (status IN ('Enrolled', 'In Progress', 'Completed', 'Disqualified')),
  score DECIMAL(5, 2),
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on enrollments
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Create leaderboard table
DROP TABLE IF EXISTS leaderboard;
CREATE TABLE leaderboard (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  team_id UUID REFERENCES teams(id),
  challenge_id UUID REFERENCES challenges(id),
  score DECIMAL(5, 2),
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on leaderboard
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create achievements table
DROP TABLE IF EXISTS achievements;
CREATE TABLE achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT
);

-- Enable RLS on achievements
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create user_achievements table
DROP TABLE IF EXISTS user_achievements;
CREATE TABLE user_achievements (
  user_id UUID REFERENCES auth.users(id),
  achievement_id UUID REFERENCES achievements(id),
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, achievement_id)
);

-- Enable RLS on user_achievements
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Create wallet table
DROP TABLE IF EXISTS wallet;
CREATE TABLE wallet (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  balance DECIMAL(10, 2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on wallet
ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;

-- Create transactions table
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  amount DECIMAL(10, 2),
  type TEXT CHECK (type IN ('Deposit', 'Withdrawal', 'Prize', 'Buy-in')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Challenges: All users can view challenges, only admins can create/update
CREATE POLICY "Challenges are viewable by everyone" ON challenges
  FOR SELECT USING (true);

CREATE POLICY "Only admins can create challenges" ON challenges
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update challenges" ON challenges
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Teams: All users can view teams, team members can update
CREATE POLICY "Teams are viewable by everyone" ON teams
  FOR SELECT USING (true);

CREATE POLICY "Team members can update team info" ON teams
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
        AND team_members.user_id = auth.uid()
    )
  );

-- Team Members: Team members can view their team, users can join teams
CREATE POLICY "Team members can view their team" ON team_members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can join teams" ON team_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enrollments: Users can view and create their own enrollments
CREATE POLICY "Users can view own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Leaderboard: Everyone can view leaderboard
CREATE POLICY "Leaderboard is viewable by everyone" ON leaderboard
  FOR SELECT USING (true);

-- Achievements: Everyone can view achievements
CREATE POLICY "Achievements are viewable by everyone" ON achievements
  FOR SELECT USING (true);

-- User Achievements: Users can view their own achievements
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Wallet: Users can view and update their own wallet
CREATE POLICY "Users can view own wallet" ON wallet
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own wallet" ON wallet
  FOR UPDATE USING (auth.uid() = user_id);

-- Transactions: Users can view their own transactions
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Sample Data

-- Insert sample users (UUIDs are automatically generated)
INSERT INTO auth.users (email, encrypted_password) VALUES
  ('alice@example.com', 'hashed_password'),
  ('bob@example.com', 'hashed_password');

-- Insert sample profiles
INSERT INTO profiles (id, username, full_name, avatar_url) VALUES
  ((SELECT id FROM auth.users WHERE email = 'alice@example.com'), 'alice', 'Alice Johnson', 'https://example.com/alice.jpg'),
  ((SELECT id FROM auth.users WHERE email = 'bob@example.com'), 'bob', 'Bob Smith', 'https://example.com/bob.jpg');

-- Insert sample challenges
INSERT INTO challenges (title, description, difficulty, start_time, end_time, max_participants, buy_in, prize_pool) VALUES
  ('AI Image Recognition Sprint', 'Build an AI model to recognize objects in images', 'Medium', '2024-04-01 10:00:00+00', '2024-04-01 10:30:00+00', 100, 50.00, 5000.00),
  ('NLP Challenge: Sentiment Analysis', 'Create a sentiment analysis model for social media posts', 'Hard', '2024-04-15 14:00:00+00', '2024-04-15 15:00:00+00', 50, 100.00, 10000.00);

-- Insert sample teams
INSERT INTO teams (name, description, created_by) VALUES
  ('Neural Ninjas', 'Masters of neural networks', (SELECT id FROM auth.users WHERE email = 'alice@example.com')),
  ('Data Dragons', 'Breathing fire into data science', (SELECT id FROM auth.users WHERE email = 'bob@example.com'));

-- Insert sample team members
INSERT INTO team_members (team_id, user_id, role) VALUES
  ((SELECT id FROM teams WHERE name = 'Neural Ninjas'), (SELECT id FROM auth.users WHERE email = 'alice@example.com'), 'Leader'),
  ((SELECT id FROM teams WHERE name = 'Data Dragons'), (SELECT id FROM auth.users WHERE email = 'bob@example.com'), 'Leader');

-- Insert sample enrollments
INSERT INTO enrollments (user_id, challenge_id, team_id, status, score) VALUES
  ((SELECT id FROM auth.users WHERE email = 'alice@example.com'), (SELECT id FROM challenges LIMIT 1), (SELECT id FROM teams WHERE name = 'Neural Ninjas'), 'Completed', 95.5),
  ((SELECT id FROM auth.users WHERE email = 'bob@example.com'), (SELECT id FROM challenges LIMIT 1), (SELECT id FROM teams WHERE name = 'Data Dragons'), 'Completed', 92.0);

-- Insert sample leaderboard entries
INSERT INTO leaderboard (user_id, team_id, challenge_id, score, rank) VALUES
  ((SELECT id FROM auth.users WHERE email = 'alice@example.com'), (SELECT id FROM teams WHERE name = 'Neural Ninjas'), (SELECT id FROM challenges LIMIT 1), 95.5, 1),
  ((SELECT id FROM auth.users WHERE email = 'bob@example.com'), (SELECT id FROM teams WHERE name = 'Data Dragons'), (SELECT id FROM challenges LIMIT 1), 92.0, 2);

-- Insert sample achievements
INSERT INTO achievements (name, description, icon_url) VALUES
  ('First Blood', 'Complete your first challenge', 'https://example.com/icons/first_blood.png'),
  ('Team Player', 'Join a team', 'https://example.com/icons/team_player.png');

-- Insert sample user achievements
INSERT INTO user_achievements (user_id, achievement_id) VALUES
  ((SELECT id FROM auth.users WHERE email = 'alice@example.com'), (SELECT id FROM achievements WHERE name = 'First Blood')),
  ((SELECT id FROM auth.users WHERE email = 'bob@example.com'), (SELECT id FROM achievements WHERE name = 'Team Player'));

-- Insert sample wallet data
INSERT INTO wallet (user_id, balance) VALUES
  ((SELECT id FROM auth.users WHERE email = 'alice@example.com'), 1000.00),
  ((SELECT id FROM auth.users WHERE email = 'bob@example.com'), 750.00);

-- Insert sample transactions
INSERT INTO transactions (user_id, amount, type, description) VALUES
  ((SELECT id FROM auth.users WHERE email = 'alice@example.com'), 1000.00, 'Deposit', 'Initial deposit'),
  ((SELECT id FROM auth.users WHERE email = 'alice@example.com'), -50.00, 'Buy-in', 'Challenge entry fee'),
  ((SELECT id FROM auth.users WHERE email = 'bob@example.com'), 750.00, 'Deposit', 'Initial deposit'),
  ((SELECT id FROM auth.users WHERE email = 'bob@example.com'), -50.00, 'Buy-in', 'Challenge entry fee');
