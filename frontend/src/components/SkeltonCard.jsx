import React from "react";

const SkeletonCard = () => {
  return (
    <div className="card">
      <div className="skeleton aspect-video rounded-xl mb-4"></div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-5/6"></div>
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-4 w-1/3"></div>
          <div className="skeleton h-6 w-20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
