import React, { useEffect, useState } from 'react';
import AddAuthorBookModal from '../components/AddAuthorBookModal ';
import { Link } from 'react-router';

const Dashboard = () => {
  const [authors, setAuthors] = useState([]);

  const [formData, setFormData] = useState({
    authorName: '',
    bio: '',
    bookTitle: '',
    price: ''
  })



  const API_URL = 'http://127.0.0.1:8000/api/authors';
  const [showModal, setShowModal] = useState(false)
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

      // Update UI
      setAuthors((prev) => [
        ...prev,
        {
          ...newAuthor,
          books: [newBook],
        },
      ]);

      setShowModal(false);
      setFormData({
        authorName: '',
        bio: '',
        bookTitle: '',
        price: ''
      })
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBooks = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      setAuthors(data);
      console.log(data, 'data');
    } catch (error) {
      console.log('Error :', error);
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
      .catch((err) => alert(err.message));

  }


  useEffect(() => {
    fetchBooks(API_URL);
  }, []);
return (
  <>
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Authors Dashboard
            </h1>
            <p className="text-slate-500 mt-2">
              Manage authors and books
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all"
          >
            + Add Author
          </button>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <h3 className="text-slate-500 text-sm uppercase tracking-wide">
            Total Authors
          </h3>
          <p className="text-3xl font-bold text-slate-800">
            {authors.length}
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {authors?.map((author) => (
            <div
              key={author.id}
              className="relative bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteAuthor(author.id);
                }}
                className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Delete
              </button>

              <Link
                to={`/dashboard/${author.id}`}
                className="block"
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600 mb-4">
                  {author.name?.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  {author.name}
                </h2>

                <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                  {author.bio}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {author.books?.length || 0} Books
                  </span>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-slate-700 mb-3">
                    Published Books
                  </h3>

                  {author.books?.length > 0 ? (
                    <ul className="space-y-2">
                      {author.books.map((book) => (
                        <li
                          key={book.id}
                          className="flex justify-between bg-slate-50 rounded-lg p-3"
                        >
                          <span className="font-medium text-slate-700">
                            {book.title}
                          </span>

                          <span className="text-green-600 font-semibold">
                            ${book.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-400 text-sm">
                      No books available
                    </p>
                  )}
                </div>
              </Link>
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