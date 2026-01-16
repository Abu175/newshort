'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Home, FileText, Youtube, Users, Instagram, Facebook, Twitter, Linkedin, BarChart2, Globe, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react'

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside
            className={`bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col relative flex-shrink-0 h-screen select-none border-r border-gray-200 ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between space-x-2'}`}>
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex-shrink-0"></div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 whitespace-nowrap overflow-hidden">
                            Blogify
                        </span>
                    )}
                </div>
            </div>

            {/* Toggle Button - positioned absolutely to stick to the edge */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-8 bg-white border border-gray-200 p-1 rounded-full shadow-md text-gray-500 hover:text-blue-600 z-10"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <nav className="flex-1 overflow-y-auto px-4 space-y-6 mt-4 flex flex-col w-full">
                <NavSection title="Content" isCollapsed={isCollapsed}>
                    <NavItem icon={<Home size={20} />} label="Dashboard" href="/uploader" active isCollapsed={isCollapsed} />
                    <NavItem icon={<Gamepad2 size={20} />} label="Playground" href="/playground" isCollapsed={isCollapsed} />
                    <NavItem icon={<FileText size={20} />} label="Posts" href="#" isCollapsed={isCollapsed} />
                    <NavItem icon={<Youtube size={20} />} label="Videos" href="#" isCollapsed={isCollapsed} />
                    <NavItem icon={<Users size={20} />} label="Authors" href="#" isCollapsed={isCollapsed} />
                </NavSection>

                <NavSection title="Social Media" isCollapsed={isCollapsed}>
                    <NavItem icon={<Youtube size={20} />} label="YouTube" href="#" isCollapsed={isCollapsed} />
                    <NavItem icon={<Instagram size={20} />} label="Instagram" href="#" isCollapsed={isCollapsed} />
                    <NavItem icon={<Facebook size={20} />} label="Facebook" href="#" isCollapsed={isCollapsed} />
                    <NavItem icon={<Twitter size={20} />} label="Twitter" href="#" isCollapsed={isCollapsed} />
                    <NavItem icon={<Linkedin size={20} />} label="LinkedIn" href="#" isCollapsed={isCollapsed} />
                </NavSection>

                <NavSection title="Analytics" isCollapsed={isCollapsed}>
                    <NavItem icon={<BarChart2 size={20} />} label="Overview" href="#" isCollapsed={isCollapsed} />
                    <NavItem icon={<Globe size={20} />} label="Traffic Sources" href="#" isCollapsed={isCollapsed} />
                </NavSection>
            </nav>
        </aside>
    )
}

interface NavSectionProps {
    title: string;
    children: React.ReactNode;
    isCollapsed: boolean;
}

function NavSection({ title, children, isCollapsed }: NavSectionProps) {
    return (
        <div className="space-y-2">
            {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 whitespace-nowrap transition-opacity duration-200">
                    {title}
                </h3>
            )}
            {isCollapsed && <div className="h-px bg-gray-100 my-2 mx-2"></div>}
            <div className="space-y-1">
                {children}
            </div>
        </div>
    )
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    active?: boolean;
    isCollapsed: boolean;
}

function NavItem({ icon, label, href, active = false, isCollapsed }: NavItemProps) {
    return (
        <Link
            href={href}
            className={`flex items-center p-2 rounded-md transition-all duration-200 group relative ${active
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
                } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
            title={isCollapsed ? label : undefined}
        >
            <span className="flex-shrink-0">{icon}</span>
            {!isCollapsed && (
                <span className="text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-200 delay-75">
                    {label}
                </span>
            )}

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {label}
                </div>
            )}
        </Link>
    )
}
