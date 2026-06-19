const Tooltip = ({ title, sidebarOpen, children }) => {
  return (
    <div className="relative group">
      {children}

      {!sidebarOpen && (
        <div
          className="absolute left-16 top-1/2 -translate-y-1/2
                     opacity-0 group-hover:opacity-100
                     transition-all duration-200
                     bg-slate-900 text-white text-sm
                     px-3 py-2 rounded-lg whitespace-nowrap
                     pointer-events-none z-50"
        >
          {title}
        </div>
      )}
    </div>
  );
};
export default Tooltip;