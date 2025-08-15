import React from "react";

const PlayIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon points="5,3 19,12 5,21" />
        </svg>
    );
};

export default PlayIcon;
