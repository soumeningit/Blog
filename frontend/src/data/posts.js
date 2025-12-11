export const posts = [
  {
    id: 1,
    title: "The Future of Web Development in 2024",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    content: `<h1>The Future of Web Development in 2024</h1>
    <p>Web development is evolving at an unprecedented pace. In 2024, we're seeing several key trends that are reshaping how we build and experience the web.</p>
    <h2>1. AI-Powered Development</h2>
    <p>Artificial intelligence is no longer just a buzzword in web development. Tools like GitHub Copilot and ChatGPT are becoming integral parts of the development workflow, helping developers write code faster and with fewer errors.</p>
    <blockquote>
      <p>"AI won't replace developers, but developers who use AI will replace those who don't."</p>
    </blockquote>
    <h2>2. Edge Computing</h2>
    <p>Edge computing is bringing computation and data storage closer to the location where it's needed, improving response times and saving bandwidth.</p>
    <ul>
      <li>Reduced latency</li>
      <li>Improved performance</li>
      <li>Better user experience</li>
    </ul>
    <h2>3. WebAssembly (WASM)</h2>
    <p>WebAssembly is enabling near-native performance for web applications, opening up new possibilities for complex applications to run in the browser.</p>
    <pre><code>// Example of WebAssembly usage
const importObject = {
  imports: { imported_func: arg => console.log(arg) }
};
WebAssembly.instantiateStreaming(fetch('simple.wasm'), importObject)
.then(obj => obj.instance.exports.exported_func());</code></pre>
    <p>As we move forward, these technologies will continue to shape the landscape of web development, creating more powerful, efficient, and user-friendly web experiences.</p>`,
    category: "Technology",
    author: "Alex Johnson",
    date: "2024-01-15",
    tags: ["web development", "AI", "future tech"],
    readingTime: 5,
    coverImage: "https://picsum.photos/seed/webdev2024/800/400.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Building Responsive Layouts with Modern CSS",
    excerpt: "Master the art of creating responsive layouts using the latest CSS techniques and best practices.",
    content: `<h1>Building Responsive Layouts with Modern CSS</h1>
    <p>Responsive design is no longer optional in today's multi-device world. Let's explore how to create layouts that look great on any screen size.</p>
    <h2>Container Queries</h2>
    <p>Container queries are one of the most exciting additions to CSS, allowing components to adapt based on their container size rather than the viewport.</p>
    <pre><code>@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}</code></pre>
    <h2>CSS Grid and Flexbox</h2>
    <p>Modern layout systems like CSS Grid and Flexbox make it easier than ever to create complex, responsive layouts with minimal code.</p>
    <blockquote>
      <p>"CSS Grid is for two-dimensional layouts, while Flexbox is for one-dimensional layouts."</p>
    </blockquote>
    <h2>Modern Units</h2>
    <p>New CSS units like <code>rem</code>, <code>em</code>, <code>vw</code>, <code>vh</code>, and <code>clamp()</code> provide more flexibility in creating responsive designs.</p>
    <p>By combining these modern CSS techniques, you can create layouts that adapt seamlessly to any screen size, providing an optimal viewing experience for all users.</p>`,
    category: "Design",
    author: "Sarah Chen",
    date: "2024-01-10",
    tags: ["CSS", "responsive design", "web design"],
    readingTime: 7,
    coverImage: "https://picsum.photos/seed/csslayouts/800/400.jpg",
    featured: true
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization Techniques",
    excerpt: "Learn how to optimize your JavaScript code for better performance and faster load times.",
    content: `<h1>JavaScript Performance Optimization Techniques</h1>
    <p>Performance is crucial for user experience. In this article, we'll explore various techniques to optimize your JavaScript code.</p>
    <h2>Code Splitting</h2>
    <p>Code splitting allows you to split your code into smaller chunks that can be loaded on demand, reducing the initial bundle size.</p>
    <pre><code>// Dynamic import for code splitting
const module = await import('./module.js');</code></pre>
    <h2>Lazy Loading</h2>
    <p>Lazy loading resources can significantly improve initial page load times by deferring the loading of non-critical resources.</p>
    <h2>Debouncing and Throttling</h2>
    <p>These techniques limit the rate at which a function gets called, particularly useful for events like scroll or resize.</p>
    <pre><code>// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}</code></pre>
    <p>Implementing these optimization techniques will result in faster, more responsive web applications that provide a better user experience.</p>`,
    category: "JavaScript",
    author: "Michael Rodriguez",
    date: "2024-01-05",
    tags: ["JavaScript", "performance", "optimization"],
    readingTime: 6,
    coverImage: "https://picsum.photos/seed/jsperf/800/400.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Introduction to React Server Components",
    excerpt: "Explore the new paradigm of React Server Components and how they're changing the way we build React applications.",
    content: `<h1>Introduction to React Server Components</h1>
    <p>React Server Components (RSC) represent a significant shift in how we think about React applications. Let's dive into this new paradigm.</p>
    <h2>What are Server Components?</h2>
    <p>Server Components are a new type of React component that run exclusively on the server, providing a more efficient way to render content.</p>
    <h2>Benefits of Server Components</h2>
    <ul>
      <li>Zero JavaScript on the client</li>
      <li>Direct access to backend resources</li>
      <li>Improved performance</li>
      <li>Smaller bundle sizes</li>
    </ul>
    <h2>Client vs Server Components</h2>
    <p>Understanding when to use client components versus server components is key to leveraging this new architecture effectively.</p>
    <pre><code>// Server Component
async function BlogPost({id}) {
  const post = await fetchPost(id);
  return <h1>{post.title}</h1>;
}

// Client Component
'use client';
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}</code></pre>
    <p>Server Components are reshaping the React ecosystem, offering new possibilities for building more efficient and scalable applications.</p>`,
    category: "React",
    author: "Emily Watson",
    date: "2023-12-28",
    tags: ["React", "Server Components", "web development"],
    readingTime: 8,
    coverImage: "https://picsum.photos/seed/reactserver/800/400.jpg",
    featured: true
  },
  {
    id: 5,
    title: "Accessibility Best Practices for Modern Web Apps",
    excerpt: "Learn how to build web applications that are accessible to all users, regardless of their abilities.",
    content: `<h1>Accessibility Best Practices for Modern Web Apps</h1>
    <p>Web accessibility ensures that websites and web applications are usable by everyone, including people with disabilities. Let's explore best practices for creating accessible web experiences.</p>
    <h2>Semantic HTML</h2>
    <p>Using semantic HTML elements provides meaning and structure to web content, making it more accessible to assistive technologies.</p>
    <pre><code>&lt;nav aria-label="Main navigation"&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/about"&gt;About&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
    <h2>ARIA Attributes</h2>
    <p>Accessible Rich Internet Applications (ARIA) attributes provide additional information about elements to assistive technologies.</p>
    <h2>Keyboard Navigation</h2>
    <p>Ensuring that all interactive elements are keyboard-accessible is crucial for users who cannot use a mouse.</p>
    <h2>Color Contrast</h2>
    <p>Maintaining sufficient color contrast between text and background ensures readability for users with visual impairments.</p>
    <blockquote>
      <p>"Accessibility is not a feature, it's a social trend."</p>
    </blockquote>
    <p>By implementing these accessibility best practices, we can create web experiences that are inclusive and usable by everyone.</p>`,
    category: "Accessibility",
    author: "David Kim",
    date: "2023-12-20",
    tags: ["accessibility", "a11y", "web development", "UX"],
    readingTime: 6,
    coverImage: "https://picsum.photos/seed/a11y/800/400.jpg",
    featured: false
  },
  {
    id: 6,
    title: "State Management in Modern React Applications",
    excerpt: "Explore different approaches to state management in React, from local state to global state solutions.",
    content: `<h1>State Management in Modern React Applications</h1>
    <p>Effective state management is crucial for building robust React applications. Let's explore the various approaches and tools available.</p>
    <h2>Local Component State</h2>
    <p>The simplest form of state management in React is using the useState hook for local component state.</p>
    <pre><code>import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
    <h2>Context API</h2>
    <p>React's Context API allows you to share state between components without prop drilling.</p>
    <h2>State Management Libraries</h2>
    <p>For more complex applications, libraries like Redux, Zustand, or Jotai provide powerful solutions for global state management.</p>
    <h2>Server State</h2>
    <p>Managing server state requires different considerations, with libraries like React Query or SWR providing elegant solutions.</p>
    <blockquote>
      <p>"Choose the right tool for the job. Not every application needs a complex state management solution."</p>
    </blockquote>
    <p>Understanding these different approaches to state management will help you build more maintainable and scalable React applications.</p>`,
    category: "React",
    author: "Jessica Liu",
    date: "2023-12-15",
    tags: ["React", "state management", "JavaScript"],
    readingTime: 7,
    coverImage: "https://picsum.photos/seed/reactstate/800/400.jpg",
    featured: false
  }
];

export const getPostById = (id) => {
  return posts.find(post => post.id === parseInt(id));
};

export const getPostsByCategory = (category) => {
  return posts.filter(post => post.category === category);
};

export const getFeaturedPosts = () => {
  return posts.filter(post => post.featured);
};

export const getLatestPosts = (limit = 3) => {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
};

export const searchPosts = (query) => {
  const lowerQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    post.category.toLowerCase().includes(lowerQuery)
  );
};