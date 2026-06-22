import React from "react";

const AddAuthorBookModal = ({ isOpen, onClose, formData, setFormData, addAuthor }) => {
  if (!isOpen) return null;
  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({
      ...form,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200">
      {/* Container Box using frosted glassmorphism */}
      <div className="relative bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 w-full max-w-lg shadow-2xl backdrop-blur-xl text-slate-100 overflow-hidden">
        
        {/* Ambient background accent flare */}
        <div className="absolute top-[-30%] right-[-20%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Add Author & Book <span className="text-blue-400">Node</span>
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center border border-slate-700/50 transition-all"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4 relative z-10" onSubmit={(e) => {
          e.preventDefault();
          addAuthor(formData);
        }}>
          {/* Author Details */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Author Name <span className="text-blue-400">*</span>
            </label>
            <input
              onChange={handleInput}
              name="authorName"
              value={formData?.authorName || ''}
              type="text"
              required
              placeholder="Enter author name"
              className="tour-modal-name w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Bio <span className="text-blue-400">*</span>
            </label>
            <textarea
              onChange={handleInput}
              name="bio"
              value={formData?.bio || ''}
              required
              rows="3"
              placeholder="Enter author bio summary..."
              className="tour-modal-bio w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 shadow-inner resize-none"
            />
          </div>

          {/* Book Details */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Book Title <span className="text-blue-400">*</span>
            </label>
            <input
              onChange={handleInput}
              name="bookTitle"
              value={formData?.bookTitle || ''}
              type="text"
              required
              placeholder="Enter book title"
              className="tour-modal-title w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Price <span className="text-blue-400">*</span>
            </label>
            <input
              onChange={handleInput}
              name="price"
              value={formData?.price || ''}
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="tour-modal-price w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 shadow-inner"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/60 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-slate-800/40 hover:bg-slate-800 text-slate-300 font-medium rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="tour-modal-submit px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAuthorBookModal;