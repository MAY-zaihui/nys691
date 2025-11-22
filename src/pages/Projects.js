import React, { useState, useEffect } from 'react';
import { projectService } from '../services/database';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getProjects();
      if (data.length === 0) {
        // 添加示例数据
        const sampleProjects = [
          {
            id: 1,
            title: '电商管理平台',
            description: '基于React和Node.js的全栈电商管理系统，包含商品管理、订单处理、用户管理等功能。',
            image: 'https://via.placeholder.com/300x200',
            technologies: ['React', 'Node.js', 'MongoDB'],
            category: 'web',
            demo_url: '#',
            github_url: '#'
          },
          {
            id: 2,
            title: '移动天气应用',
            description: '使用React Native开发的跨平台天气应用，支持实时天气查询和预报功能。',
            image: 'https://via.placeholder.com/300x200',
            technologies: ['React Native', 'API Integration'],
            category: 'mobile',
            demo_url: '#',
            github_url: '#'
          },
          {
            id: 3,
            title: '数据可视化工具',
            description: '基于D3.js的数据可视化平台，支持多种图表类型和实时数据更新。',
            image: 'https://via.placeholder.com/300x200',
            technologies: ['D3.js', 'React', 'WebSocket'],
            category: 'data',
            demo_url: '#',
            github_url: '#'
          }
        ];
        setProjects(sampleProjects);
      } else {
        setProjects(data);
      }
    } catch (error) {
      console.error('加载项目失败:', error);
      // 使用示例数据作为后备
      setProjects([
        {
          id: 1,
          title: '示例项目',
          description: '这是一个示例项目描述。',
          image: 'https://via.placeholder.com/300x200',
          technologies: ['React', 'Supabase'],
          category: 'web',
          demo_url: '#',
          github_url: '#'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = [
    { value: 'all', label: '全部' },
    { value: 'web', label: 'Web应用' },
    { value: 'mobile', label: '移动应用' },
    { value: 'data', label: '数据可视化' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          项目展示
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          这里展示了我在不同技术领域的项目作品，每个项目都体现了对技术的深入理解和对用户体验的关注。
        </p>
      </div>

      {/* 分类筛选 */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === category.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 项目网格 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                {project.demo_url && (
                  <a 
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-blue-600 font-medium"
                  >
                    查看演示 →
                  </a>
                )}
                {project.github_url && (
                  <a 
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    源代码 →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            该分类下暂无项目
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;