"use client"

import { useState, useEffect } from 'react';
import {
  Home,
  ChevronRight,
  ChevronLeft,
  Plus,
  Users,
  Layers,
  Target,
  Search,
  User,
  X,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Project configuration data
const projects = {
  garnaco: {
    id: 'garnaco',
    title: 'Product Customizer',
    icon: <Target size={20} />,
    color: 'bg-red-500',
    content: {
      icon: <Target size={16} />,
      gradient: 'from-red-500 to-pink-500',
      sections: [
        {
          title: 'Home',
          items: [
            { id: 'dashboard', icon: <Home size={18} />, label: 'Dashboard', path: "/super" },
            { id: 'admin', icon: <Users size={18} />, label: 'Admin', path: "/super/admins" },
          ]
        }
      ]
    }
  },
  add: {
    id: 'add',
    title: 'Add Project',
    icon: <Plus size={20} />,
    color: 'bg-gray-200 text-gray-600',
    content: {
      icon: <Plus size={16} />,
      color: 'bg-gray-200',
      isForm: true
    }
  }
};

const mainSidebarItems = Object.values(projects);

const SuperAdminSidebar = () => {
  const [activeProject, setActiveProject] = useState('garnaco');
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');
  const [activeTeam, setActiveTeam] = useState(null);
  const [isTeamExpanded, setIsTeamExpanded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [secondarySidebarCollapsed, setSecondarySidebarCollapsed] = useState(false);
  const [projectSectionCollapsed, setProjectSectionCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };

    handleResize();
    const path = window.location.pathname;
    setCurrentPath(path);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  const handleProjectClick = (projectId) => {
    setActiveProject(projectId);
    setActiveSidebarItem('overview');
    if (isMobile) setMobileSidebarOpen(false);
  };

  const handleSidebarItemClick = (itemId, path) => {
    setActiveSidebarItem(itemId);
    router.push(path);
    if (isMobile) setMobileSidebarOpen(false);
  };

  const handleTeamClick = (teamId) => {
    setActiveTeam(teamId === activeTeam ? null : teamId);
  };

  const toggleTeamExpand = () => {
    setIsTeamExpanded(!isTeamExpanded);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleSecondarySidebar = () => {
    setSecondarySidebarCollapsed(!secondarySidebarCollapsed);
  };

  const toggleProjectSection = () => {
    setProjectSectionCollapsed(!projectSectionCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const renderProjectContent = () => {
    const project = projects[activeProject];
    if (!project) return null;

    if (secondarySidebarCollapsed) {
      return (
        <div className="flex flex-col items-center py-6 h-full">
          <div className="mb-4 border-b pb-4">
            <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${project.content.gradient} flex items-center justify-center text-white shadow-sm`}>
              {project.content.icon}
            </div>
          </div>

          {project.content.sections?.map(section => (
            <div key={section.title} className="flex flex-col items-center space-y-6 flex-grow">
              {section.items.map(item => (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`flex items-center space-x-3 p-2.5 rounded-md cursor-pointer mb-1 transition-colors
                    ${currentPath === item.path
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                      : 'hover:bg-gray-100 text-gray-700'}`}
                  onClick={() => handleSidebarItemClick(item.id, item.path)}
                  title={item.label}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          ))}

          <div className="mt-auto">
            <div
              className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-500 cursor-pointer"
              title="Premium Features"
            >
              <Plus size={16} />
            </div>
          </div>
        </div>
      );
    }

    if (project.content.isForm) {
      return (
        <div className="text-center p-6 w-full max-w-xs">
          <h2 className="font-bold text-lg mb-6">Create New Project</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              className="border border-gray-300 p-2.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select className="border border-gray-300 p-2.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select Category</option>
              <option value="marketing">Marketing</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
            </select>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2.5 rounded-md w-full shadow-sm hover:from-blue-600 hover:to-indigo-600 transition-colors">
              Create Project
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${project.content.gradient} flex items-center justify-center text-white shadow-sm`}>
              {project.content.icon}
            </div>
            <h2 className="font-bold text-lg">{project.title}</h2>
          </div>
          {project.content.sections && (
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-4 py-2 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
            </div>
          )}
        </div>

        {project.content.sections?.map(section => (
          <div key={section.title} className="p-4">
            <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={toggleProjectSection}>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{section.title}</span>
              {projectSectionCollapsed ?
                <ChevronDown size={16} className="text-gray-500" /> :
                <ChevronUp size={16} className="text-gray-500" />
              }
            </div>
            {!projectSectionCollapsed && section.items.map(item => (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center space-x-3 p-2.5 rounded-md cursor-pointer mb-1 transition-colors
                  ${currentPath === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                    : 'hover:bg-gray-100 text-gray-700'}`}
                onClick={() => handleSidebarItemClick(item.id, item.path)}
              >
                <span className={`${currentPath === item.path ? 'text-white' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
                {item.id === 'overview' && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </Link>
            ))}
          </div>
        ))}

        {!project.content.sections && (
          <div className="text-center p-6">
            <div className={`w-16 h-16 rounded-md bg-gradient-to-br ${project.content.gradient} flex items-center justify-center text-white text-xl mx-auto mb-4 shadow-md`}>
              {project.content.icon}
            </div>
            <h2 className="font-bold text-lg mb-2">{project.title}</h2>
            <p className="text-gray-600 text-sm">{project.content.description}</p>
          </div>
        )}

        <div className="mt-auto p-4 border-t">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 relative shadow-sm">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors">
              <X size={16} />
            </button>
            <div className="flex flex-col">
              <h3 className="font-bold text-sm mb-1 text-gray-800">Get Premium Features</h3>
              <p className="text-xs text-gray-600 mb-2">Unlock advanced analytics and more</p>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1.5 rounded-md mt-2 self-start shadow-sm hover:from-blue-600 hover:to-indigo-600 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const MainSidebar = () => (
    <div
      className={`bg-white shadow-md flex flex-col items-center py-6 z-10 transition-all duration-300 ${collapsed ? 'w-16' : 'w-20'
        } ${isMobile ? 'hidden' : 'block'}`}
    >
      <div className="mb-8 relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
          <Layers size={20} />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-5 flex-grow">
        {mainSidebarItems.map((item) => (
          <div
            key={item.id}
            className={`w-10 h-10 rounded-md flex items-center justify-center text-white cursor-pointer transition-all shadow-sm
              ${item.color}
              ${activeProject === item.id ? 'ring-2 ring-blue-400 shadow-md transform scale-110' : 'hover:scale-105'}
            `}
            onClick={() => handleProjectClick(item.id)}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className="mt-auto mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
          <User size={18} />
        </div>
      </div>
    </div>
  );

  const MobileSidebar = () => (
    <div className={`fixed inset-0 z-50 ${mobileSidebarOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileSidebar}></div>
      <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Layers size={18} />
              </div>
              <h2 className="font-bold text-lg">Project Manager</h2>
            </div>
            <button onClick={toggleMobileSidebar} className="p-1 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Project</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm"
              value={activeProject}
              onChange={(e) => handleProjectClick(e.target.value)}
            >
              {mainSidebarItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {renderProjectContent()}
      </div>
    </div>
  );

  const SecondarySidebar = () => (
    <div
      className={`bg-white shadow-md h-full transition-all duration-300 flex flex-col ${secondarySidebarCollapsed ? 'w-16' : 'w-64'
        } ${collapsed ? 'border-l border-gray-200' : ''
        } ${isMobile ? 'hidden' : 'block'
        }`}
    >
      <div className="relative">
        <button
          onClick={toggleSecondarySidebar}
          className="absolute -left-3 top-8 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          {secondarySidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {renderProjectContent()}
    </div>
  );

  return (
    <div>
      <div className='flex h-screen bg-gray-100'>
        {/* Mobile Sidebar Toggle */}
        {isMobile && (
          <button
            onClick={toggleMobileSidebar}
            className="fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md md:hidden"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Mobile Sidebar */}
        <MobileSidebar />

        {/* Main Sidebar */}
        <MainSidebar />

        {/* Secondary Sidebar */}
        <SecondarySidebar />
      </div>
    </div>
  );
};

export default SuperAdminSidebar;