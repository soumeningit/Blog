export const comments = [
    {
        id: 1,
        postId: 1,
        username: "WebDev123",
        date: "2024-01-16",
        text: "Great article! I'm excited about the future of AI in web development. It's already helping me write cleaner code."
    },
    {
        id: 2,
        postId: 1,
        username: "TechEnthusiast",
        date: "2024-01-16",
        text: "I've been using WebAssembly for a recent project, and the performance improvements are remarkable. Can't wait to see more adoption."
    },
    {
        id: 3,
        postId: 2,
        username: "DesignerPro",
        date: "2024-01-11",
        text: "Container queries have been a game-changer for my component-based designs. Thanks for explaining them so clearly!"
    },
    {
        id: 4,
        postId: 2,
        username: "CSSNinja",
        date: "2024-01-11",
        text: "I've been experimenting with the new clamp() function for responsive typography. It's amazing how much cleaner my code has become."
    },
    {
        id: 5,
        postId: 3,
        username: "PerfGuru",
        date: "2024-01-06",
        text: "Don't forget about the importance of tree-shaking in modern bundlers! It can significantly reduce your bundle size."
    },
    {
        id: 6,
        postId: 4,
        username: "ReactFan",
        date: "2023-12-29",
        text: "Server Components have completely changed how I approach React development. The performance gains are incredible!"
    },
    {
        id: 7,
        postId: 5,
        username: "A11yAdvocate",
        date: "2023-12-21",
        text: "Thank you for highlighting the importance of accessibility! I wish more developers would prioritize it from the beginning of projects."
    },
    {
        id: 8,
        postId: 6,
        username: "StateMaster",
        date: "2023-12-16",
        text: "I've been using Zustand lately and it's been a breath of fresh air compared to Redux. Less boilerplate and easier to understand!"
    }
];

export const getCommentsByPostId = (postId) => {
    return comments.filter(comment => comment.postId === parseInt(postId));
};