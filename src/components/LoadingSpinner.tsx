import React from "react";

export const LoadingSpinner = ({ size = 40, color = "#0066cc" }) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin"
        viewBox="0 0 50 50"
        style={{
          width: size,
          height: size,
        }}
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          fill="none"
          strokeWidth="4"
        />
        <circle
          className="opacity-75"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          fill="none"
          strokeWidth="4"
          strokeDasharray="80"
          strokeDashoffset="60"
        />
      </svg>
    </div>
  );
};
