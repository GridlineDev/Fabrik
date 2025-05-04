// components/Sidebar.js
import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  ChevronLeft, 
  LayoutDashboard, 
  LineChart, 
  Grid, 
  BarChart3, 
  ShieldCheck
} from 'lucide-react';

import SidebarItem from './SidebarItem';

export default function Sidebar({ isExpanded, toggleSidebar, menu, setMenu }) {
  // Toggle submenu open/closed
  const toggleSubmenu = (index) => {
    const newMenu = [...menu];
    newMenu[index].submenuOpen = !newMenu[index].submenuOpen;
    setMenu(newMenu);
  };
  
  // Toggle nested submenu
  const toggleNestedSubmenu = (parentIndex, childIndex) => {
    const newMenu = [...menu];
    newMenu[parentIndex].submenu[childIndex].submenuOpen = 
      !newMenu[parentIndex].submenu[childIndex].submenuOpen;
    setMenu(newMenu);
  };

  return (
    <div className={`hidden md:block ${isExpanded ? 'w-64' : 'w-20'} 
      duration-300 ease-in-out bg-gray-900 text-white relative`}>
      
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        {isExpanded && <h1 className="text-4xl font-bold">Fabrik</h1>}
        {!isExpanded && <h1 className="text-xl font-bold mx-auto">Fabrik</h1>}
        <button 
          onClick={toggleSidebar} 
          className="text-emerald-400 p-1 rounded-full hover:bg-gray-800 absolute -right-3 top-10 bg-gray-900"
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
      
      {/* Menu Items */}
      <nav className="mt-2">
        {menu.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            index={index}
            isExpanded={isExpanded}
            toggleSubmenu={() => toggleSubmenu(index)}
            toggleNestedSubmenu={(subIndex) => toggleNestedSubmenu(index, subIndex)}
          />
        ))}
      </nav>
    </div>
  );
}