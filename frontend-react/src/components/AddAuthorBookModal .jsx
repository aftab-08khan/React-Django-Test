import React from "react";

const AddAuthorBookModal = ({ isOpen, onClose, formData, setFormData ,addAuthor }) => {
  if (!isOpen) return null;
  const handleInput = (e) => {
    const { name, value } = e.target
console.log(name ,value);


    setFormData((form) => ({
      ...form,
      [name]: value

    }))
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Author & Book</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form className="space-y-4" onSubmit={(e)=>{
          e.preventDefault()
          addAuthor(formData)
        }}>
          {/* Author Details */}
          <div>
            <label className="block mb-1 font-medium">
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleInput}
              name="authorName"
              value={formData?.authorName}
              type="text"
              required
              placeholder="Enter author name"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
            onChange={handleInput}
              name="bio"
              value={formData?.bio}
              required
              rows="3"
              placeholder="Enter author bio"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Book Details */}
          <div>
            <label className="block mb-1 font-medium">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleInput}
              name="bookTitle"
              value={formData?.bookTitle}
              type="text"
              required
              placeholder="Enter book title"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleInput}
              name="price"
              value={formData?.price}
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="Enter book price"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAuthorBookModal;