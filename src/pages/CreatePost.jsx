import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import {
  Save,
  Eye,
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  AlertCircle,
  Image as ImageIcon,
  X,
  Check,
  Sparkles,
  Database,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Zap,
  FolderOpen,
  Layers,
  Upload,
  Maximize2,
} from "lucide-react";
import { getAllCategoriesAPI } from "../service/operations/GeneralOpern";
import { useAuth } from "../contexts/AuthContext";
import { createBlogAPI, saveBlogAPI } from "../service/operations/ContentOpern";
import Editor from "./Editor/Editor";
import PreviewModal from "./Editor/PreviewModal";
import { useToast } from "../components/ToastProvider";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

function CreatePost() {
  const [content, setContent] = useState(
    "<p>Start writing your blog post...</p>"
  );

  const { darkMode } = useDarkMode();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [tags, setTags] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showBasicDetails, setShowBasicDetails] = useState(true);
  const [entryId, setEntryId] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredFile, setFeaturedFile] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [heroImage, setHeroImage] = useState("");
  const [heroFile, setHeroFile] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesFetched, setCategoriesFetched] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [imagePreviewModal, setImagePreviewModal] = useState(false);
  const [currentImageType, setCurrentImageType] = useState("");
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState({});
  const [role, setRole] = useState(null);
  const [showUpgradeConfirmation, setShowUpgradeConfirmation] = useState(false);
  const navigate = useNavigate();

  const authData = useAuth().getValue();
  const token = authData.token;
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await getAllCategoriesAPI();
        if (response.status === 200) {
          const flatCategories = response.data.data;

          // Separate parent and child categories
          const parents = [];
          const subcategoriesByParent = {};

          flatCategories.forEach((category) => {
            if (category.parent === null) {
              parents.push(category);
            } else {
              // Group children by parent ID
              if (!subcategoriesByParent[category.parent]) {
                subcategoriesByParent[category.parent] = [];
              }
              subcategoriesByParent[category.parent].push(category);
            }
          });

          setParentCategories(parents);
          setAllSubcategories(subcategoriesByParent);
          setCategories(flatCategories);

          // Show success animation after a short delay
          setTimeout(() => {
            setCategoriesLoading(false);
            setCategoriesFetched(true);

            // Hide the success animation after 3 seconds
            setTimeout(() => {
              setCategoriesFetched(false);
            }, 3000);
          }, 800);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesLoading(false);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Check if there's an entry ID in localStorage (for editing existing post)
  useEffect(() => {
    const savedEntryId = localStorage.getItem("currentEntryId");
    if (savedEntryId) {
      setEntryId(savedEntryId);
      // Load existing data if needed
      const savedData = localStorage.getItem(`entry_${savedEntryId}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setTitle(parsed.title || "");
        setDescription(parsed.excerpt || "");
        setSelectedCategory(parsed.category || "");
        setSelectedSubcategories(parsed.subcategories || []);
        setTags(parsed.tags || "");
        setContent(parsed.content || "<p>Start writing your blog post...</p>");
        setFeaturedImage(parsed.featuredImage || "");
        setThumbnailImage(parsed.thumbnailImage || "");
        setHeroImage(parsed.heroImage || "");
      }
    }

    // Check if user has dismissed tab warning
    const dismissedTabWarning = localStorage.getItem("dismissedTabWarning");
    if (!dismissedTabWarning) {
      // Show tab warning after 5 seconds
      const timer = setTimeout(() => {
        setShowTabWarning(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle tab close warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (entryId && !dontShowAgain) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [entryId, dontShowAgain]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Reset subcategories when main category changes
    setSelectedSubcategories([]);
  };

  const handleSubcategoryToggle = (subcategoryId) => {
    if (selectedSubcategories.includes(subcategoryId)) {
      // Remove subcategory if already selected
      setSelectedSubcategories(
        selectedSubcategories.filter((id) => id !== subcategoryId)
      );
    } else {
      // Add subcategory if not selected
      setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
    }
  };

  const handleImageUpload = (e, imageType) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Keep a data URL for preview and keep the original File for upload
    const reader = new FileReader();
    reader.onloadend = () => {
      if (imageType === "thumbnail") {
        setThumbnailImage(reader.result);
        setThumbnailFile(file);
      } else if (imageType === "hero") {
        setHeroImage(reader.result);
        setHeroFile(file);
      } else {
        setFeaturedImage(reader.result);
        setFeaturedFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImagePreview = (imageSrc, imageType) => {
    setCurrentImageSrc(imageSrc);
    setCurrentImageType(imageType);
    setImagePreviewModal(true);
  };

  const handleCreateEntry = async () => {
    if (!title.trim() || !description.trim()) {
      setShowCreateModal(true);
      return;
    }

    setIsCreating(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("subCategories", JSON.stringify(selectedSubcategories));
    formData.append("tags", tags);
    formData.append("content", content);

    // Append actual File objects so backend receives files in req.files
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
    if (heroFile) {
      formData.append("heroImage", heroFile);
    }
    // Keep featuredFile also available if backend expects it (optional)
    if (featuredFile) {
      formData.append("featuredImage", featuredFile);
    }

    try {
      const response = await createBlogAPI(token, formData);

      if (response.status === 201) {
        const newId = response.data.data._id;
        setEntryId(newId);
        localStorage.setItem("currentEntryId", newId);

        // Save initial data
        const entryData = {
          id: newId,
          title,
          excerpt: description,
          category: selectedCategory,
          subcategories: selectedSubcategories,
          tags,
          content,
          featuredImage,
          thumbnailImage,
          heroImage,
          createdAt: new Date().toISOString(),
        };
        sessionStorage.setItem(`entry_${newId}`, JSON.stringify(entryData));

        setIsCreating(false);
        setCreateSuccess(true);
        setShowBasicDetails(false); // Collapse after creating

        // Hide the success animation after 3 seconds
        setTimeout(() => {
          setCreateSuccess(false);
        }, 3000);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Error creating entry. Please try again."
      );
      console.error("Error creating entry:", error);
      setIsCreating(false);
      if (error?.response?.data?.upgradeToAuthor) {
        setShowUpgradeModal(true);
      }
      if (error?.response?.data?.role) {
        setRole(error.response.data.role);
      }
    } finally {
      setCategoriesLoading(false);
    }
  };

  const isFormValid =
    title.trim() &&
    description.trim() &&
    content !== "<p>Start writing your blog post...</p>";

  const handleTabWarningClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("dismissedTabWarning", "true");
    }
    setShowTabWarning(false);
  };

  // Check if there are multiple subcategories for any category
  const hasMultipleSubcategories = Object.values(allSubcategories).some(
    (subs) => subs && subs.length > 1
  );

  async function handleSubmit() {
    setIsSubmitting(true);
    setShowPreviewModal(false);

    if (!entryId) {
      setShowSaveModal(true);
      return;
    }

    setIsSaving(true);

    try {
      const response = await saveBlogAPI(token, { id: entryId, content });
      if (response.status === 200) {
        setLastSaved(new Date());
        setIsSaving(false);
        setSaveSuccess(true);
        localStorage.removeItem("currentEntryId");
        sessionStorage.removeItem(`entry_${entryId}`);
        // Hide the success animation after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      setIsSaving(false);
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen pt-8 pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Blog Editor
            </h1>
          </div>

          {/* Categories Fetched Animation */}
          <AnimatePresence>
            {categoriesFetched && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Database
                    className="text-green-600 dark:text-green-400 mr-2"
                    size={20}
                  />
                  <span className="text-sm text-green-800 dark:text-green-200">
                    Categories fetched successfully!
                    {hasMultipleSubcategories && (
                      <span className="ml-2">
                        Found{" "}
                        {Object.values(allSubcategories).reduce(
                          (acc, subs) => acc + (subs ? subs.length : 0),
                          0
                        )}{" "}
                        subcategories across{" "}
                        {Object.keys(allSubcategories).length} categories
                      </span>
                    )}
                  </span>
                </div>
                <CheckCircle2
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Save Success Animation */}
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Save
                    className="text-green-600 dark:text-green-400 mr-2"
                    size={20}
                  />
                  <span className="text-sm text-green-800 dark:text-green-200">
                    Post saved successfully!
                  </span>
                </div>
                <Zap className="text-green-600 dark:text-green-400" size={20} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Create Success Animation */}
          <AnimatePresence>
            {createSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="mb-6 p-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Plus
                    className="text-blue-600 dark:text-blue-400 mr-2"
                    size={20}
                  />
                  <span className="text-sm text-blue-800 dark:text-blue-200">
                    Entry created successfully!
                  </span>
                </div>
                <Sparkles
                  className="text-blue-600 dark:text-blue-400"
                  size={20}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsible Basic Details Section */}
          <motion.div className="glass rounded-2xl mb-6 overflow-hidden" layout>
            <button
              onClick={() => setShowBasicDetails(!showBasicDetails)}
              className="w-full p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <FileText className="text-primary-600 mr-3" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Basic Details
                </h2>
                {entryId && (
                  <span className="ml-3 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                    Entry Created
                  </span>
                )}
              </div>
              {showBasicDetails ? (
                <ChevronUp className="text-gray-500" size={20} />
              ) : (
                <ChevronDown className="text-gray-500" size={20} />
              )}
            </button>

            <AnimatePresence>
              {showBasicDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter post title..."
                          className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Featured Image
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            id="featured-image"
                            onChange={(e) => handleImageUpload(e, "featured")}
                            accept="image/*"
                            className="hidden"
                          />
                          <label
                            htmlFor="featured-image"
                            className="flex-1 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer flex items-center"
                          >
                            {featuredImage ? (
                              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                Image selected
                              </span>
                            ) : (
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Choose image
                              </span>
                            )}
                          </label>
                          {featuredImage && (
                            <>
                              <button
                                onClick={() =>
                                  handleImagePreview(
                                    featuredImage,
                                    "Featured Image"
                                  )
                                }
                                className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400"
                                title="Preview image"
                              >
                                <Maximize2 size={16} />
                              </button>
                              <button
                                onClick={() => setFeaturedImage("")}
                                className="p-2 text-red-500 hover:text-red-700 dark:text-red-400"
                                title="Remove image"
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                        </div>
                        {featuredImage && (
                          <div className="mt-2">
                            <img
                              src={featuredImage}
                              alt="Featured"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Thumbnail Image (Recommended)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          id="thumbnail-image"
                          onChange={(e) => handleImageUpload(e, "thumbnail")}
                          accept="image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="thumbnail-image"
                          className="flex-1 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer flex items-center"
                        >
                          {thumbnailImage ? (
                            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              Thumbnail selected
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Choose thumbnail image
                            </span>
                          )}
                        </label>
                        {thumbnailImage && (
                          <>
                            <button
                              onClick={() =>
                                handleImagePreview(
                                  thumbnailImage,
                                  "Thumbnail Image"
                                )
                              }
                              className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400"
                              title="Preview image"
                            >
                              <Maximize2 size={16} />
                            </button>
                            <button
                              onClick={() => setThumbnailImage("")}
                              className="p-2 text-red-500 hover:text-red-700 dark:text-red-400"
                              title="Remove image"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                      {thumbnailImage && (
                        <div className="mt-2">
                          <img
                            src={thumbnailImage}
                            alt="Thumbnail"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of your post..."
                        rows="2"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <div className="relative">
                        {categoriesLoading ? (
                          <div className="flex items-center justify-center py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800/80">
                            <RefreshCw
                              className="animate-spin text-gray-400"
                              size={16}
                            />
                            <span className="ml-2 text-sm text-gray-500">
                              Loading categories...
                            </span>
                          </div>
                        ) : (
                          <select
                            value={selectedCategory}
                            onChange={(e) =>
                              handleCategoryChange(e.target.value)
                            }
                            className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                          >
                            <option value="">Select a category</option>
                            {parentCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        )}
                        {hasMultipleSubcategories && (
                          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <Layers className="text-primary-500" size={16} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subcategories Selection */}
                    {selectedCategory && allSubcategories[selectedCategory] && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subcategories (select multiple)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {allSubcategories[selectedCategory].map(
                            (subcategory) => (
                              <div
                                key={subcategory.id}
                                className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                                  selectedSubcategories.includes(subcategory.id)
                                    ? "bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                                onClick={() =>
                                  handleSubcategoryToggle(subcategory.id)
                                }
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-3 h-3 rounded-full mr-2 bg-gradient-to-r ${subcategory.colour}`}
                                  ></div>
                                  <span className="text-sm">
                                    {subcategory.name}
                                  </span>
                                  {selectedSubcategories.includes(
                                    subcategory.id
                                  ) && <Check size={14} className="ml-auto" />}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="web development, react, javascript"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {!entryId ? (
                      <motion.button
                        onClick={handleCreateEntry}
                        disabled={
                          isCreating || !title.trim() || !description.trim()
                        }
                        className="w-full btn-primary flex items-center justify-center py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isCreating ? (
                          <>
                            <Loader2 className="animate-spin mr-2" size={18} />
                            Creating Entry...
                          </>
                        ) : (
                          <>
                            <Plus size={18} className="mr-2" />
                            Create Entry
                          </>
                        )}
                      </motion.button>
                    ) : (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center">
                          <AlertCircle size={16} className="mr-2" />
                          Entry created! You can now save your content. Remember
                          to save frequently as changes are not auto-saved.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Editor/Preview Section */}
          <div className="grid gap-6 min-h-[600px]">
            {/* Editor */}
            <motion.div
              className={`min-h-[600px] ${
                showPreview ? "lg:col-span-1" : "col-span-1"
              }`}
              initial={{ opacity: 0, x: showPreview ? -20 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center mb-4 flex-shrink-0">
                  <FileText className="text-primary-600 mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Editor
                  </h2>
                </div>
                <div
                  className="h-screen flex flex-col"
                  style={{ maxHeight: "90vh" }}
                >
                  <Editor
                    content={content}
                    onChange={setContent}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    onPreview={() => setShowPreview((s) => !s)}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {showPreview && (
        <PreviewModal
          content={content}
          onClose={() => setShowPreview(false)}
          darkMode={darkMode}
        />
      )}
      {/* Image Preview Modal */}
      <Modal
        isOpen={imagePreviewModal}
        onClose={() => setImagePreviewModal(false)}
        type="image"
        title={currentImageType}
        imageSrc={currentImageSrc}
        buttonText1="Close"
        onButtonClick1={() => setImagePreviewModal(false)}
      />
      {/* Create Entry Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        type="warning"
        title="Missing Required Fields"
        description="Please fill in title and description fields before creating an entry. These are required to create a blog post."
        buttonText1="OK"
        onButtonClick1={() => setShowCreateModal(false)}
      />
      {/* Save Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        type="warning"
        title="No Entry Created"
        description="You need to create an entry first before you can save your content. Click on 'Basic Details' to fill in the required information and create an entry."
        buttonText1="Go to Basic Details"
        onButtonClick1={() => {
          setShowSaveModal(false);
          setShowBasicDetails(true);
        }}
        buttonText2="Cancel"
        onButtonClick2={() => setShowSaveModal(false)}
      />
      {/* Tab Warning Modal */}
      <Modal
        isOpen={showTabWarning}
        onClose={handleTabWarningClose}
        type="info"
        title="Important: No Auto-Save"
        description="This editor does not automatically save your work. Please remember to save frequently to avoid losing your content. Closing browser tab without saving will result in data loss."
        buttonText1="I Understand"
        onButtonClick1={handleTabWarningClose}
        showCheckbox={true}
        checkboxText="Don't show this message again"
        checkboxChecked={dontShowAgain}
        onCheckboxChange={setDontShowAgain}
      />
      {/* Upgrade to Author Modal */}
      <Modal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        type="warning"
        title="Upgrade Required"
        description="To create posts, please upgrade your account to an author role."
        buttonText1="Upgrade Now"
        onButtonClick1={() => {
          setShowUpgradeModal(false);
          setShowUpgradeConfirmation(true);
        }}
        buttonText2="Cancel"
        onButtonClick2={() => setShowUpgradeModal(false)}
      />
      {/* Upgrade Confirmation Modal */}
      <Modal
        isOpen={showUpgradeConfirmation}
        onClose={() => setShowUpgradeConfirmation(false)}
        type="info"
        title="Upgrade to Author"
        description="Are you sure you want to upgrade your account to an author role? This will grant you permissions to create and manage blog posts."
        buttonText1="Yes, Upgrade"
        onButtonClick1={() => {
          navigate("/dashboard/settings", {
            state: { currentRole: role, tab: "upgrade" },
          });
          setShowUpgradeConfirmation(false);
        }}
        buttonText2="No, Cancel"
        onButtonClick2={() => setShowUpgradeConfirmation(false)}
      />
    </div>
  );
}

export default CreatePost;
