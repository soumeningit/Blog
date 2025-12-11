import { useState, useCallback } from 'react';

export const useImagePreview = () => {
    const [hoveredLink, setHoveredLink] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const isImageUrl = (url) => {
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    };

    const handleMouseMove = useCallback((e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });

        const target = e.target;
        if (target.tagName === 'A' && target.href) {
            if (isImageUrl(target.href)) {
                setHoveredLink(target.href);
            } else {
                setHoveredLink(null);
            }
        } else {
            setHoveredLink(null);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredLink(null);
    }, []);

    return { hoveredLink, mousePosition, handleMouseMove, handleMouseLeave };
};