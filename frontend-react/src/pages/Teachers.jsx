import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const teachers = [
  { id: 1, name: "John Smith", subject: "Mathematics", email: "john@example.com" },
  { id: 2, name: "Sarah Johnson", subject: "Science", email: "sarah@example.com" },
  { id: 3, name: "Michael Brown", subject: "English", email: "michael@example.com" },
];

const Teachers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const modal = searchParams.get("modal");
  const teacherId = Number(searchParams.get("id"));

  const selectedTeacher = teachers.find(
    (teacher) => teacher.id === teacherId
  );

  const openAddModal = () => setSearchParams({ modal: "add" });
  const openEditModal = (id) => setSearchParams({ modal: "edit", id });
  const closeModal = () => setSearchParams({});
  const isModalOpen = modal === "add" || modal === "edit";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get("tour") === "true") {
      const teacherTourObj = driver({
        showProgress: true,
        animate: true,
        steps: [
          {
            element: ".tour-teachers-container",
            popover: {
              title: "Faculty Control Roster",
              description: "Welcome to the Institutional Staff view! Here you can keep tabs on system educators.",
              side: "bottom",
            }
          },
          {
            element: ".tour-add-teacher-btn",
            popover: {
              title: "Register New Staff",
              description: "Use this action button to open up the overlay interface form for onboarding fresh records.",
              side: "left",
            }
          },
          {
            element: ".tour-teachers-table",
            popover: {
              title: "Roster Spreadsheet",
              description: "Review current assignments, direct contact emails, and perform rapid profile edits right from these rows.",
              side: "top",
            }
          }
        ]
      });

      window.history.replaceState({}, document.title, window.location.pathname);
      teacherTourObj.drive();
    }
  }, []);

  return (
    <>
      {/* Main Container Overhaul */}
      <div className="tour-teachers-container bg-slate-800/30 rounded-2xl shadow-xl border border-slate-700/30 p-6 backdrop-blur-sm relative overflow-hidden">
        
        {/* Background ambient light orb */}
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 relative z-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Faculty Matrix
            </h2>
            <p className="text-slate-400 text-sm mt-1">Audit active institutional personnel clearances.</p>
          </div>

          <button
            onClick={openAddModal}
            className="tour-add-teacher-btn px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
          >
            <span className="text-lg font-bold">+</span> Onboard Teacher
          </button>
        </div>

        {/* Upgraded Cyberpunk Data Table Container */}
        <div className="tour-teachers-table overflow-x-auto relative z-10 rounded-xl border border-slate-800/60 bg-slate-900/20">
          <table className="w-full border-collapse text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Subject Node</th>
                <th className="p-4">Secure Email</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/40">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-slate-800/20 transition-colors duration-150 group">
                  <td className="p-4 font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">{teacher.name}</td>
                  <td className="p-4">
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-lg text-xs font-medium">
                      {teacher.subject}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 font-mono text-xs">{teacher.email}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => openEditModal(teacher.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/50 hover:border-slate-500 text-xs font-medium rounded-lg transition duration-150"
                    >
                      Edit Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Embedded Inner Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="relative bg-slate-900/80 border border-slate-700/50 w-full max-w-lg rounded-2xl shadow-2xl p-6 backdrop-blur-xl text-slate-100 overflow-hidden">
            <div className="absolute top-[-30%] left-[-20%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {modal === "add" ? "Register Faculty Entry" : "Modify Clearances"}
              </h3>

              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center border border-slate-700/50 transition-all text-xl"
              >
                ×
              </button>
            </div>

            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
                <input
                  defaultValue={selectedTeacher?.name || ""}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 shadow-inner"
                  placeholder="Teacher Name"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Department Subject</label>
                <input
                  defaultValue={selectedTeacher?.subject || ""}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 shadow-inner"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Secure Communication Email</label>
                <input
                  defaultValue={selectedTeacher?.email || ""}
                  type="email"
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 shadow-inner font-mono text-xs"
                  placeholder="Email"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/60 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 bg-slate-800/40 hover:bg-slate-800 text-slate-300 font-medium rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  onClick={closeModal}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  {modal === "add" ? "Save Record" : "Update Records"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Teachers;