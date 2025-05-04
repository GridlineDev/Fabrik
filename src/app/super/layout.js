"use client"

import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import SuperAdminSidebar from "@/components/SuperAdmin/Sidebar/SuperAdminSidebar";


export default function SuperLayout({ children }) {
    const router = useRouter()
    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLoggedIn")
        if (!isLogin) {
            router.push("/login")
        }
    }, [])
    return (
        <div>
            <main className="flex h-screen w-screen bg-gray-100 fixed">
                <div className="">
                    <SuperAdminSidebar />
                </div>
                <div className="w-full bg-gray-200 p-6 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
