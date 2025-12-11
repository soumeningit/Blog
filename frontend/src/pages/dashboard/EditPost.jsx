import { useEffect, useState, useRef } from "react";
import { AlertTriangle, Edit3, FileText, X as XIcon } from "lucide-react";
import { useToast } from "../../components/ToastProvider";
import { getBlogByIdAPI } from "../../service/operations/GeneralOpern";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  getSubCategoriesAPI,
  saveBlogAPI,
} from "../../service/operations/ContentOpern";
import { formateDate } from "../../utils/DateFormatter";
import Editor from "../Editor/Editor";
import { useDarkMode } from "../../contexts/DarkModeContext";
import PreviewModal from "../Editor/PreviewModal";

function EditPost() {
  const darkMode = useDarkMode().darkMode;
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { postId } = useParams();
  const authData = useAuth().getValue();
  const userId = authData?.user?.id;
  // const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const authToken = authData?.token || null;

  const [isEditing, setIsEditing] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [heroFile, setHeroFile] = useState(null);
  const [isThumbnailEditing, setIsThumbnailEditing] = useState(false);
  const fileInputRef = useRef(null);
  const heroFileInputRef = useRef(null);
  // Track which fields are currently in edit mode (Map used to follow your request)
  const [editingMap, setEditingMap] = useState(new Map());
  // Track which fields have been edited (for optimized updates)
  const [editedMap, setEditedMap] = useState(new Map());
  // Local tags array used when editing tags inline
  const [tagsArray, setTagsArray] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isHeroSectionEditing, setIsHeroSectionEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const note = [
    {
      id: 1,
      message: "You can't change category while editing.",
    },
    {
      id: 2,
      message: "You need to log in to save your changes.",
    },
    {
      id: 3,
      message:
        "To add new tags, type the tag and press Enter. When done, click done button.",
    },
    {
      id: 4,
      message: "Remember to save your changes before leaving the page.",
    },
    {
      id: 5,
      message: "Before save the data don't cut the current tab.",
      important: true,
    },
  ];

  useEffect(() => {
    async function getPostDetails() {
      setLoading(true);
      try {
        const response = await getBlogByIdAPI(postId, userId);
        if (response?.status === 200) {
          setPostData(response?.data?.data || null);
          // setTags(
          //   response?.data?.data?.post?.tags
          //     ? JSON.parse(response?.data?.data?.post?.tags)
          //     : []
          // );
          setSelectedCategory(
            response?.data?.data?.post?.categories?.[0] || null
          );
          const category = response?.data?.data?.post?.categories?.[0]?._id;
          const subCategoriesResponse = await getSubCategoriesAPI(
            authToken,
            category
          );
          if (subCategoriesResponse?.status === 200) {
            setSubCategories(subCategoriesResponse.data.data || []);
          }
          setPost(response?.data?.data?.post || null);
          setComments(response?.data?.data?.comments || []);
          const tPost = response?.data?.data?.post;
          if (tPost) {
            setTitle(tPost.title || "");
            setDescription(tPost.description || "");
            setContentHtml(tPost.body || "");
            setTagsArray(
              Array.isArray(tPost.tags)
                ? tPost.tags
                : tPost.tags
                ? JSON.parse(tPost.tags)
                : []
            );

            if (tPost.subCategory && tPost.subCategory.length) {
              setSelectedSubcategories(
                tPost.subCategory.map((s) => s._id || s.id)
              );
            }
            setThumbnailPreview(tPost.thumbnail || null);
            setHeroPreview(tPost.heroSectionImage || null);
          }
        } else {
          toast.error("Failed to load post details");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Post details not found");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (postId) getPostDetails();
  }, [postId, userId]);

  // Toggle edit mode for a field
  const toggleEdit = (field) => {
    const nm = new Map(editingMap);
    nm.set(field, !nm.get(field));
    setEditingMap(nm);
    // if turning on edit, mark page as editing as well
    if (!isEditing) setIsEditing(true);
  };

  // Mark a field as edited
  const markEdited = (field) => {
    const nm = new Map(editedMap);
    nm.set(field, true);
    setEditedMap(nm);
  };

  function addTag(tag) {
    console.log(tag);
    setTags((prev) => [tag, ...prev]);
  }

  function removeTag(tag, index) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  const handleSaveContent = async () => {
    if (!authToken) return toast.error("You must be logged in to save.");

    setIsSavingContent(true);
    // postId, content
    try {
      const response = await saveBlogAPI(authToken, {
        id: postId,
        content: contentHtml,
      });
      if (response.status === 200) {
        setIsSavingContent(false);
        localStorage.removeItem("currentEntryId");
        sessionStorage.removeItem(`entry_${postId}`);
        toast.success("Content saved successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Save failed");
    } finally {
      setIsSavingContent(false);
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "thumbnail") {
        setThumbnailPreview(reader.result);
        setThumbnailFile(file);
        markEdited("thumbnail");
      } else if (type === "hero") {
        setHeroPreview(reader.result);
        setHeroFile(file);
        markEdited("hero");
      }
    };
    reader.readAsDataURL(file);
  };

  // Local tag helpers for inline editing
  const addTagLocal = (tag) => {
    const v = (tag || "").trim();
    if (!v) return;
    if (!tagsArray.includes(v)) setTagsArray((prev) => [...prev, v]);
    markEdited("tags");
  };

  const removeTagLocal = (tag) => {
    setTagsArray((prev) => prev.filter((t) => t !== tag));
    markEdited("tags");
  };

  // Persist current edit state to localStorage so the user can resume before final submit.
  useEffect(() => {
    if (!post || !post._id) return;
    try {
      const editedFields = JSON.stringify(Array.from(editedMap.entries()));
      const payload = {
        id: post._id,
        title,
        description,
        contentHtml,
        tags: tagsArray,
        thumbnailPreview: thumbnailPreview || null,
        heroPreview: heroPreview || null,
        selectedCategory,
        selectedSubcategories,
        editedFields,
        savedAt: new Date().toISOString(),
      };
      sessionStorage.setItem(`editpost_${post._id}`, JSON.stringify(payload));
    } catch (e) {
      // ignore localStorage errors (e.g., quota) but log for debugging
      console.error("Failed to save edit state to localStorage", e);
    }
    // Use a stringified representation of editedMap as dependency to trigger updates
  }, [
    post?._id,
    title,
    description,
    contentHtml,
    JSON.stringify(tagsArray),
    thumbnailPreview,
    heroPreview,
    selectedCategory,
    JSON.stringify(selectedSubcategories),
    JSON.stringify(Array.from(editedMap.entries())),
  ]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center text-sm text-gray-500">
          Loading post details...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium">Post not found</h3>
          <p className="text-sm text-gray-500">
            Unable to load the requested post.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            {editingMap.get("title") ? (
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  markEdited("title");
                }}
                className="block w-full text-2xl font-extrabold px-3 py-2 border border-gray-200 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                aria-label="Edit post title"
              />
            ) : (
              <h1 className="truncate text-2xl sm:text-3xl font-extrabold">
                {post.title}
              </h1>
            )}
            <button
              onClick={() => toggleEdit("title")}
              className="inline-flex items-center justify-center p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
              title="Edit title"
              aria-pressed={!!editingMap.get("title")}
            >
              <Edit3 size={16} />
            </button>
          </div>

          <div className="mt-2 text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div>
              Status:{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {post.status}
              </span>
            </div>
            <div>
              Reading time:{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {post.readingTime || "-"} min
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
            <input
              type="file"
              accept="image/*"
              ref={heroFileInputRef}
              onChange={(e) => handleImageChange(e, "hero")}
              className="hidden"
              aria-hidden
            />

            {/* Hero */}
            <div className="relative bg-gray-50 dark:bg-gray-900">
              <img
                src={
                  isHeroSectionEditing
                    ? heroPreview || post.heroSectionImage
                    : post.heroSectionImage
                }
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => {
                    heroFileInputRef.current?.click();
                    setIsHeroSectionEditing(true);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-gray-700/90 rounded-md shadow-sm hover:opacity-95 transition"
                  title="Edit hero image"
                >
                  <Edit3 size={14} />
                  <span className="sr-only">Edit hero image</span>
                </button>
              </div>
            </div>

            {/* Title / Description */}
            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <button
                  onClick={() => toggleEdit("title")}
                  title="Edit title"
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit3 size={14} />
                </button>
              </div>

              {editingMap.get("title") ? (
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    markEdited("title");
                  }}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              ) : (
                <input
                  value={title}
                  readOnly
                  className="w-full px-3 py-2 rounded-md border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
                />
              )}

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-start justify-between">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <button
                    onClick={() => toggleEdit("description")}
                    title="Edit description"
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>

                {editingMap.get("description") ? (
                  <div>
                    <textarea
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        markEdited("description");
                      }}
                      rows={3}
                      className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                    <div className="mt-2">
                      <button
                        onClick={() => toggleEdit("description")}
                        className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 transition"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={description}
                    readOnly
                    rows={3}
                    className="w-full px-3 py-2 rounded-md border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 min-h-[600px]">
            {/* Editor */}
            <div
              className={`min-h-[600px] ${
                showPreview ? "lg:col-span-1" : "col-span-1"
              }`}
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
                    content={contentHtml}
                    onChange={setContentHtml}
                    onPreview={() => setShowPreview(true)}
                    onSubmit={handleSaveContent}
                    isSubmitting={isSavingContent}
                    showSaveButton={true}
                    showPreviewButton={true}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
            {showPreview && (
              <PreviewModal
                content={contentHtml}
                onClose={() => setShowPreview(false)}
                darkMode={darkMode}
              />
            )}
          </div>

          {/* Comments */}
          <section>
            <h3 className="text-lg font-semibold mb-3">
              Comments ({comments.length})
            </h3>
            <div className="space-y-3">
              {comments.map((c) => (
                <article
                  key={c._id}
                  className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {c.commentorDetails?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formateDate(c.createdAt)}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {c.comment}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Tags */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Tags</h4>
              <button
                onClick={() => toggleEdit("tags")}
                title="Edit tags"
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit3 size={14} />
              </button>
            </div>

            {editingMap.get("tags") ? (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags?.map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="inline-flex items-center gap-2 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm rounded"
                    >
                      {t}
                      <button
                        onClick={() => {
                          removeTagLocal(t);
                          removeTag(t, i);
                        }}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label={`Remove tag ${t}`}
                      >
                        <XIcon size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add tag"
                    className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTagLocal(e.target.value);
                        addTag(e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <button
                    onClick={() => toggleEdit("tags")}
                    className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {tagsArray?.map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-3">Meta</h4>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <div>
                Author:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {post.author?.name || post.author}
                </span>
              </div>
              <div>
                Created:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {formateDate(post.createdAt)}
                </span>
              </div>
              <div>
                Updated:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {formateDate(post.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-3">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {(post.categories || []).map((c) => (
                <span
                  key={c._id || c.id}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium mb-2">Sub Categories</h4>
              <button
                onClick={() => toggleEdit("subcategories")}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit3 size={14} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(post.subCategory || []).map((c) => (
                <span
                  key={c._id || c.id}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded"
                >
                  {c.name}
                </span>
              ))}
            </div>

            {editingMap.get("subcategories") && (
              <div className="mt-3 space-y-2">
                {subCategories.map((subCat) => (
                  <label key={subCat._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(subCat._id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          setSelectedSubcategories((prev) => [
                            ...prev,
                            subCat._id,
                          ]);
                        } else {
                          setSelectedSubcategories((prev) =>
                            prev.filter((id) => id !== subCat._id)
                          );
                        }
                        markEdited("subcategories");
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{subCat.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2">Thumbnail</h4>
            <div className="space-y-2">
              {isThumbnailEditing ? (
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                    Thumbnail
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "thumbnail")}
                    className="block w-full"
                  />
                  {thumbnailPreview && (
                    <img
                      src={thumbnailPreview}
                      alt="thumbnail"
                      className="w-full h-28 object-cover rounded mt-2"
                    />
                  )}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setIsThumbnailEditing(false)}
                      className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => {
                        setThumbnailPreview(null);
                        setThumbnailFile(null);
                        markEdited("thumbnail");
                      }}
                      className="inline-flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {post.thumbnail ? (
                    <div className="relative">
                      <img
                        src={post.thumbnail}
                        alt="thumbnail"
                        className="w-full h-28 object-cover rounded"
                      />
                      <button
                        onClick={() => {
                          setIsThumbnailEditing(true);
                          fileInputRef.current?.click();
                        }}
                        title="Edit thumbnail"
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No thumbnail set
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md shadow-sm border border-yellow-100 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-orange-400" />
              <div>
                <h4 className="text-sm font-medium mb-1">Note</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-2 list-disc">
                  {note.map((n) => (
                    <li
                      className={
                        n.important ? "font-semibold text-red-600" : ""
                      }
                      key={n.id}
                    >
                      {n.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EditPost;
