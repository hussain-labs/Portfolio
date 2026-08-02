import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, ExternalLink, Github, Globe, Loader2 } from 'lucide-react';

export default function Projects() {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3sRAE3GH6uTZzLTlrtVZW2ZKIGx_mQcf-KyP20UfWRhMo28-HmoBJhRqnjnSOxEB6/exec"; 
  const TAB_NAME = "Projects";
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const initialFormState = {
    id: '',
    name: '',
    role: '',
    desc: '',
    date: '',
    live: '',
    image: '',
    link: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (GOOGLE_SCRIPT_URL) {
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${TAB_NAME}`);
      const data = await response.json();
      
      setProjects(data.data || []); 
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowModal(false); 

    const action = isEditing ? 'update' : 'create';
    const payload = {
      action: action,
      sheet: TAB_NAME,
      ...formData,
      id: isEditing ? formData.id : Date.now().toString() 
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      
      fetchProjects(); 
      setFormData(initialFormState);
    } catch (error) {
      alert("Error saving to Google Sheet");
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this project?")) return;
    
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', id: id, sheet: TAB_NAME })
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting:", error);
      setIsLoading(false);
    }
  };

  const openEditModal = (project) => {
    setFormData(project);
    setIsEditing(true);
    setShowModal(true);
  };

  const openAddModal = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setShowModal(true);
  };

 
  const filteredProjects = projects.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 relative">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Projects Manager</h2>
          <p className="text-[#B0B0B0] mt-1">Connected to Google Sheet Database</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#3b82f6] text-[#0A0C10] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#2563eb] transition-colors shadow-[0_0_15px_rgba(59,130,246,0.2)]"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </div>

      <div className="bg-[#16181C] rounded-2xl border border-[#B0B0B0]/10 overflow-hidden min-h-[400px]">
        
        <div className="p-4 border-b border-[#B0B0B0]/10 flex gap-4">
          <div className="flex items-center bg-[#0A0C10] px-4 py-2 rounded-lg border border-[#B0B0B0]/10 focus-within:border-[#3b82f6] flex-1">
            <Search className="w-4 h-4 text-[#B0B0B0]" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-white text-sm ml-2 focus:outline-none w-full placeholder-[#B0B0B0]/50"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12 text-[#3b82f6]">
                       <Loader2 className="w-8 h-8 animate-spin mr-2" /> Loading Projects...
                    </div>
        )}

        {!isLoading && (
          <div className="divide-y divide-[#B0B0B0]/10">
            {filteredProjects.length === 0 ? (
               <p className="p-8 text-center text-[#B0B0B0]">No projects found. Add one to get started.</p>
            ) : (
              filteredProjects.map((project) => (
                <div key={project.id || Math.random()} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-[#0A0C10]/50 transition-colors group gap-4">
                  
                  {/* Project Info */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Thumbnail or Fallback Icon */}
                    <div className="w-16 h-16 bg-[#0A0C10] rounded-lg border border-[#B0B0B0]/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {project.image ? (
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover" onError={(e) => e.target.src=''} />
                        ) : (
                            <span className="text-[#3b82f6] font-bold text-xl">{project.name?.charAt(0)}</span>
                        )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-white text-lg font-bold group-hover:text-[#3b82f6] transition-colors">{project.name}</h3>
                        <span className="text-xs bg-[#3b82f6]/10 text-[#3b82f6] px-2 py-0.5 rounded border border-[#3b82f6]/20">
                           {project.role}
                        </span>
                      </div>
                      <p className="text-[#B0B0B0] text-sm mb-1 line-clamp-1">{project.desc}</p>
                      <p className="text-[#B0B0B0]/50 text-xs font-mono">{project.date}</p>
                    </div>
                  </div>

                  {/* Links & Actions */}
                  <div className="flex items-center gap-3 md:border-l md:border-[#B0B0B0]/10 md:pl-6">
                     {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="p-2 text-[#B0B0B0] hover:text-[#3b82f6] transition-colors" title="Live Site">
                           <Globe className="w-4 h-4" />
                        </a>
                     )}
                     {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="p-2 text-[#B0B0B0] hover:text-white transition-colors" title="Repo/Link">
                           <ExternalLink className="w-4 h-4" />
                        </a>
                     )}
                     
                     <div className="w-[1px] h-6 bg-[#B0B0B0]/20 mx-1 hidden md:block"></div>

                     <button onClick={() => openEditModal(project)} className="p-2 text-[#B0B0B0] hover:text-white hover:bg-[#0A0C10] rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                     </button>
                     <button onClick={() => handleDelete(project.id)} className="p-2 text-[#B0B0B0] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16181C] w-full max-w-2xl rounded-2xl border border-[#B0B0B0]/20 shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#B0B0B0]/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                    {isEditing ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-[#B0B0B0] hover:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-[#B0B0B0]">Project Name</label>
                        <input 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-[#0A0C10] border border-[#B0B0B0]/20 rounded-lg p-3 text-white focus:border-[#3b82f6] focus:outline-none"
                            placeholder="e.g. Coral Plus"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-[#B0B0B0]">My Role</label>
                        <input 
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            className="w-full bg-[#0A0C10] border border-[#B0B0B0]/20 rounded-lg p-3 text-white focus:border-[#3b82f6] focus:outline-none"
                            placeholder="e.g. Full Stack Dev"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-[#B0B0B0]">Description</label>
                    <textarea 
                        value={formData.desc}
                        onChange={(e) => setFormData({...formData, desc: e.target.value})}
                        className="w-full bg-[#0A0C10] border border-[#B0B0B0]/20 rounded-lg p-3 text-white focus:border-[#3b82f6] focus:outline-none h-24 resize-none"
                        placeholder="Brief description of the project..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-[#B0B0B0]">Date / Duration</label>
                        <input 
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full bg-[#0A0C10] border border-[#B0B0B0]/20 rounded-lg p-3 text-white focus:border-[#3b82f6] focus:outline-none"
                            placeholder="April/2025...June/2025"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-[#B0B0B0]">Live URL</label>
                        <input 
                            value={formData.live}
                            onChange={(e) => setFormData({...formData, live: e.target.value})}
                            className="w-full bg-[#0A0C10] border border-[#B0B0B0]/20 rounded-lg p-3 text-white focus:border-[#3b82f6] focus:outline-none"
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-[#B0B0B0]">Image URL</label>
                        <input 
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="w-full bg-[#0A0C10] border border-[#B0B0B0]/20 rounded-lg p-3 text-white focus:border-[#3b82f6] focus:outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-[#B0B0B0]">Repo/Details Link</label>
                        <input 
                            value={formData.link}
                            onChange={(e) => setFormData({...formData, link: e.target.value})}
                            className="w-full bg-[#0A0C10] border border-[#B0B0B0]/20 rounded-lg p-3 text-white focus:border-[#3b82f6] focus:outline-none"
                            placeholder="#"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex gap-3">
                    <button 
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-[#0A0C10] text-white py-3 rounded-xl font-bold hover:bg-[#2c3038] transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="flex-1 bg-[#3b82f6] text-[#0A0C10] py-3 rounded-xl font-bold hover:bg-[#2563eb] transition-colors"
                    >
                        {isEditing ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}