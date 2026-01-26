import type React from 'react';

type PageHeroProps = {
    title: string;
    description?: string;
    className?: string;
};

export default function PageHero({ title, description, className = '' }: PageHeroProps) {
    return (
        <div className={`pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {title}
            </h1>
            {description && (
                <p className="text-xl text-gray-300 max-w-3xl">
                    {description}
                </p>
            )}
        </div>
    );
}
