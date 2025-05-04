// components/SidebarItem.js
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation'

export default function SidebarItem({ item, index, isExpanded, toggleSubmenu, toggleNestedSubmenu }) {
    const router = useRouter()
    const pathName = usePathname()
    const handleClick = (path) => {
        if (path) {
            router.push(path)
        }
    }

    return (
        <div>
            <div
                className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer
        ${item.submenuOpen && item.hasSubmenu ? 'bg-gray-800' : ''}
        ${item.path === pathName ? 'text-emerald-400' : 'text-white'}`}
                onClick={() => item.hasSubmenu ? toggleSubmenu() : handleClick(item.path)}
            >
                <div className={`${!isExpanded ? 'mx-auto' : ''}`}>
                    {item.icon}
                </div>
                {isExpanded && (
                    <>
                        <span className="ml-3">{item.title}</span>
                        {item.hasSubmenu && (
                            <div className="ml-auto">
                                {item.submenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Submenu Items */}
            {isExpanded && item.hasSubmenu && item.submenuOpen && (
                <div className="bg-gray-900">
                    {item.submenu.map((subItem, subIndex) => (
                        <div key={subIndex}>
                            {/* Check if this is a nested submenu or a regular submenu item */}
                            {subItem.submenu ? (
                                <>
                                    <div
                                        className="flex items-center px-4 py-3 pl-12 hover:bg-gray-800 cursor-pointer"
                                        onClick={() => toggleNestedSubmenu(subIndex)}
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
    );
}