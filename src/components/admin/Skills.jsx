import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Code2, Layers, Loader2, X } from 'lucide-react';

export default function Skills() {
  // --- CONFIGURATION ---
  // PASTE YOUR NEW SKILLS GOOGLE SHEET URL HERE
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3sRAE3GH6uTZzLTlrtVZW2ZKIGx_mQcf-KyP20UfWRhMo28-HmoBJhRqnjnSOxEB6/exec"; 
  const TAB_NAME = "Skills";

  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
   // Name of the sheet/tab in Google Sheets

  const initialFormState = {
    id: '',
    name: '',
    level: 50, // Default for Main skills
    type: 'main' // 'main' or 'other'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  // 1. FETCH SKILLS (GET)
  useEffect(() => {
    if (GOOGLE_SCRIPT_URL) {
      fetchSkills();
    }
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${TAB_NAME}`);
      const data = await response.json();
      // Ensure levels are numbers
      const formatted = (data.data || []).map(s => ({
        ...s,
        level: s.level ? parseInt(s.level) : 0
      }));
      setSkills(formatted);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. SAVE SKILL (POST - No CORS)
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowModal(false);

    const action = isEditing ? 'update' : 'create';
    const payload = {
      action: action,
      sheet: TAB_NAME,
      ...formData,
      id: isEditing ? formData.id : Date.now().toString(),
      // If type is 'other', we ignore level (or set to 0)
      level: formData.type === 'main' ? formData.level : '' 
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });

      setTimeout(() => {
        fetchSkills();
        setFormData(initialFormState);
        alert(isEditing ? "Skill Updated!" : "Skill Added!");
      }, 1500);

    } catch (error) {
      alert("Error saving to Google Sheet");
      setIsLoading(false);
    }
  };

  // 3. DELETE SKILL
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this skill?")) return;
    
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'delete', id: id, sheet: TAB_NAME })
      });

      setTimeout(() => {
        fetchSkills();
      }, 1500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (skill) => {
    setFormData(skill);
    setIsEditing(true);
    setShowModal(true);
  };

  // Filter Logic
  const filtered = skills.filter(s => s.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  const mainSkills = filtered.filter(s => s.type === 'main');
  const otherSkills = filtered.filter(s => s.type === 'other');

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Skills Manager</h2>
          <p className="text-[#B0B0B0] mt-1">Manage Main Skills (with levels) and Other Skills.</p>
        </div>
        <button onClick={openAddModal} className="bg-[#3b82f6] text-[#0A0C10] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#2563eb] transition-colors shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Plus className="w-5 h-5" />
          Add New Skill
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-[#16181C] rounded-2xl border border-[#B0B0B0]/10 overflow-hidden min-h-[400px] p-6">
        
        {/* Search */}
        <div className="mb-8 flex items-center bg-[#0A0C10] px-4 py-3 rounded-xl border border-[#B0B0B0]/10 focus-within:border-[#3b82f6] max-w-md">
            <Search className="w-5 h-5 text-[#B0B0B0]" />
            <input 
              type="text" 
              placeholder="Search skills..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-white ml-3 focus:outline-none w-full placeholder-[#B0B0B0]/50"
            />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12 text-[#3b82f6]">
             <Loader2 className="w-8 h-8 animate-spin mr-2" /> Loading Skills...
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* SECTION 1: MAIN SKILLS */}
            <div>
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code2 className="text-[#3b82f6]" /> Main Skills
               </h3>
               <div className="space-y-3">
                  {mainSkills.map((skill) => (
                    <div key={skill.id} className="bg-[#0A0C10] p-4 rounded-xl border border-[#B0B0B0]/10 hover:border-[#3b82f6]/50 transition-colors group">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => openEditModal(skill)} className="text-[#B0B0B0] hover:text-white"><Pencil className="w-4 h-4"/></button>
                             <button onClick={() => handleDelete(skill.id)} className="text-[#B0B0B0] hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                          </div>
                       </div>
                       <div className="w-full h-2 bg-[#16181C] rounded-full overflow-hidden">
                          <div className="h-full bg-[#3b82f6]" style={{ width: `${skill.level}%` }}></div>
                       </div>
                       <p className="text-right text-[#B0B0B0] text-xs mt-1">{skill.level}%</p>
                    </div>
                  ))}
                  {mainSkills.length === 0 && <p className="text-[#B0B0B0]/50 italic">No main skills found.</p>}
               </div>
            </div>

            {/* SECTION 2: OTHER SKILLS */}
            <div>
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="text-[#3b82f6]" /> Other Skills
               </h3>
               <div className="flex flex-wrap gap-3">
                  {otherSkills.map((skill) => (
                    <div key={skill.id} className="bg-[#0A0C10] px-4 py-2 rounded-full border border-[#B0B0B0]/10 hover:border-[#3b82f6] transition-colors flex items-center gap-3 group">
                       <span className="text-[#B0B0B0] group-hover:text-white">{skill.name}</span>
                       <div className="flex gap-1 border-l border-[#B0B0B0]/20 pl-2">
                          <button onClick={() => openEditModal(skill)} className="text-[#B0B0B0] hover:text-white"><Pencil className="w-3 h-3"/></button>
                          <button onClick={() => handleDelete(skill.id)} className="text-[#B0B0B0] hover:text-red-500"><Trash2 className="w-3 h-3"/></button>
                       </div>
                    </div>
                  ))}
                  {otherSkills.length === 0 && <p className="text-[#B0B0B0]/50 italic">No other skills added.</p>}
               </div>
            </div>

          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16181C] w-full max-w-md rounded-2xl border border-[#B0B0B0]/20 shadow-2xl">
            <div className="p-6 border-b border-[#B0B0B0]/10 flex justify-between items-center">
               <h3 className="text-xl font-bold text-white">{isEditing ? 'Edit Skill' : 'Add Skill'}</h3>
               <button onClick={() => setShowModal(false)} className="text-[#B0B0B0] hover:text-white"><X className="w-6 h-6"/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
               {/* Type Selector */}
               <div className="space-y-2">
                  <label className="text-sm text-[#B0B0B0]">Skill Type</label>
                  <div className="grid grid-cols-2 gap-4">
                     <button
                        type="button"
                        onClick={() => setFormData({...formData, type: 'main'})}
                        className={`py-2 rounded-lg border text-sm font-bold transition-all ${formData.type === 'main' ? 'bg-[#3b82f6] text-black border-[#3b82f6]' : 'bg-[#0A0C10] text-[#B0B0B0] border-[#B0B0B0]/20'}`}
                     >
                        Main Skill
                     </button>
                     <button
                        type="button"
                        onClick={() => setFormData({...formData, type: 'other'})}
                        className={`py-2 rounded-lg border text-sm font-bold transition-all ${formData.type === 'other' ? 'bg-[#3b82f6] text-black border-[#3b82f6]' : 'bg-[#0A0C10] text-[#B0B0B0] border-[#B0B0B0]/20'}`}
                     >
                        Other Skill
                     </button>
                  </div>
               </div>

               {/* Name Input */}
               <div className="space-y-2">
                  <label className="text-sm text-[#B0B0B0]">Skill Name</label>
                  <input 
                     required
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-[#0A0C10] border border-[#B0B0B0]/20 rounded-lg p-3 text-white focus:border-[#3b82f6] focus:outline-none"
                     placeholder={formData.type === 'main' ? "e.g. React.js" : "e.g. AWS EC2"}
                  />
               </div>

               {/* Level Slider (Only for Main) */}
               {formData.type === 'main' && (
                  <div className="space-y-2">
                     <div className="flex justify-between text-sm text-[#B0B0B0]">
                        <label>Proficiency Level</label>
                        <span>{formData.level}%</span>
                     </div>
                     <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                        className="w-full h-2 bg-[#0A0C10] rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
                     />
                  </div>
               )}

               <button type="submit" className="w-full bg-[#3b82f6] text-[#0A0C10] py-3 rounded-xl font-bold hover:bg-[#2563eb] mt-4">
                  {isEditing ? 'Save Changes' : 'Add Skill'}
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}