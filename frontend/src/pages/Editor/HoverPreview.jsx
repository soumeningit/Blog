import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const HoverPreview = ({ url, mousePosition }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    const isImageUrl = (url) => {
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    };

    if (isImageUrl(url)) {
      setImageSrc(url);
      setShowPreview(true);
    } else {
      setImageSrc(null);
      setShowPreview(false);
    }
  }, [url]);

  useEffect(() => {
    if (!showPreview) return;

    const updatePosition = () => {
      if (previewRef.current) {
        const previewRect = previewRef.current.getBoundingClientRect();

        let x = mousePosition.x + 10;
        let y = mousePosition.y + 10;

        // Check if preview goes beyond the viewport
        if (x + previewRect.width > window.innerWidth) {
          x = mousePosition.x - previewRect.width - 10;
        }

        if (y + previewRect.height > window.innerHeight) {
          y = mousePosition.y - previewRect.height - 10;
        }

        setPosition({ x, y });
      }
    };

    updatePosition();
  }, [imageSrc, showPreview, mousePosition]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleClose = () => {
    setShowPreview(false);
  };

  if (!showPreview || !imageSrc) {
    return null;
  }

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{ left: position.x, top: position.y }}
    >
      <div
        ref={previewRef}
        className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm pointer-events-auto"
      >
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          <img
            src={imageSrc}
            alt="Preview"
            className="max-w-full max-h-64 object-contain"
            onLoad={handleImageLoad}
          />
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-2 text-xs text-gray-500 truncate">{url}</div>
      </div>
    </div>
  );
};

export default HoverPreview;
