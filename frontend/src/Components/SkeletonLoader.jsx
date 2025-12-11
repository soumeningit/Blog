// src/components/SkeletonLoader.jsx
import React from "react";

const SkeletonLoader = ({ horizontal = false }) => {
  if (horizontal) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex gap-6">
          <div className="skeleton w-48 h-32 rounded-xl"></div>
          <div className="flex-1 space-y-3">
            <div className="skeleton h-4 w-1/3 rounded"></div>
            <div className="skeleton h-6 w-3/4 rounded"></div>
            <div className="skeleton h-4 w-1/2 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="skeleton h-48 w-full"></div>
      <div className="p-6 space-y-3">
        <div className="skeleton h-4 w-1/3 rounded"></div>
        <div className="skeleton h-6 w-full rounded"></div>
        <div className="skeleton h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
