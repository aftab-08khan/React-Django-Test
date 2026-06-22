import { useEffect } from "react";
import { Link } from "react-router-dom";
// 1. Import Driver.js and its CSS styling
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function Home() {
  
  // 2. Initialize and configure the tour inside useEffect
  useEffect(() => {
    const driverObj = driver({
      showProgress: true, // Shows "1 of 3" step progress
      animate: true,      // Smooth transitions between steps
      steps: [
        {
          element: '.tour-title',
          popover: {
            title: 'Welcome to the Portal!',
            description: 'This is the main Engine Portal for the Library Management system.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '.tour-description',
          popover: {
            title: 'System Purpose',
            description: 'Here you can check out the tech stack summary and system specifications.',
            side: 'bottom'
          }
        },
        {
          element: '.dashboard-link',
          popover: {
            title: 'Get Started',
            description: 'Click here to transition seamlessly over to your control dashboard.',
            side: 'top'
          }
        }
      ]
    });

    // 3. Start the product tour
    driverObj.drive();
  }, []); // Empty dependency array ensures it runs once when the page loads

  return (
    <div className="home-page min-h-screen bg-[#0f172a] text-slate-100 flex flex-col justify-center items-center relative overflow-hidden font-sans">
      
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl text-center px-6 z-10">
        
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          API Connected System v1.0
        </span>

        {/* Added 'tour-title' class */}
        <h1 className="tour-title text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Library Management <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">Engine Portal</span>
        </h1>

        {/* Added 'tour-description' class */}
        <p className="tour-description text-base md:text-lg text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
          A modular, secure dashboard framework optimized for managing authors, relational book catalogs, and system diagnostics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {/* Main targeted link (already has dashboard-link class) */}
          <Link
            to="/dashboard"
            className="dashboard-link w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Go To Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <a
            href="http://127.0.0.1:8000/api/books/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-medium rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2"
          >
            Browse Raw API
          </a>
        </div>

      </div>

      <div className="absolute bottom-6 text-xs text-slate-500 tracking-wider">
        REST Framework • React Ecosystem
      </div>
    </div>
  );
}

export default Home;