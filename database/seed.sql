-- Seed Initial Lessons Data
-- Run this in Supabase SQL Editor to populate lessons

-- Python Lessons
INSERT INTO public.lessons (id, title, slug, language, level, category, description, content, duration_minutes, order_index, points_reward, status) VALUES
('python-1', 'Introduction to Python', 'intro-to-python', 'python', 'beginner', 'basics', 'Learn Python basics and syntax', 'Introduction to Python programming language', 30, 1, 10, 'published'),
('python-2', 'Variables and Data Types', 'variables-data-types', 'python', 'beginner', 'basics', 'Understanding Python data types', 'Learn about strings, numbers, and booleans', 45, 2, 10, 'published'),
('python-3', 'Control Flow', 'control-flow', 'python', 'beginner', 'basics', 'If statements and loops', 'Master conditional logic and iterations', 50, 3, 15, 'published'),
('python-4', 'Functions', 'functions', 'python', 'intermediate', 'functions', 'Creating and using functions', 'Learn to write reusable code with functions', 60, 4, 15, 'published'),
('python-5', 'Lists and Dictionaries', 'lists-dictionaries', 'python', 'intermediate', 'data-structures', 'Working with collections', 'Master Python data structures', 55, 5, 20, 'published');

-- JavaScript Lessons
INSERT INTO public.lessons (id, title, slug, language, level, category, description, content, duration_minutes, order_index, points_reward, status) VALUES
('javascript-1', 'JavaScript Basics', 'js-basics', 'javascript', 'beginner', 'basics', 'Learn JavaScript fundamentals', 'Introduction to JavaScript', 30, 1, 10, 'published'),
('javascript-2', 'Variables and Scope', 'variables-scope', 'javascript', 'beginner', 'basics', 'Understanding var, let, and const', 'Master JavaScript variables', 40, 2, 10, 'published'),
('javascript-3', 'Functions and Arrow Functions', 'functions-arrows', 'javascript', 'intermediate', 'functions', 'Modern function syntax', 'Learn ES6 function features', 50, 3, 15, 'published'),
('javascript-4', 'Arrays and Objects', 'arrays-objects', 'javascript', 'intermediate', 'data-structures', 'Working with collections', 'Master JS data structures', 60, 4, 15, 'published'),
('javascript-5', 'Async JavaScript', 'async-js', 'javascript', 'advanced', 'async', 'Promises and async/await', 'Handle asynchronous operations', 70, 5, 25, 'published');

-- TypeScript Lessons  
INSERT INTO public.lessons (id, title, slug, language, level, category, description, content, duration_minutes, order_index, points_reward, status) VALUES
('typescript-1', 'TypeScript Basics', 'ts-basics', 'typescript', 'beginner', 'basics', 'Introduction to TypeScript', 'Get started with TypeScript', 35, 1, 10, 'published'),
('typescript-2', 'Type Annotations', 'type-annotations', 'typescript', 'beginner', 'types', 'Adding types to your code', 'Learn TypeScript type system', 45, 2, 15, 'published'),
('typescript-3', 'Interfaces and Types', 'interfaces-types', 'typescript', 'intermediate', 'types', 'Creating custom types', 'Master TypeScript interfaces', 55, 3, 20, 'published');

-- React Lessons
INSERT INTO public.lessons (id, title, slug, language, level, category, description, content, duration_minutes, order_index, points_reward, status) VALUES
('react-1', 'React Fundamentals', 'react-fundamentals', 'react', 'beginner', 'basics', 'Learn React basics', 'Introduction to React', 40, 1, 10, 'published'),
('react-2', 'Components and Props', 'components-props', 'react', 'beginner', 'components', 'Building React components', 'Master component basics', 50, 2, 15, 'published'),
('react-3', 'State and Hooks', 'state-hooks', 'react', 'intermediate', 'hooks', 'useState and useEffect', 'Learn React hooks', 60, 3, 20, 'published');

-- Seed some achievements
INSERT INTO public.achievements (id, name, description, icon, category, criteria_type, criteria_value, rarity, points_reward) VALUES
('first-lesson', 'First Steps', 'Complete your first lesson', '🎯', 'lessons', 'lessons_completed', 1, 'common', 50),
('ten-lessons', 'Learning Streak', 'Complete 10 lessons', '📚', 'lessons', 'lessons_completed', 10, 'rare', 100),
('fifty-lessons', 'Dedicated Learner', 'Complete 50 lessons', '🏆', 'lessons', 'lessons_completed', 50, 'epic', 500),
('week-streak', '7-Day Warrior', 'Maintain a 7-day streak', '🔥', 'streak', 'streak_days', 7, 'rare', 150),
('month-streak', 'Consistency Master', 'Maintain a 30-day streak', '⚡', 'streak', 'streak_days', 30, 'legendary', 1000),
('hundred-points', 'Point Hunter', 'Earn 100 points', '💎', 'points', 'points_earned', 100, 'common', 25),
('thousand-points', 'Point Master', 'Earn 1000 points', '👑', 'points', 'points_earned', 1000, 'epic', 250);

-- Seed some challenges
INSERT INTO public.challenges (id, title, slug, language, difficulty, description, points_reward, status) VALUES
('python-hello', 'Hello World', 'hello-world-python', 'python', 'easy', 'Write your first Python program', 25, 'active'),
('python-calculator', 'Simple Calculator', 'simple-calculator', 'python', 'easy', 'Build a basic calculator', 50, 'active'),
('python-list-ops', 'List Operations', 'list-operations', 'python', 'medium', 'Master Python list manipulation', 75, 'active'),
('js-dom', 'DOM Manipulation', 'dom-manipulation', 'javascript', 'easy', 'Learn to manipulate the DOM', 50, 'active'),
('js-async', 'Async Challenge', 'async-challenge', 'javascript', 'medium', 'Handle async operations', 100, 'active'),
('react-component', 'Build a Component', 'build-component', 'react', 'medium', 'Create a reusable React component', 100, 'active');
