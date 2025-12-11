import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Edit3,
  Trash2,
  ChevronRight,
  ChevronDown,
  Upload,
  FileText,
  Plus,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  FolderOpen,
} from "lucide-react";
import {
  createCategoryAPI,
  createSubCategoryAPI,
} from "../../service/operations/AdminOpern";
import { useAuth } from "../../contexts/AuthContext";
import { getAllCategoriesAPI } from "../../service/operations/GeneralOpern";

// Color options for categories
const colorOptions = [
  "from-indigo-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-teal-500",
  "from-yellow-500 to-orange-500",
  "from-red-500 to-pink-500",
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-blue-500",
  "from-green-500 to-lime-500",
  "from-orange-500 to-red-500",
  "from-teal-500 to-cyan-500",
];

function CategoriesManagement() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "Folder",
    color: "from-indigo-500 to-purple-500",
  });
  const [loading, setLoading] = useState(true);
  const [importError, setImportError] = useState("");
  const [importedCategories, setImportedCategories] = useState([]);
  const [importSubmitting, setImportSubmitting] = useState(false);
  const [showImportPreview, setShowImportPreview] = useState(false);
  const fileInputRef = useRef(null);

  const authData = useAuth().getValue();
  const token = authData?.token || "";

  useEffect(() => {
    async function getCategories() {
      setLoading(true);
      try {
        const response = await getAllCategoriesAPI();
        console.log("Categories api response : " + JSON.stringify(response));
        setLoading(false);
        if (response.status === 200) {
          // Process the flat list into parent-child structure
          const flatCategories = response.data.data;
          const parentCategories = [];
          const childMap = {};

          // First, separate parent and child categories
          flatCategories.forEach((category) => {
            if (category.parent === null) {
              parentCategories.push(category);
            } else {
              // Group children by parent ID
              if (!childMap[category.parent]) {
                childMap[category.parent] = [];
              }
              childMap[category.parent].push(category);
            }
          });

          // Then attach children to their parents
          const structuredCategories = parentCategories.map((parent) => ({
            ...parent,
            subcategories: childMap[parent.id] || [],
          }));

          setCategoriesList(structuredCategories);
        }
      } catch (error) {
        setLoading(false);
        console.log("error : " + error);
      } finally {
        setLoading(false);
      }
    }
    getCategories();
  }, []);

  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = async () => {
    if (newCategory.name && newCategory.description) {
      const category = {
        name: newCategory.name,
        description: newCategory.description,
        colour: newCategory.color,
        parent: isSubcategory ? parentCategoryId : null,
      };

      try {
        const response = await createCategoryAPI([category], token);
        console.log("API response:", response);

        if (response.status === 201 || response.status === 200) {
          // Refresh categories list after successful creation
          const refreshResponse = await getAllCategoriesAPI();
          if (refreshResponse.status === 200) {
            const flatCategories = refreshResponse.data.data;
            const parentCategories = [];
            const childMap = {};

            flatCategories.forEach((cat) => {
              if (cat.parent === null) {
                parentCategories.push(cat);
              } else {
                if (!childMap[cat.parent]) {
                  childMap[cat.parent] = [];
                }
                childMap[cat.parent].push(cat);
              }
            });

            const structuredCategories = parentCategories.map((parent) => ({
              ...parent,
              subcategories: childMap[parent.id] || [],
            }));

            setCategoriesList(structuredCategories);
          }
        }
        resetForm();
      } catch (error) {
        console.error("Error creating category:", error);
        setImportError(`Error creating category: ${error.message}`);
      }
    }
  };

  const handleUpdateCategory = async () => {
    console.log("Updating category:", editingCategory);
    if (editingCategory && newCategory.name && newCategory.description) {
      const updatedCategory = {
        id: editingCategory.id,
        name: newCategory.name,
        description: newCategory.description,
        colour: newCategory.color,
        parent: isSubcategory ? parentCategoryId : editingCategory.parent,
      };

      if (isSubcategory && parentCategoryId) {
        // API Call
        console.log("Updating subcategory:", updatedCategory);
      }

      try {
        // Note: You would need to implement updateCategoryAPI
        // const response = await updateCategoryAPI(updatedCategory, token);
        console.log("Updating category:", updatedCategory);

        // For now, just update the local state
        if (isSubcategory && parentCategoryId) {
          // Update subcategory
          setCategoriesList((prev) =>
            prev.map((cat) =>
              cat.id === parentCategoryId
                ? {
                    ...cat,
                    subcategories: cat.subcategories.map((sub) =>
                      sub.id === editingCategory.id ? updatedCategory : sub
                    ),
                  }
                : cat
            )
          );
        } else {
          // Update main category
          setCategoriesList((prev) =>
            prev.map((cat) =>
              cat.id === editingCategory.id ? updatedCategory : cat
            )
          );
        }

        resetForm();
      } catch (error) {
        console.error("Error updating category:", error);
        setImportError(`Error updating category: ${error.message}`);
      }
    }
  };

  const handleDeleteCategory = async (
    categoryId,
    isSub = false,
    parentId = null
  ) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        // Note: You would need to implement deleteCategoryAPI
        // const response = await deleteCategoryAPI(categoryId, token);
        console.log("Deleting category:", categoryId);

        // For now, just update the local state
        if (isSub && parentId) {
          // Delete subcategory
          setCategoriesList((prev) =>
            prev.map((cat) =>
              cat.id === parentId
                ? {
                    ...cat,
                    subcategories: cat.subcategories.filter(
                      (sub) => sub.id !== categoryId
                    ),
                  }
                : cat
            )
          );
        } else {
          // Delete main category
          setCategoriesList((prev) =>
            prev.filter((cat) => cat.id !== categoryId)
          );
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        setImportError(`Error deleting category: ${error.message}`);
      }
    }
  };

  const handleEditCategory = (category, isSub = false, parentId = null) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      icon: category.icon || "Folder",
      color:
        category.colour || category.color || "from-indigo-500 to-purple-500",
    });
    setIsSubcategory(isSub);
    setParentCategoryId(parentId);
    setShowAddForm(true);
  };

  async function handleAddSubcategory() {
    console.log("Adding subcategory to:", parentCategoryId);
    if (newCategory.name && newCategory.description && parentCategoryId) {
      const subcategory = {
        name: newCategory.name,
        description: newCategory.description,
        colour: newCategory.color,
        parent: parentCategoryId,
      };
      console.log("New subcategory data:", subcategory);
      try {
        const response = await createSubCategoryAPI(
          { category: parentCategoryId, subCategory: [subcategory] },
          token
        );
        console.log("Subcategory created:", response);
        console.log("Subcategory created:", JSON.stringify(response));
        if (response.status === 201 || response.status === 200) {
          setCategoriesList((prev) =>
            prev.map((cat) =>
              cat._id === parentCategoryId
                ? {
                    ...cat,
                    subcategories: [...cat.subcategories, response.data],
                  }
                : cat
            )
          );
          resetForm();
        }
      } catch (error) {
        console.error("Error creating subcategory:", error);
        setImportError(
          error.response?.data?.message ||
            `Error creating subcategory: ${error.message}`
        );
      }
    }
  }

  const resetForm = () => {
    setNewCategory({
      name: "",
      description: "",
      icon: "Folder",
      color: "from-indigo-500 to-purple-500",
    });
    setShowAddForm(false);
    setEditingCategory(null);
    setIsSubcategory(false);
    setParentCategoryId(null);
  };

  const handleImportJSON = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);

        // Print raw imported data
        console.log("Imported JSON:", importedData);

        // Validate structure
        if (!Array.isArray(importedData)) {
          throw new Error("Invalid format: Expected an array of categories");
        }

        // Process and validate each category
        const processedCategories = importedData.map((cat, index) => {
          if (!cat.name || !cat.description) {
            throw new Error(
              `Category at index ${index} is missing required fields`
            );
          }

          return {
            name: cat.name,
            description: cat.description,
            colour: cat.color || "from-indigo-500 to-purple-500",
            parent: cat.parent || null,
            subcategories: Array.isArray(cat.subcategories)
              ? cat.subcategories.map((sub, subIndex) => {
                  if (!sub.name || !sub.description) {
                    throw new Error(
                      `Subcategory in ${cat.name} at index ${subIndex} is missing required fields`
                    );
                  }

                  return {
                    name: sub.name,
                    description: sub.description,
                    colour: sub.color || "from-indigo-500 to-purple-500",
                    parent: null, // Will be set after parent is created
                  };
                })
              : [],
          };
        });

        // First, create parent categories
        const parentCategories = processedCategories.filter(
          (cat) => cat.parent === null
        );

        // Save processed categories and show preview
        console.log("Processed categories (preview):", processedCategories);
        setImportedCategories(processedCategories);
        setShowImportPreview(true);
        setImportError("");
      } catch (error) {
        console.error("Error importing JSON:", error);
        setImportError(`Error importing JSON: ${error.message}`);
        setShowImportPreview(false);
      }
    };

    reader.readAsText(file);
  };

  const submitImportedCategories = async () => {
    if (!importedCategories || importedCategories.length === 0) return;
    setImportSubmitting(true);
    try {
      const response = await createCategoryAPI(importedCategories, token);
      console.log("API response:", response);
      console.log("API response:", JSON.stringify(response));
      if (response.status === 201 || response.status === 200) {
        // Refresh categories list after successful import
        const refreshResponse = await getAllCategoriesAPI();
        if (refreshResponse.status === 200) {
          const flatCategories = refreshResponse.data.data;
          const parentCategories = [];
          const childMap = {};

          flatCategories.forEach((cat) => {
            if (cat.parent === null) {
              parentCategories.push(cat);
            } else {
              if (!childMap[cat.parent]) {
                childMap[cat.parent] = [];
              }
              childMap[cat.parent].push(cat);
            }
          });

          const structuredCategories = parentCategories.map((parent) => ({
            ...parent,
            subcategories: childMap[parent.id] || [],
          }));

          setCategoriesList(structuredCategories);
        }

        setImportedCategories([]);
        setShowImportPreview(false);
        setImportError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setImportError(
          `Import failed: ${response.statusText || response.status}`
        );
      }
    } catch (err) {
      console.error("API error during import submit:", err);
      setImportError(
        `API error: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setImportSubmitting(false);
    }
  };

  const cancelImport = () => {
    setImportedCategories([]);
    setShowImportPreview(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadSampleJSON = () => {
    const sampleData = [
      {
        name: "Sample Category",
        description: "This is a sample category description",
        colour: "from-indigo-500 to-purple-500",
        parent: null,
        subcategories: [
          {
            name: "Sample Subcategory",
            description: "This is a sample subcategory description",
            colour: "from-blue-500 to-cyan-500",
          },
        ],
      },
    ];

    const dataStr = JSON.stringify(sampleData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "categories-sample.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Categories Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your content with categories and subcategories
          </p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Upload size={18} />
            Import JSON
          </button>
          <button
            onClick={downloadSampleJSON}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <FileText size={18} />
            Sample JSON
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Import Error Message */}
      {importError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={18} />
            {importError}
          </div>
          <button onClick={() => setImportError("")}>
            <X size={18} />
          </button>
        </motion.div>
      )}

      {/* Import Preview Modal */}
      {showImportPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Eye size={20} />
                Import Preview
              </h3>
              <button
                onClick={cancelImport}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                You're about to import {importedCategories.length} categories
                with{" "}
                {importedCategories.reduce(
                  (acc, cat) => acc + (cat.subcategories?.length || 0),
                  0
                )}{" "}
                subcategories. Please review data below before confirming.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {importedCategories.map((category, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <FolderOpen size={16} />
                      {category.name}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${category.colour}`}
                    >
                      {category.postCount || 0} posts
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {category.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                    Color: {category.colour}
                  </div>

                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <div className="mt-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subcategories ({category.subcategories.length}):
                        </h5>
                        <div className="space-y-2">
                          {category.subcategories.map((sub, subIndex) => (
                            <div
                              key={subIndex}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <ChevronRight size={14} />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {sub.name}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {sub.postCount || 0} posts
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={cancelImport}
                disabled={importSubmitting}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={submitImportedCategories}
                disabled={importSubmitting}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {importSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Importing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Confirm Import
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add/Edit Category Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6"
        >
          <h3 className="text-lg font-semibold mb-4">
            {editingCategory ? "Edit Category" : "Add New Category"}
            {isSubcategory && (
              <span className="text-sm text-gray-500 ml-2">(Subcategory)</span>
            )}
          </h3>

          {isSubcategory && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Adding as subcategory to:{" "}
                <strong>
                  {categoriesList.find((c) => c.id === parentCategoryId)?.name}
                </strong>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={
                  isSubcategory ? "Subcategory name" : "Category name"
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
                placeholder={
                  isSubcategory
                    ? "Subcategory description"
                    : "Category description"
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCategory({ ...newCategory, color })}
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${color} ${
                      newCategory.color === color
                        ? "ring-2 ring-offset-2 ring-purple-500"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={
                editingCategory
                  ? handleUpdateCategory
                  : isSubcategory
                  ? handleAddSubcategory
                  : handleAddCategory
              }
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save size={16} />
              {editingCategory
                ? "Update Category"
                : isSubcategory
                ? "Add Subcategory"
                : "Add Category"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesList.map((category, index) => {
          const isExpanded = expandedCategories.includes(category.id);

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
            >
              <div className={`h-2 bg-gradient-to-r ${category.colour}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.postCount || 0} posts
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">
                    Slug: /{category.slug}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </span>
                </div>

                {/* Subcategories */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Subcategories ({category.subcategories?.length || 0})
                    </span>
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <button
                          onClick={() => toggleCategoryExpansion(category.id)}
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          {isExpanded ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </button>
                      )}
                  </div>

                  {isExpanded && category.subcategories && (
                    <div className="space-y-2 mt-3">
                      {category.subcategories.map((subcategory) => {
                        return (
                          <div
                            key={subcategory.id}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {subcategory.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {subcategory.postCount || 0} posts
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() =>
                                  handleEditCategory(
                                    subcategory,
                                    true,
                                    category.id
                                  )
                                }
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteCategory(
                                    subcategory.id,
                                    true,
                                    category.id
                                  )
                                }
                                className="text-red-600 hover:text-red-800 dark:text-red-400"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setIsSubcategory(true);
                      setParentCategoryId(category._id);
                      setShowAddForm(true);
                    }}
                    className="mt-2 w-full flex items-center justify-center gap-1 p-2 text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 border border-dashed border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
                  >
                    <Plus size={14} />
                    Add Subcategory
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        className="hidden"
      />
    </div>
  );
}

export default CategoriesManagement;
