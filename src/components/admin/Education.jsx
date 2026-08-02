import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GraduationCap, Loader2, X, Calendar } from 'lucide-react';

export default function Education() {
  // PASTE YOUR URL HERE
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3sRAE3GH6uTZzLTlrtVZW2ZKIGx_mQcf-KyP20UfWRhMo28-HmoBJhRqnjnSOxEB6/exec"; 
  const TAB_NAME = "Education";

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const initialForm = { id: '', degree: '', school: '', year: '', status: 'Completed' };
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
    if(!confirm("Delete this education entry?")) return;
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ action: 'delete', id, sheet: TAB_NAME }) });
      setTimeout(() => { fetchData(); }, 2000);
    } catch (e) { setIsLoading(false); }
  };

  return (
    <section className="w-full min-h-screen bg-[#0A0C10] text-[#B0B0B0]">
      <div>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Education</h2>
            <p className="text-[#B0B0B0] text-sm md:text-base max-w-md">
              Academic background and certifications.
            </p>
          </div>
          <button 
            onClick={() => {setFormData(initialForm); setIsEditing(false); setShowModal(true);}} 
            className="group bg-[#3b82f6] hover:bg-[#2563eb] text-[#0A0C10] px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
            <span>Add Education</span>
          </button>
        </div>

        {/* Main Container */}
        <div className="bg-[#16181C] rounded-3xl border border-[#B0B0B0]/10 min-h-[400px] p-6 md:p-8 shadow-2xl">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#3b82f6]" />
              <span className="text-[#B0B0B0] animate-pulse">Syncing data...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.length === 0 && (
                 <div className="col-span-full text-center py-20 text-[#B0B0B0]/50 italic">No education entries found.</div>
              )}

              {data.map(item => (
                <div key={item.id} className="group relative bg-[#0A0C10] p-6 rounded-2xl border border-[#B0B0B0]/10 hover:border-[#3b82f6]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#3b82f6]/5 flex flex-col justify-between h-full">
                  
                  {/* Decorative Glow */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#3b82f6] opacity-0 group-hover:opacity-5 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"></div>

                  <div>
                    {/* Header of Card */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-[#16181C] rounded-xl border border-[#B0B0B0]/20 flex items-center justify-center text-[#3b82f6] group-hover:scale-110 transition-transform duration-300">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => {setFormData(item); setIsEditing(true); setShowModal(true);}} className="p-2 text-[#B0B0B0] hover:text-[#3b82f6] transition-colors"><Pencil className="w-4 h-4" /></button>
                           <button onClick={() => handleDelete(item.id)} className="p-2 text-[#B0B0B0] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#3b82f6] transition-colors">{item.degree}</h3>
                    <p className="text-[#B0B0B0] font-medium text-lg">{item.school}</p>
                  </div>

                  {/* Footer of Card */}
                  <div className="mt-6 pt-4 border-t border-[#B0B0B0]/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[#B0B0B0]/80">
                          <Calendar className="w-4 h-4" />
                          <span>{item.year}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.status === 'Completed' ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20' : 'bg-[#B0B0B0]/10 text-[#B0B0B0] border-[#B0B0B0]/20'}`}>
                          {item.status}
                      </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0A0C10]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#16181C] w-full max-w-md rounded-3xl border border-[#B0B0B0]/20 shadow-2xl overflow-hidden">
             <div className="p-6 border-b border-[#B0B0B0]/10 flex justify-between items-center">
                <h3 className="text-white text-xl font-bold">{isEditing ? 'Edit Education' : 'Add Education'}</h3>
                <button onClick={() => setShowModal(false)} className="text-[#B0B0B0] hover:text-white transition-colors"><X className="w-6 h-6" /></button>
             </div>

             <form onSubmit={handleSave} className="p-6 space-y-5">
                <div className="space-y-4">
                    <input required placeholder="Degree / Certificate" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} 
                        className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all placeholder-[#B0B0B0]/30"
                    />
                    <input required placeholder="School / University" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} 
                        className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all placeholder-[#B0B0B0]/30"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Year (e.g. 2024)" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} 
                    className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all placeholder-[#B0B0B0]/30"
                  />
                   <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                     className="w-full bg-[#0A0C10] text-white p-4 rounded-xl border border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition-all"
                   >
                       <option value="Completed">Completed</option>
                       <option value="In Progress">In Progress</option>
                       <option value="Dropped">Dropped</option>
                   </select>
                </div>
                
                <div className="pt-2 flex gap-3">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-transparent border border-[#B0B0B0]/20 text-white py-3.5 rounded-xl font-bold hover:bg-[#B0B0B0]/10 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-[#0A0C10] py-3.5 rounded-xl font-bold shadow-lg shadow-[#3b82f6]/20 transition-all">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto"/> : 'Save'}
                    </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </section>
  );
}