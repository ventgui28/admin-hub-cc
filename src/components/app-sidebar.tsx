"use client"

import * as React from "react"
import {
  Camera,
  Bot,
  Building2,
  ClipboardList,
  Home,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const data = {
  navMain: [
    {
      title: "Início",
      url: "/",
      icon: Home,
    },
    {
      title: "Provas",
      url: "/races",
      icon: Calendar,
    },
    {
      title: "Fotos e Logos",
      url: "/vault",
      icon: Camera,
    },
    {
      title: "Textos e Legendas",
      url: "/texts",
      icon: ClipboardList,
    },
    {
      title: "Atletas",
      url: "/athletes",
      icon: Users,
    },
    {
      title: "Patrocinadores",
      url: "/sponsors",
      icon: Building2,
    },
    {
      title: "Estilos de IA",
      url: "/prompts",
      icon: Bot,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-sidebar-border shadow-none relative">
      <SidebarHeader className={`bg-sidebar/80 backdrop-blur-xl transition-all duration-500 border-b border-sidebar-border relative overflow-hidden flex flex-col ${isCollapsed ? 'py-6 px-0 items-center justify-center' : 'py-8 px-6'}`}>
        {/* Subtle Glow Effect */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />
        
        <div className={`flex items-center relative z-10 transition-all duration-500 ${isCollapsed ? 'justify-center w-full' : 'gap-4'}`}>
          <div className={`flex items-center justify-center rounded-2xl transition-all duration-500 ${isCollapsed ? 'h-10 w-10 bg-primary/5' : 'h-12 w-12 bg-primary/10 shadow-inner'}`}>
            <Home className={`${isCollapsed ? 'h-6 w-6 text-primary' : 'h-6 w-6 text-primary'} transition-all duration-500`} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden animate-reveal">
              <span className="truncate font-black text-xl leading-none uppercase tracking-tighter italic text-foreground">
                Cantanhede
              </span>
              <span className="truncate text-[9px] font-black opacity-50 uppercase tracking-[0.3em] mt-2 ml-0.5 text-foreground">
                Cycling Admin
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-6 bg-sidebar/40 backdrop-blur-3xl">
        <SidebarGroup className={isCollapsed ? "px-0" : "px-2"}>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-6 text-[10px] font-black uppercase tracking-[0.25em] text-foreground/30 mb-5 animate-reveal">
              Plataforma
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className={`gap-2 ${isCollapsed ? 'px-0' : 'px-4'}`}>
              {data.navMain.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className={isCollapsed ? "flex justify-center w-full" : ""}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      className={isCollapsed ? "mx-auto" : ""}
                      render={
                        <Link
                          href={item.url}
                          className={`transition-all duration-500 group relative overflow-hidden flex items-center rounded-2xl ${
                            isCollapsed ? 'h-10 w-10 px-0 justify-center' : 'h-12 px-5 gap-4 w-full'
                          } ${
                            isActive 
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                              : "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground"
                          }`}
                        >
                          <item.icon className={`transition-all duration-500 ${isCollapsed ? 'h-5 w-5' : 'h-5 w-5'} ${
                            isActive ? 'scale-110' : 'group-hover:scale-110 text-primary/60 group-hover:text-primary'
                          }`} />
                          {!isCollapsed && (
                            <span className={`text-sm tracking-tight animate-reveal ${isActive ? 'font-black uppercase italic text-[11px]' : 'font-bold'}`}>
                              {item.title}
                            </span>
                          )}
                          {!isActive && !isCollapsed && (
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                              <ArrowRight className="h-3 w-3" />
                            </div>
                          )}
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={`p-4 border-t border-sidebar-border bg-sidebar/40 backdrop-blur-xl ${isCollapsed ? 'px-0 flex justify-center' : 'flex items-center justify-between'}`}>
        {!isCollapsed && (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Toggle View</span>
          </div>
        )}
        <SidebarTrigger className={`transition-all duration-300 ${isCollapsed ? 'h-10 w-10 rounded-2xl' : 'h-10 px-4 rounded-xl border border-sidebar-border hover:bg-primary hover:text-white shadow-sm'}`} />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
