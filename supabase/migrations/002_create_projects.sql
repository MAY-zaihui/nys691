-- 创建项目表
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  technologies TEXT[],
  category TEXT DEFAULT 'web',
  demo_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入示例项目数据
INSERT INTO projects (title, description, technologies, category) VALUES 
('电商管理平台', '基于React和Node.js的全栈电商管理系统，包含商品管理、订单处理、用户管理等功能。', 
ARRAY['React', 'Node.js', 'MongoDB'], 'web'),
('移动天气应用', '使用React Native开发的跨平台天气应用，支持实时天气查询和预报功能。', 
ARRAY['React Native', 'API Integration'], 'mobile'),
('数据可视化工具', '基于D3.js的数据可视化平台，支持多种图表类型和实时数据更新。', 
ARRAY['D3.js', 'React', 'WebSocket'], 'data');

-- 创建更新时间触发器
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE
    ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();