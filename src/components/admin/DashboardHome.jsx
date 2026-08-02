import React from 'react';
import { FolderGit2, Cpu, Briefcase, GraduationCap, Bell, LogOut } from 'lucide-react';

export default function DashboardHome({ setActiveTab }) {
  const stats = [
    { id: 'projects', label: 'Projects', count: 'Manage', icon: <FolderGit2 />, desc: 'Update case studies' },
    { id: 'skills', label: 'Skills', count: 'Update', icon: <Cpu />, desc: 'Tech stack & levels' },
    { id: 'experience', label: 'Experience', count: 'Update', icon: <Briefcase />, desc: 'Work history timeline' },
    { id: 'education', label: 'Education', count: 'Manage', icon: <GraduationCap />, desc: 'Degrees & Certs' },
  ];

  const handleLogout = () => {
    if(confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('isAdminLoggedIn');
        window.location.reload();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-row justify-between items-start md:items-center mb-8 gap-2 md:gap-4">
        <div className="mt-1 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Dashboard</h1>
          <p className="text-[#B0B0B0] text-xs md:text-base">Welcome back, Admin.</p>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2 md:gap-4 bg-[#16181C] p-1.5 pr-2 md:p-2 md:pr-4 rounded-full border border-[#B0B0B0]/10">
            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[#B0B0B0] hover:text-white hover:bg-[#0A0C10] transition-colors relative">
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#3b82f6] rounded-full"></span>
            </button>
            <div className="h-5 md:h-8 w-[1px] bg-[#B0B0B0]/20"></div>
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-white font-bold text-sm leading-none">Admin User</p>
                    <p className="text-[#B0B0B0] text-xs mt-1">Online</p>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-[#0A0C10] font-bold text-xs md:text-base">
                    AU
                </div>
            </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <button
            key={stat.id}
            onClick={() => setActiveTab(stat.id)}
            className="group bg-[#16181C] p-6 md:p-8 rounded-2xl border border-[#B0B0B0]/10 hover:border-[#3b82f6] transition-all duration-300 text-left hover:-translate-y-1 relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6] opacity-0 group-hover:opacity-5 blur-[60px] transition-opacity duration-500 rounded-full pointer-events-none"></div>
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-[#0A0C10] rounded-xl text-[#3b82f6] border border-[#B0B0B0]/10 group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(stat.icon, { className: "w-6 h-6 md:w-8 md:h-8" })}
              </div>
              <span className="text-[#B0B0B0] text-xs md:text-sm font-mono bg-[#0A0C10] px-3 py-1 rounded-full border border-[#B0B0B0]/10">
                {stat.count}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">{stat.label}</h3>
            <p className="text-[#B0B0B0] text-sm">{stat.desc}</p>
          </button>
        ))}
      </div>

      {/* MOBILE LOGOUT BUTTON */}
      {/* md:hidden ensures it is removed on Desktop screens */}
      <div className="mt-8 md:hidden">
          <div className="h-[1px] bg-[#B0B0B0]/10 mb-6"></div> {/* Separator Line */}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#16181C] border border-red-500/20 text-red-400 font-bold hover:bg-red-500/10 active:scale-95 transition-all shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
      </div>

    </div>
  );
}