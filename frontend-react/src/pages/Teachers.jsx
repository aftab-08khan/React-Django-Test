import React from "react";
import { useSearchParams } from "react-router-dom";

const teachers = [
  {
    id: 1,
    name: "John Smith",
    subject: "Mathematics",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    subject: "Science",
    email: "sarah@example.com",
  },
  {
    id: 3,
    name: "Michael Brown",
    subject: "English",
    email: "michael@example.com",
  },
];

const Teachers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const modal = searchParams.get("modal");
  const teacherId = Number(searchParams.get("id"));

  const selectedTeacher = teachers.find(
    (teacher) => teacher.id === teacherId
  );

  const openAddModal = () => {
    setSearchParams({ modal: "add" });
  };

  const openEditModal = (id) => {
    setSearchParams({
      modal: "edit",
      id,
    });
  };

  const closeModal = () => {
    setSearchParams({});
  };

  const isModalOpen = modal === "add" || modal === "edit";

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Teachers</h2>

          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Teacher
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-t">
                  <td className="p-3">{teacher.name}</td>
                  <td className="p-3">{teacher.subject}</td>
                  <td className="p-3">{teacher.email}</td>
                  <td className="p-3">
                    <button
                      onClick={() => openEditModal(teacher.id)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {modal === "add" ? "Add Teacher" : "Edit Teacher"}
              </h3>

              <button
                onClick={closeModal}
                className="text-2xl text-gray-500"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  defaultValue={selectedTeacher?.name || ""}
                  className="w-full border rounded-lg p-3"
                  placeholder="Teacher Name"
                />
              </div>

              <div>
                <label className="block mb-2">Subject</label>
                <input
                  defaultValue={selectedTeacher?.subject || ""}
                  className="w-full border rounded-lg p-3"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block mb-2">Email</label>
                <input
                  defaultValue={selectedTeacher?.email || ""}
                  className="w-full border rounded-lg p-3"
                  placeholder="Email"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {modal === "add" ? "Save Teacher" : "Update Teacher"}
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