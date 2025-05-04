"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import {
    Grid,
    LayoutDashboard,
    Cuboid
} from 'lucide-react';
import Sidebar from '@/components/Admin/Sidebar/Sidebar';
import MobileSidebar from '@/components/Admin/Sidebar/MobileSidebar';


export default function SuperLayout({ children }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLoggedIn")
        if (!isLogin) {
            router.push("/login")
        }
    }, [])

    // Track window size for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsExpanded(false);
            }
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Menu structure with nested items
    const menuItems = [
        {
            title: 'Dashboard',
            icon: <LayoutDashboard size={20} />,
            path: '/admin',
            hasSubmenu: false
        },
        {
            title: 'Products',
            icon: <Cuboid size={20} />,
            path: '/admin/products',
            hasSubmenu: false
        },
    ];

    const [menu, setMenu] = useState(menuItems);

    // Toggle sidebar expansion
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    // Toggle mobile drawer
    const toggleMobileDrawer = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };
    return (
        <div className="flex h-screen fixed w-full">
            {/* Desktop Sidebar */}
            <Sidebar
                isExpanded={isExpanded}
                toggleSidebar={toggleSidebar}
                menu={menu}
                setMenu={setMenu}
            />

            {/* Mobile Sidebar Button */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <button
                    onClick={toggleMobileDrawer}
                    className="bg-emerald-500 text-white p-4 rounded-full shadow-lg"
                >
                    <Grid size={24} />
                </button>
            </div>

            {/* Mobile Drawer Sidebar */}
            <MobileSidebar
                isOpen={mobileDrawerOpen}
                toggleDrawer={toggleMobileDrawer}
                menu={menu}
                setMenu={setMenu}
            />

            {/* Main Content */}
            <div className={`flex-1 p-10 text-black overflow-auto`}>
                {children}
            </div>
        </div>
    );
}
