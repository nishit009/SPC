// frontend/src/pages/AdminMenuPage.jsx
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Plus, Trash2, Tag, DollarSign, Leaf, Utensils } from "lucide-react";

const AdminMenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    pricePerPerson: "",
    veg: true,
    tags: ""
  });

  const fetchMenu = () => {
    axiosClient.get("/menu").then((res) => {
      setMenu(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const addItem = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      pricePerPerson: Number(form.pricePerPerson),
      tags: form.tags.split(",").map((t) => t.trim())
    };
    axiosClient
      .post("/menu", payload)
      .then(() => {
        setForm({
          name: "",
          category: "",
          description: "",
          pricePerPerson: "",
          veg: true,
          tags: ""
        });
        fetchMenu();
      })
      .catch(() => alert("Failed to add item"));
  };

  const deleteItem = (id) => {
    if (!window.confirm("Delete this item?")) return;
    axiosClient
      .delete(`/menu/${id}`)
      .then(fetchMenu)
      .catch(() => alert("Delete failed"));
  };

  // Group menu items by category
  const menuByCategory = menu.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Menu Management</h1>
          <p className="text-lg text-gray-600">Add, edit, and organize your catering menu</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add New Item Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-r from-green-600 to-emerald-600 rounded-xl shadow-md">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Item</h2>
            </div>

            <form onSubmit={addItem} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dish Name
                </label>
                <input
                  name="name"
                  placeholder="e.g., Paneer Butter Masala"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  name="category"
                  placeholder="e.g., South Indian, Rice, Desserts"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.category}
                  onChange={onChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the dish..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.description}
                  onChange={onChange}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Price per Person (₹)
                </label>
                <input
                  name="pricePerPerson"
                  type="number"
                  placeholder="150"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.pricePerPerson}
                  onChange={onChange}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="veg"
                    checked={form.veg}
                    onChange={onChange}
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    Vegetarian
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  placeholder="spicy, south indian, popular"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.tags}
                  onChange={onChange}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Menu Item
              </button>
            </form>
          </div>

          {/* Existing Menu */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Current Menu</h2>
            </div>

            <div className="max-h-[600px] overflow-y-auto space-y-6">
              {Object.keys(menuByCategory).length === 0 ? (
                <div className="text-center py-12">
                  <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No menu items yet. Add your first dish!</p>
                </div>
              ) : (
                Object.entries(menuByCategory).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {items.map((m) => (
                        <div
                          key={m._id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900">{m.name}</span>
                              {m.veg ? (
                                <span className="text-green-600 text-xs flex items-center gap-1">
                                  <Leaf className="w-3 h-3" /> Veg
                                </span>
                              ) : (
                                <span className="text-red-600 text-xs">Non-Veg</span>
                              )}
                            </div>
                            {m.description && (
                              <p className="text-xs text-gray-600 mb-2">{m.description}</p>
                            )}
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="font-semibold text-blue-600">₹{m.pricePerPerson}/person</span>
                              {m.tags && m.tags.length > 0 && (
                                <div className="flex gap-1">
                                  {m.tags.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteItem(m._id)}
                            className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuPage;