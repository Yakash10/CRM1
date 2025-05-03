import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

const VendorsPage = () => {
  const [vendors, setVendors] = useState([
    {
      name: "John's Plumbing",
      category: "Plumber",
      contact: "john@example.com",
      rating: 4.5,
      areaOfService: "Downtown",
      specialties: ["Leak Repairs", "Pipe Installations"],
    },
    {
      name: "Electric Masters",
      category: "Electrician",
      contact: "contact@electricmasters.com",
      rating: 4.8,
      areaOfService: "Uptown",
      specialties: ["Wiring", "Lighting Installation"],
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    contact: "",
    rating: "",
    areaOfService: "",
    specialties: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddVendor = () => {
    if (
      form.name &&
      form.category &&
      form.contact &&
      form.rating &&
      form.areaOfService
    ) {
      const newVendor = {
        ...form,
        rating: parseFloat(form.rating),
        specialties: form.specialties.split(",").map((item) => item.trim()),
      };

      if (editIndex !== null) {
        const updatedVendors = [...vendors];
        updatedVendors[editIndex] = newVendor;
        setVendors(updatedVendors);
      } else {
        setVendors([...vendors, newVendor]);
      }

      setForm({
        name: "",
        category: "",
        contact: "",
        rating: "",
        areaOfService: "",
        specialties: "",
      });
      setEditIndex(null);
      setShowForm(false);
    }
  };

  const handleEdit = (index) => {
    setForm({
      name: vendors[index].name,
      category: vendors[index].category,
      contact: vendors[index].contact,
      rating: vendors[index].rating.toString(),
      areaOfService: vendors[index].areaOfService,
      specialties: vendors[index].specialties.join(", "),
    });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedVendors = [...vendors];
    updatedVendors.splice(index, 1);
    setVendors(updatedVendors);
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg md:text-xl font-semibold">Vendors List</h2>
        <button
          onClick={() => {
            setForm({
              name: "",
              category: "",
              contact: "",
              rating: "",
              areaOfService: "",
              specialties: "",
            });
            setEditIndex(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base"
        >
          Add Vendor
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-xs sm:text-sm">
            <tr>
              <th className="p-2 border">Vendor Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Area of Service</th>
              <th className="p-2 border">Specialties</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{vendor.name}</td>
                <td className="p-2 border">{vendor.category}</td>
                <td className="p-2 border">{vendor.contact}</td>
                <td className="p-2 border">{vendor.rating}</td>
                <td className="p-2 border">{vendor.areaOfService}</td>
                <td className="p-2 border">{vendor.specialties.join(", ")}</td>
                <td className="p-2 border">
                  <div className="flex gap-2 justify-center">
                    <Pencil
                      onClick={() => handleEdit(index)}
                      className="text-yellow-600 cursor-pointer w-4 h-4"
                    />
                    <Trash
                      onClick={() => handleDelete(index)}
                      className="text-red-600 cursor-pointer w-4 h-4"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:max-w-xl p-6 space-y-4">
            <h2 className="text-base md:text-lg font-semibold mb-2">
              {editIndex !== null ? "Edit Vendor" : "Add New Vendor"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Vendor Name"
                value={form.name}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Info"
                value={form.contact}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                value={form.rating}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                min="0"
                max="5"
              />
              <input
                type="text"
                name="areaOfService"
                placeholder="Area of Service"
                value={form.areaOfService}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="specialties"
                placeholder="Specialties (comma separated)"
                value={form.specialties}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border text-gray-700 text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVendor}
                className="px-4 py-2 rounded bg-blue-600 text-white text-sm md:text-base"
              >
                {editIndex !== null ? "Update Vendor" : "Add Vendor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorsPage;
