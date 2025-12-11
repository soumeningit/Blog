export const aiSummaries = {
    1: "This article explores the future of web development in 2024, focusing on three key trends: AI-powered development tools that assist developers in writing code more efficiently, edge computing which brings computation closer to users for better performance, and WebAssembly (WASM) that enables near-native performance in browsers. The author emphasizes that these technologies are creating more powerful and user-friendly web experiences.",
    2: "This article covers modern CSS techniques for building responsive layouts. It introduces container queries that allow components to adapt based on their container size rather than viewport, explains the differences between CSS Grid (for 2D layouts) and Flexbox (for 1D layouts), and highlights modern CSS units like rem, em, vw, vh, and clamp() that provide more flexibility in responsive design. The article demonstrates how these techniques work together to create layouts that adapt seamlessly to any screen size.",
    3: "This article focuses on JavaScript performance optimization techniques. It covers code splitting to reduce initial bundle sizes, lazy loading of non-critical resources, and debouncing/throttling techniques to limit function call rates for events like scroll or resize. The author provides code examples for each technique and explains how implementing these optimizations results in faster, more responsive web applications.",
    4: "This article introduces React Server Components (RSC), a new paradigm where components run exclusively on the server. It explains the benefits of RSC including zero JavaScript on the client, direct access to backend resources, improved performance, and smaller bundle sizes. The article contrasts server components with client components, providing code examples of each, and discusses how RSC is reshaping the React ecosystem.",
    5: "This article covers accessibility best practices for modern web applications. It emphasizes using semantic HTML elements for structure, implementing ARIA attributes for additional information to assistive technologies, ensuring keyboard navigation for all interactive elements, and maintaining proper color contrast for readability. The article stresses that accessibility is essential for creating inclusive web experiences usable by everyone.",
    6: "This article explores different approaches to state management in React applications. It covers local component state using the useState hook, the Context API for sharing state without prop drilling, state management libraries like Redux, Zustand, or Jotai for global state, and server state management with libraries like React Query or SWR. The article advises choosing the right approach based on application complexity rather than defaulting to complex solutions."
};

export const blogIdeas = [
    "The Rise of Micro-Frontends: Architecture and Best Practices",
    "Building Progressive Web Apps with Modern JavaScript Frameworks",
    "Web3 and Decentralized Applications: A Developer's Guide",
    "Optimizing Core Web Vitals for Better User Experience",
    "The Future of CSS: Container Queries, Cascade Layers, and More",
    "TypeScript vs. JavaScript: When and Why to Use TypeScript",
    "Building Real-time Applications with WebSockets and WebRTC",
    "The Art of Code Review: Best Practices for Development Teams",
    "WebAssembly Beyond the Browser: Server-Side Applications",
    "Design Systems: Creating Consistent and Scalable UI Components",
    "The JAMstack Architecture: Modern Web Development Without Servers",
    "GraphQL vs. REST: Choosing the Right API Approach",
    "Building Secure Web Applications: Common Vulnerabilities and How to Avoid Them",
    "The Future of Mobile Web Development: PWAs vs. Native Apps",
    "Machine Learning in the Browser: TensorFlow.js and Beyond"
];

export const getAISummary = (postId) => {
    return aiSummaries[postId] || "AI summary not available for this post.";
};

export const getRandomBlogIdeas = (count = 5) => {
    const shuffled = [...blogIdeas].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};