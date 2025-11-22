import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            我的作品集
          </Link>
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary transition-colors"
              >
                首页
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className="text-gray-700 hover:text-primary transition-colors"
              >
                项目展示
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-primary transition-colors"
              >
                联系我
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;