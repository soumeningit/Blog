export const categories = [
    {
        id: 1,
        name: "Technology",
        description: "Latest trends and innovations in technology",
        color: "bg-blue-500",
        icon: "Cpu"
    },
    {
        id: 2,
        name: "Design",
        description: "UI/UX design principles and best practices",
        color: "bg-purple-500",
        icon: "Palette"
    },
    {
        id: 3,
        name: "JavaScript",
        description: "JavaScript tips, tricks, and advanced techniques",
        color: "bg-yellow-500",
        icon: "Code"
    },
    {
        id: 4,
        name: "React",
        description: "React ecosystem and best practices",
        color: "bg-cyan-500",
        icon: "Atom"
    },
    {
        id: 5,
        name: "Accessibility",
        description: "Making the web accessible to everyone",
        color: "bg-green-500",
        icon: "UniversalAccess"
    }
];

export const getCategoryById = (id) => {
    return categories.find(category => category.id === parseInt(id));
};

export const getCategoryByName = (name) => {
    return categories.find(category => category.name === name);
};