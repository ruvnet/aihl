-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
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
CREATE TABLE teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on teams
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Create team_members table
CREATE TABLE team_members (
  team_id UUID REFERENCES teams,
  user_id UUID REFERENCES auth.users,
  role TEXT CHECK (role IN ('Leader', 'Member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (team_id, user_id)
);

-- Enable RLS on team_members
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create enrollments table
CREATE TABLE enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  challenge_id UUID REFERENCES challenges,
  team_id UUID REFERENCES teams,
  status TEXT CHECK (status IN ('Enrolled', 'In Progress', 'Completed', 'Disqualified')),
  score DECIMAL(5, 2),
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on enrollments
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Create leaderboard table
CREATE TABLE leaderboard (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  team_id UUID REFERENCES teams,
  challenge_id UUID REFERENCES challenges,
  score DECIMAL(5, 2),
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on leaderboard
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create achievements table
CREATE TABLE achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT
);

-- Enable RLS on achievements
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create user_achievements table
CREATE TABLE user_achievements (
  user_id UUID REFERENCES auth.users,
  achievement_id UUID REFERENCES achievements,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, achievement_id)
);

-- Enable RLS on user_achievements
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Create wallet table
CREATE TABLE wallet (
  user_id UUID REFERENCES auth.users PRIMARY KEY,
  balance DECIMAL(10, 2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on wallet
ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;

-- Create transactions table
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
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

-- Insert sample users (passwords should be hashed in a real scenario)
INSERT INTO auth.users (id, email, encrypted_password) VALUES
  ('d7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', 'alice@example.com', 'hashed_password'),
  ('b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', 'bob@example.com', 'hashed_password');

-- Insert sample profiles
INSERT INTO profiles (id, username, full_name, avatar_url) VALUES
  ('d7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', 'alice', 'Alice Johnson', 'https://example.com/alice.jpg'),
  ('b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', 'bob', 'Bob Smith', 'https://example.com/bob.jpg');

-- Insert sample challenges
INSERT INTO challenges (title, description, difficulty, start_time, end_time, max_participants, buy_in, prize_pool) VALUES
  ('AI Image Recognition Sprint', 'Build an AI model to recognize objects in images', 'Medium', '2024-04-01 10:00:00+00', '2024-04-01 10:30:00+00', 100, 50.00, 5000.00),
  ('NLP Challenge: Sentiment Analysis', 'Create a sentiment analysis model for social media posts', 'Hard', '2024-04-15 14:00:00+00', '2024-04-15 15:00:00+00', 50, 100.00, 10000.00);

-- Insert sample teams
INSERT INTO teams (id, name, description, created_by) VALUES
  ('a1b2c3d4-e5f6-4g7h-8i9j-0k1l2m3n4o5p', 'Neural Ninjas', 'Masters of neural networks', 'd7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c'),
  ('b2c3d4e5-f6g7-5h8i-9j0k-1l2m3n4o5p6q', 'Data Dragons', 'Breathing fire into data science', 'b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h');

-- Insert sample team members
INSERT INTO team_members (team_id, user_id, role) VALUES
  ('a1b2c3d4-e5f6-4g7h-8i9j-0k1l2m3n4o5p', 'd7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', 'Leader'),
  ('b2c3d4e5-f6g7-5h8i-9j0k-1l2m3n4o5p6q', 'b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', 'Leader');

-- Insert sample enrollments
INSERT INTO enrollments (user_id, challenge_id, team_id, status, score) VALUES
  ('d7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', (SELECT id FROM challenges LIMIT 1), 'a1b2c3d4-e5f6-4g7h-8i9j-0k1l2m3n4o5p', 'Completed', 95.5),
  ('b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', (SELECT id FROM challenges LIMIT 1), 'b2c3d4e5-f6g7-5h8i-9j0k-1l2m3n4o5p6q', 'Completed', 92.0);

-- Insert sample leaderboard entries
INSERT INTO leaderboard (user_id, team_id, challenge_id, score, rank) VALUES
  ('d7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', 'a1b2c3d4-e5f6-4g7h-8i9j-0k1l2m3n4o5p', (SELECT id FROM challenges LIMIT 1), 95.5, 1),
  ('b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', 'b2c3d4e5-f6g7-5h8i-9j0k-1l2m3n4o5p6q', (SELECT id FROM challenges LIMIT 1), 92.0, 2);

-- Insert sample achievements
INSERT INTO achievements (name, description, icon_url) VALUES
  ('First Blood', 'Complete your first challenge', 'https://example.com/icons/first_blood.png'),
  ('Team Player', 'Join a team', 'https://example.com/icons/team_player.png');

-- Insert sample user achievements
INSERT INTO user_achievements (user_id, achievement_id) VALUES
  ('d7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', (SELECT id FROM achievements WHERE name = 'First Blood')),
  ('b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', (SELECT id FROM achievements WHERE name = 'Team Player'));

-- Insert sample wallet data
INSERT INTO wallet (user_id, balance) VALUES
  ('d7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', 1000.00),
  ('b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', 750.00);

-- Insert sample transactions
INSERT INTO transactions (user_id, amount, type, description) VALUES
  ('d7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', 1000.00, 'Deposit', 'Initial deposit'),
  ('d7bed83c-bf83-4ce1-8f5b-46c4c8a36b6c', -50.00, 'Buy-in', 'Challenge entry fee'),
  ('b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', 750.00, 'Deposit', 'Initial deposit'),
  ('b5f3f6b3-5d6a-4d7e-9a8b-8c9d0e1f2g3h', -50.00, 'Buy-in', 'Challenge entry fee');