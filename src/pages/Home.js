import React, { useState, useEffect } from 'react';
import { profileService } from '../services/database';
import { Link } from 'react-router-dom';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('加载个人信息失败:', error);
      // 设置默认数据
      setProfile({
        name: '张三',
        title: '全栈开发工程师',
        bio: '热爱编程，专注于现代Web应用开发。熟练掌握React、Node.js、Supabase等技术栈。',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Supabase', 'Tailwind CSS'],
        avatar: 'https://via.placeholder.com/150'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* 英雄区域 */}
      <section className="text-center mb-16">
        <div className="mb-8">
          <img 
            src={profile?.avatar || 'https://via.placeholder.com/150'} 
            alt="个人头像" 
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          你好，我是 {profile?.name || '开发者'}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {profile?.title || '全栈开发工程师'}
        </p>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          {profile?.bio || '欢迎来到我的个人作品集网站！'}
        </p>
        <div className="space-x-4">
          <Link 
            to="/projects" 
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            查看项目
          </Link>
          <Link 
            to="/contact" 
            className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            联系我
          </Link>
        </div>
      </section>

      {/* 技能展示 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          技能专长
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {profile?.skills?.map((skill, index) => (
            <span 
              key={index}
              className="bg-secondary text-white px-6 py-3 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 特色服务 */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">快速开发</h3>
          <p className="text-gray-600">
            使用现代技术栈，快速构建高质量Web应用
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">创新设计</h3>
          <p className="text-gray-600">
            注重用户体验，打造美观实用的界面设计
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">技术支持</h3>
          <p className="text-gray-600">
            提供完整的技术方案和持续的维护支持
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;