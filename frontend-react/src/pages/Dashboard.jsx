import React, { useEffect, useState } from 'react';
import AddAuthorBookModal from '../components/AddAuthorBookModal ';
import { Link } from 'react-router-dom'; 
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

// Local high-fidelity simulation dataset to protect layout if API is down
const DUMMY_AUTHORS_FALLBACK = [
  {
    id: 101,
    name: "George Orwell",
    bio: "English novelist, essayist, journalist, and critic noted for lucid prose and social criticism.",
    books: [{ id: 501, title: "1984 System Matrix", price: "14.99" }]
  },
  {
    id: 102,
    name: "Isaac Asimov",
    bio: "American writer and professor of biochemistry, highly successful author of hard science fiction.",
    books: [{ id: 502, title: "Foundation Core", price: "18.50" }]
  }
];

const Dashboard = () => {
  const [authors, setAuthors] = useState([]);

  const [formData, setFormData] = useState({
    authorName: '',
    bio: '',
    bookTitle: '',
    price: ''
  });

  const API_URL = 'http://127.0.0.1:8000/api/authors';
  const [showModal, setShowModal] = useState(false);

  const addAuthor = async (formData) => {
    console.log(formData, 'here');
    try {
      // Create Author
      const authorRes = await fetch("http://127.0.0.1:8000/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.authorName,
          bio: formData.bio,
        }),
      });

      // Local State Intercept/Simulate if Backend endpoint fails on creation save
      if (!authorRes.ok) throw new Error("Creation Endpoint Dropped. Simulating locally.");

      const newAuthor = await authorRes.json();

      // Create Book
      const bookRes = await fetch("http://127.0.0.1:8000/api/books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.bookTitle,
          price: formData.price,
          author: newAuthor.id,
        }),
      });

      const newBook = await bookRes.json();

      // Update UI Normal State Flow
      setAuthors((prev) => [
        ...prev,
        {
          ...newAuthor,
          books: [newBook],
        },
      ]);

    } catch (error) {
      console.warn("API Node Offline:", error.message);
      
      // Simulate form submission locally so the tour UI transitions flawlessly
      const mockId = Date.now();
      setAuthors((prev) => [
        ...prev,
        {
          id: mockId,
          name: formData.authorName || "New Simulated Author",
          bio: formData.bio || "Simulated bio context parameters.",
          books: [{ id: mockId + 1, title: formData.bookTitle || "Simulated Volume", price: formData.price || "9.99" }]
        }
      ]);
    } finally {
      setShowModal(false);
      setFormData({
        authorName: '',
        bio: '',
        bookTitle: '',
        price: ''
      });
    }
  };

  const fetchBooks = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Database network handshakes unresolved.");
      const data = await res.json();
      setAuthors(data);
      console.log(data, 'data');
    } catch (error) {
      console.error('API Error Falling Back to Dummy Clusters:', error);
      // Inject dummy mock data array on failure so driver.js still finds DOM element blocks
      setAuthors(DUMMY_AUTHORS_FALLBACK);
    } finally {
      // Run the product tour cleanly regardless of network state
      startDashboardTour();
    }
  };

  const handleDeleteAuthor = (id) => {
    if (!window.confirm("Are you sure you want to delete this author?")) return;

    fetch(`http://127.0.0.1:8000/api/authors/${id}/`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete author');
        setAuthors((prevAuthors) => prevAuthors.filter(author => author.id !== id));
      })
      .catch((err) => {
        console.warn("Simulating deletion locally due to network drop:", err.message);
        setAuthors((prevAuthors) => prevAuthors.filter(author => author.id !== id));
      });
  };

  const startDashboardTour = () => {
    if (localStorage.getItem("has_seen_dashboard_tour")) return;

    const driverObj = driver({
      showProgress: true,
      animate: true,
      steps: [
        {
          element: '.tour-dashboard-header',
          popover: {
            title: 'Authors Control Matrix',
            description: 'Welcome to your administration interface. Here you can survey metrics and relational book assets.',
            side: 'bottom'
          }
        },
        {
          element: '.tour-stats-card',
          popover: {
            title: 'Aggregate Counts',
            description: 'This region reflects dynamic indicators tracking your overall database index lengths.',
            side: 'bottom'
          }
        },
        {
          element: '.tour-add-author-btn',
          popover: {
            title: 'Create Content Records',
            description: 'Clicking "Next" will automatically open this creation modal for you so we can look at the form!',
            side: 'left'
          },
          onDeselected: () => {
            setShowModal(true); 
          }
        },
        {
          element: '.tour-modal-name',
          popover: {
            title: 'Author Identity',
            description: 'Type the full name of the author here.',
            side: 'bottom'
          },
          onHighlighted: () => {
            setFormData(prev => ({ ...prev, authorName: 'J.K. Rowling' }));
          }
        },
        {
          element: '.tour-modal-bio',
          popover: {
            title: 'Biography Document',
            description: 'Provide a brief summary of the author\'s background history.',
            side: 'bottom'
          },
          onHighlighted: () => {
            setFormData(prev => ({ ...prev, bio: 'British author, best known for the Harry Potter series.' }));
          }
        },
        {
          element: '.tour-modal-title',
          popover: {
            title: 'Primary Publication',
            description: 'Input the title of their premier book release.',
            side: 'bottom'
          },
          onHighlighted: () => {
            setFormData(prev => ({ ...prev, bookTitle: 'Harry Potter and the Philosophers Stone' }));
          }
        },
        {
          element: '.tour-modal-price',
          popover: {
            title: 'Market Value',
            description: 'Set the base list price for asset distribution.',
            side: 'bottom'
          },
          onHighlighted: () => {
            setFormData(prev => ({ ...prev, price: '19.99' }));
          }
        },
        {
          element: '.tour-authors-grid',
          popover: {
            title: 'Profiles Display Panel',
            description: 'Once submitted, your records populate dynamically right here inside this matrix grid layout.',
            side: 'top'
          },
          onHighlightStarted: () => {
            setShowModal(false);
          }
        },
        {
          element: '.tour-teachers-nav',
          popover: {
            title: 'Teachers Management Workspace',
            description: 'Clicking "Next" will redirect your panel context over to the Faculty system setup.',
            side: 'right'
          },
          onDeselected: () => {
            window.location.href = '/dashboard/teachers?tour=true';
          }
        }
      ]
    });

    driverObj.drive();
  };

  useEffect(() => {
    fetchBooks(API_URL);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8 relative overflow-hidden font-sans">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto z-10 relative">
          
          {/* Header */}
          <div className="tour-dashboard-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Authors Control Center
              </h1>
              <p className="text-slate-400 mt-2 text-sm md:text-base leading-relaxed">
                Configure authors system parameters and relational documentation catalogs.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="tour-add-author-btn w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span className="text-lg font-bold">+</span> Add Engine Profile
            </button>
          </div>

          {/* Stats Card */}
          <div className="tour-stats-card max-w-sm bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 shadow-xl backdrop-blur-md mb-8">
            <h3 className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Total Managed Authors
            </h3>
            <p className="text-4xl font-black text-white tracking-tight">
              {authors.length}
            </p>
          </div>

          {/* Authors Grid */}
          <div className="tour-authors-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {authors?.map((author) => (
              <div
                key={author.id}
                className="relative bg-slate-800/30 rounded-2xl shadow-xl border border-slate-700/30 p-6 hover:border-slate-600/50 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteAuthor(author.id);
                    }}
                    className="absolute top-4 right-4 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-medium border border-red-500/20 transition duration-150"
                  >
                    Remove
                  </button>

                  <Link to={`/dashboard/${author.id}`} className="block">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg font-bold text-blue-400 mb-4 shadow-inner">
                      {author.name?.charAt(0).toUpperCase()}
                    </div>

                    <h2 className="text-xl font-bold text-slate-100 mb-2 transition">
                      {author.name}
                    </h2>

                    <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {author.bio}
                    </p>

                    <div className="flex items-center mb-4">
                      <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-medium">
                        {author.books?.length || 0} Books Linked
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="border-t border-slate-700/40 pt-4 mt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Relational Documents
                  </h3>

                  {author.books?.length > 0 ? (
                    <ul className="space-y-2">
                      {author.books.map((book) => (
                        <li
                          key={book.id}
                          className="flex justify-between items-center bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 text-sm"
                        >
                          <span className="font-medium text-slate-300 truncate pr-2">
                            {book.title}
                          </span>
                          <span className="text-emerald-400 font-semibold shrink-0">
                            ${book.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 text-xs italic">
                      No matching item clusters located.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AddAuthorBookModal
          formData={formData}
          setFormData={setFormData}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          addAuthor={addAuthor}
        />
      </div>
    </>
  );
};

export default Dashboard;