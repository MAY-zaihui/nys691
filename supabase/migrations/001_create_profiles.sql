-- 创建个人信息表
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar TEXT,
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入默认个人信息
INSERT INTO profiles (name, title, bio, skills) VALUES 
('张三', '全栈开发工程师', '热爱编程，专注于现代Web应用开发。熟练掌握React、Node.js、Supabase等技术栈。', 
ARRAY['JavaScript', 'React', 'Node.js', 'Python', 'Supabase', 'Tailwind CSS']);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE
    ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();