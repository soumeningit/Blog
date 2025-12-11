import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cpu,
  Palette,
  Code,
  Atom,
  Accessibility,
  ArrowLeft,
  Search,
  Sparkles,
} from "lucide-react";

import PostCard from "../components/PostCard";

const categoryIconMap = {
  technology: Cpu,
  design: Palette,
  javascript: Code,
  react: Atom,
  accessibility: Accessibility,
};

// Temporary mock data (replace with API later)
const mockCategories = [
  {
    id: 1,
    name: "Technology",
    description: "Latest trends and innovations in technology",
    color: "bg-blue-500",
    icon: "Cpu",
  },
  {
    id: 2,
    name: "Design",
    description: "UI/UX design principles and best practices",
    color: "bg-purple-500",
    icon: "Palette",
  },
  {
    id: 3,
    name: "JavaScript",
    description: "JavaScript tips, tricks, and advanced techniques",
    color: "bg-yellow-500",
    icon: "Code",
  },
  {
    id: 4,
    name: "React",
    description: "React ecosystem and best practices",
    color: "bg-cyan-500",
    icon: "Atom",
  },
  {
    id: 5,
    name: "Accessibility",
    description: "Making the web accessible to everyone",
    color: "bg-green-500",
    icon: "UniversalAccess",
  },
];

const mockPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2024",
    excerpt:
      "Exploring the latest trends and technologies shaping the future of web development.",
    content: "",
    category: "Technology",
    author: "Alex Johnson",
    date: "2024-01-15",
    tags: ["web development", "AI", "future tech"],
    readingTime: 5,
    coverImage: "https://picsum.photos/seed/webdev2024/800/400.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Building Responsive Layouts with Modern CSS",
    excerpt:
      "Master the art of creating responsive layouts using the latest CSS techniques and best practices.",
    content: "",
    category: "Design",
    author: "Sarah Chen",
    date: "2024-01-10",
    tags: ["CSS", "responsive design", "web design"],
    readingTime: 7,
    coverImage: "https://picsum.photos/seed/csslayouts/800/400.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization Techniques",
    excerpt:
      "Learn how to optimize your JavaScript code for better performance and faster load times.",
    content: "",
    category: "JavaScript",
    author: "Michael Rodriguez",
    date: "2024-01-05",
    tags: ["JavaScript", "performance", "optimization"],
    readingTime: 6,
    coverImage: "https://picsum.photos/seed/jsperf/800/400.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Introduction to React Server Components",
    excerpt:
      "Explore the new paradigm of React Server Components and how they're changing the way we build React applications.",
    content: "",
    category: "React",
    author: "Emily Watson",
    date: "2023-12-28",
    tags: ["React", "Server Components", "web development"],
    readingTime: 8,
    coverImage: "https://picsum.photos/seed/reactserver/800/400.jpg",
    featured: true,
  },
  {
    id: 5,
    title: "Accessibility Best Practices for Modern Web Apps",
    excerpt:
      "Learn how to build web applications that are accessible to all users, regardless of their abilities.",
    content: "",
    category: "Accessibility",
    author: "David Kim",
    date: "2023-12-20",
    tags: ["accessibility", "a11y", "web development", "UX"],
    readingTime: 6,
    coverImage: "https://picsum.photos/seed/a11y/800/400.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "State Management in Modern React Applications",
    excerpt:
      "Explore different approaches to state management in React, from local state to global state solutions.",
    content: "",
    category: "React",
    author: "Jessica Liu",
    date: "2023-12-15",
    tags: ["React", "state management", "JavaScript"],
    readingTime: 7,
    coverImage: "https://picsum.photos/seed/reactstate/800/400.jpg",
    featured: false,
  },
];

const getCategoryByIdMock = (id) =>
  mockCategories.find((category) => category.id === parseInt(id, 10));

const getCategoryByNameMock = (name) =>
  mockCategories.find(
    (category) => category.name.toLowerCase() === name.toLowerCase()
  );

const getPostsByCategoryMock = (category) =>
  mockPosts.filter((post) => post.category === category);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function CategoryDetails() {
  const { categoryName, categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const decodedName = categoryName ? decodeURIComponent(categoryName) : null;
  const normalizedName = decodedName ? decodedName.toLowerCase() : null;

  const category = useMemo(() => {
    if (categoryId) {
      const foundById = getCategoryByIdMock(categoryId);
      if (foundById) return foundById;
    }
    if (normalizedName) {
      return getCategoryByNameMock(normalizedName);
    }
    return null;
  }, [categoryId, normalizedName]);

  const categoryPosts = useMemo(() => {
    if (!category?.name) return [];
    return getPostsByCategoryMock(category.name) || [];
  }, [category?.name]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return categoryPosts;
    const q = searchQuery.toLowerCase();
    return categoryPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [categoryPosts, searchQuery]);

  const stats = useMemo(() => {
    const count = categoryPosts.length;
    const avgReadingTime =
      count > 0
        ? Math.round(
            categoryPosts.reduce(
              (acc, post) => acc + (post.readingTime || 0),
              0
            ) / count
          )
        : 0;
    const tags = new Set();
    categoryPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    const lastUpdated = categoryPosts
      .map((post) => new Date(post.date))
      .sort((a, b) => b - a)[0];

    return {
      count,
      avgReadingTime,
      tagsCount: tags.size,
      lastUpdated,
      tags: Array.from(tags).slice(0, 8),
    };
  }, [categoryPosts]);

  if (!category) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
              We couldn't find that category.
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold hover:from-primary-700 hover:to-purple-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const CategoryIcon = categoryIconMap[category.name.toLowerCase()] || Sparkles;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
          <Link
            to="/"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/categories"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Categories
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {category.name}
          </span>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/10" aria-hidden />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-sm">
                <CategoryIcon className="w-10 h-10" />
              </div>
              <div>
                <p className="uppercase tracking-[0.2em] text-white/70 text-sm mb-2">
                  Category Spotlight
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                  {category.name}
                </h1>
                <p className="text-white/90 max-w-2xl text-lg">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-4">
                <p className="text-sm text-white/70 mb-1">Posts</p>
                <p className="text-2xl font-bold">{stats.count}</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-4">
                <p className="text-sm text-white/70 mb-1">Avg read</p>
                <p className="text-2xl font-bold">{stats.avgReadingTime} min</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-4">
                <p className="text-sm text-white/70 mb-1">Tags</p>
                <p className="text-2xl font-bold">{stats.tagsCount}</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-4">
                <p className="text-sm text-white/70 mb-1">Updated</p>
                <p className="text-2xl font-bold">
                  {stats.lastUpdated
                    ? new Date(stats.lastUpdated).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
            <span className="text-sm font-semibold">Popular tags:</span>
            <div className="flex flex-wrap gap-2">
              {stats.tags.length > 0 ? (
                stats.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  No tags yet
                </span>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles in this category..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 shadow-sm"
            />
          </div>
        </div>

        {/* Posts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <PostCard post={post} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center bg-white dark:bg-gray-800 shadow-sm">
              <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                No articles match your search.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your keywords or explore other categories.
              </p>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold hover:from-primary-700 hover:to-purple-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse categories
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CategoryDetails;
