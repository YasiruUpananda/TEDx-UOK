
import React from 'react';

interface EmptyStateProps {
    title: string;
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
    return (
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center border border-dashed border-[#1F1F1F] rounded-xl bg-[#0E0E0E] mx-4 my-8">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{message}</p>
        </div>
    );
};

export default EmptyState;
