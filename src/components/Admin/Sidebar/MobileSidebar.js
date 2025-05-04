// components/MobileSidebar.js
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import SidebarItem from './SidebarItem';

export default function MobileSidebar({ isOpen, toggleDrawer, menu, setMenu }) {
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
    <>
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:hidden transition duration-300 ease-in-out z-40 w-64 bg-gray-900 text-white`}>
        
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Balance<span className="text-emerald-400">CX</span></h1>
          <button 
            onClick={toggleDrawer}
            className="text-white p-1 rounded-full hover:bg-gray-800"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        {/* User Profile */}
        <div className="p-4 flex items-center border-b border-gray-700">
          <div className="bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
            <span className="text-white">JK</span>
          </div>
          <div className="ml-3">
            <p className="text-sm">Josh Keeler</p>
            <p className="text-xs text-gray-400">admin</p>
          </div>
          <ChevronDown size={16} className="ml-auto" />
        </div>
        
        {/* Menu Items - Mobile */}
        <nav className="mt-2">
          {menu.map((item, index) => (
            <div key={index}>
              <div 
                className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer
                ${item.submenuOpen && item.hasSubmenu ? 'bg-gray-800' : ''}
                ${item.title === 'Functional Tests' ? 'text-emerald-400' : 'text-white'}`}
                onClick={() => item.hasSubmenu ? toggleSubmenu(index) : null}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
                {item.hasSubmenu && (
                  <div className="ml-auto">
                    {item.submenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                )}
              </div>
              
              {/* Submenu Items */}
              {item.hasSubmenu && item.submenuOpen && (
                <div className="bg-gray-900">
                  {item.submenu.map((subItem, subIndex) => (
                    <div key={subIndex}>
                      {/* Check if this is a nested submenu or a regular submenu item */}
                      {subItem.submenu ? (
                        <>
                          <div 
                            className="flex items-center px-4 py-3 pl-12 hover:bg-gray-800 cursor-pointer"
                            onClick={() => toggleNestedSubmenu(index, subIndex)}
                          >
                            <span className="text-sm">{subItem.title}</span>
                            <div className="ml-auto">
                              {subItem.submenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </div>
                          </div>
                          
                          {/* Nested submenu items */}
                          {subItem.submenuOpen && subItem.submenu.map((nestedItem, nestedIndex) => (
                            <div key={nestedIndex}
                              className="flex items-center px-4 py-2 pl-16 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer"
                            >
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                              <span>{nestedItem.title}</span>
                            </div>
                          ))}
                        </>
                      ) : (
                        // Regular submenu item
                        <div className="flex items-center px-4 py-2 pl-12 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          <span>{subItem.title}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      {/* Mobile overlay when drawer is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
}