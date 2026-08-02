import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Briefcase, Loader2, X } from 'lucide-react';

export default function Experience() {
  // PASTE YOUR URL HERE
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3sRAE3GH6uTZzLTlrtVZW2ZKIGx_mQcf-KyP20UfWRhMo28-HmoBJhRqnjnSOxEB6/exec"; 
  const TAB_NAME = "Experience";

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const initialForm = { id: '', role: '', company: '', date: '', type: 'Full-time', desc: '' };
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => { if (GOOGLE_SCRIPT_URL) fetchData(); }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${TAB_NAME}`);
      const json = await res.json();
      setData(json.data || []);
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowModal(false);
    const action = isEditing ? 'update' : 'create';
    const payload = { action, sheet: TAB_NAME, ...formData, id: isEditing ? formData.id : Date.now().toString() };
    
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
      setTimeout(() => { fetchData(); alert("Saved!"); }, 2000);
    } catch (e) { setIsLoading(false); }
  };

  const handleDelete = async (id) => {
    if(!confirm("Delete this experience?")) return;
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ action: 'delete', id, sheet: TAB_NAME }) });
      setTimeout(() => { fetchData(); }, 2000);
    } catch (e) { setIsLoading(false); }
  };

  return (
    <section className="w-full min-h-screen bg-[#0A0C10]  text-[#B0B0B0]">
      <div className="">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Experience</h2>
            <p className="text-[#B0B0B0] text-sm md:text-base max-w-md">
              My professional journey and career milestones.
            </p>
          </div>
          <button 
            onClick={() => {setFormData(initialForm); setIsEditing(false); setShowModal(true);}} 
            className="group bg-[#3b82f6] hover:bg-[#2563eb] text-[#0A0C10] px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
            <span>Add New Role</span>
          </button>
        </div>

        {/* Main Content Card - Using Dark Charcoal #16181C */}
        <div className="bg-[#16181C] rounded-3xl border border-[#B0B0B0]/10 min-h-[400px] p-6 md:p-8 shadow-2xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-[#3b82f6]">
                                   <Loader2 className="w-8 h-8 animate-spin mr-2" /> Loading Experience...
                                </div>
          ) : (
            <div className="space-y-6">
              {data.length === 0 && (
                 <div className="text-center py-20 text-[#B0B0B0]/50 italic">No experience entries found. Add one to get started.</div>
              )}
              
              {data.map(item => (
                <div key={item.id} className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-[#0A0C10] border border-[#B0B0B0]/10 hover:border-[#3b82f6]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#3b82f6]/5">
                  
                  {/* Icon Box */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-[#16181C] rounded-2xl border border-[#B0B0B0]/20 flex items-center justify-center text-[#3b82f6] group-hover:bg-[#3b82f6] group-hover:text-[#0A0C10] transition-colors duration-300">
                      <Briefcase className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                     <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#3b82f6] transition-colors">{item.role}</h3>
                            <p className="text-[#B0B0B0] font-medium text-lg">{item.company}</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium">
                           <span className="bg-[#16181C] text-[#3b82f6] px-3 py-1 rounded-full border border-[#3b82f6]/20 whitespace-nowrap">
                             {item.date}
                           </span>
                           <span className="bg-[#B0B0B0]/10 text-[#B0B0B0] px-3 py-1 rounded-full whitespace-nowrap border border-[#B0B0B0]/10">
                             {item.type}
                           </span>
                        </div>
                     </div>
                     
                     <p className="text-[#B0B0B0]/80 mt-4 leading-relaxed max-w-3xl">
                       {item.desc}
                     </p>
                  </div>

                  {/* Actions (Hover to show on desktop, always visible on mobile) */}
                  <div className="flex md:flex-col gap-2 mt-4 md:mt-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                     <button 
                        onClick={() => {setFormData(item); setIsEditing(true); setShowModal(true);}} 
                        className="p-2 bg-[#16181C] text-white rounded-lg border border-[#B0B0B0]/20 hover:border-[#3b82f6] hover:text-[#3b82f6] transition-all"
                        title="Edit"
                     >
                        <Pencil className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 bg-[#16181C] text-[#B0B0B0] rounded-lg border border-[#B0B0B0]/20 hover:border-red-500 hover:text-red-500 transition-all"
                        title="Delete"
                     >
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0A0C10]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#16181C] w-full max-w-lg rounded-3xl border border-[#B0B0B0]/20 shadow-2xl overflow-hidden">
             
             {/* Modal Header */}
             <div className="p-6 border-b border-[#B0B0B0]/10 flex justify-between items-center">
                <h3 className="text-white text-xl font-bold">
                    {isEditing ? 'Edit Experience' : 'Add New Role'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-[#B0B0B0] hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>
             </div>

             {/* Modal Form */}
             <form onSubmit={handleSave} className="p-6 space-y-5">
                <div className="space-y-4">
                    <div>
                        <label className="text-xs uppercase font-bold text-[#B0B0B0]/60 tracking-wider ml-1 mb-1 block">Role Details</label>
                        <input required placeholder="Job Title (e.g. Senior Developer)" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} 
                            className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all placeholder-[#B0B0B0]/30"
                        />
                    </div>
                    <input required placeholder="Company Name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} 
                        className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all placeholder-[#B0B0B0]/30"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Date (2023 - Present)" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} 
                    className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all placeholder-[#B0B0B0]/30"
                  />
                  <input placeholder="Type (Full-time)" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} 
                    className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all placeholder-[#B0B0B0]/30"
                  />
                </div>

                <div>
                    <label className="text-xs uppercase font-bold text-[#B0B0B0]/60 tracking-wider ml-1 mb-1 block">Description</label>
                    <textarea placeholder="Briefly describe your responsibilities and achievements..." value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} 
                        className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all h-32 resize-none placeholder-[#B0B0B0]/30"
                    />
                </div>
                
                <div className="pt-2 flex gap-3">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-transparent border border-[#B0B0B0]/20 text-white py-3.5 rounded-xl font-bold hover:bg-[#B0B0B0]/10 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-[#0A0C10] py-3.5 rounded-xl font-bold shadow-lg shadow-[#3b82f6]/20 transition-all">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto"/> : 'Save Changes'}
                    </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </section>
  );
}