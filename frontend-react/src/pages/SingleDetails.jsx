import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Using standard react-router-dom for navigation
import { FiArrowLeft, FiActivity, FiLayers, FiDatabase } from 'react-icons/fi';

const SingleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('Parameters Loaded:', id);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8 relative overflow-hidden font-sans">
      
      {/* Ambient background glowing orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Back Button Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-200 backdrop-blur-md text-sm font-medium group"
        >
          <FiArrowLeft className="transform group-hover:-translate-x-0.5 transition-transform" />
          Return to Matrix
        </button>

        {/* Header Block */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            NODE // EN-RESOURCE_{id}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Inspector Node Details
          </h1>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed">
            Deep diagnostic properties and nested structural relationships for entry signature index.
          </p>
        </div>

        {/* Main Details Glassmorphism Board */}
        <div className="bg-slate-800/30 rounded-2xl shadow-2xl border border-slate-700/30 p-8 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Summary Sidebar Panel */}
          <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-slate-900/40 border border-slate-800/60 rounded-xl text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-3xl font-black text-blue-400 shadow-xl mb-4">
              ID
            </div>
            <div className="font-mono text-sm text-slate-400 bg-slate-950/60 border border-slate-800/80 px-3 py-1 rounded-lg">
              #{id}
            </div>
          </div>

          {/* Core Telemetry Properties Grid */}
          <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat Block 1 */}
              <div className="p-4 bg-slate-950/30 border border-slate-800/40 rounded-xl flex items-start gap-3">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 shrink-0">
                  <FiDatabase size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Database Sync</h4>
                  <p className="text-sm font-semibold text-slate-200">Active Clearances</p>
                </div>
              </div>

              {/* Stat Block 2 */}
              <div className="p-4 bg-slate-950/30 border border-slate-800/40 rounded-xl flex items-start gap-3">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 shrink-0">
                  <FiActivity size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Process State</h4>
                  <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Operational
                  </p>
                </div>
              </div>

            </div>

            {/* Simulated Data Field Description */}
            <div className="p-5 bg-slate-900/20 border border-slate-800/60 rounded-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FiLayers className="text-blue-400" />
                Structural Trace Logs
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Resource record is loaded into active memory clusters. Select an action item or modify catalog configuration sets inside the dashboard portal to alter operational flags for this matrix profile branch.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SingleDetails;