
import React from 'react';

interface PageHeroProps {
    title: string;
    description?: string;
    image?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, description, image }) => {
    return (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    {title}
                </h1>
                {description && (
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
            {image && (
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src={image} alt={title} className="w-full h-full object-cover grayscale" />
                </div>
            )}
            <div className="absolute bottom-0 left-0 w-full h-px bg-[#1F1F1F]" />
        </section>
    );
};

export default PageHero;
