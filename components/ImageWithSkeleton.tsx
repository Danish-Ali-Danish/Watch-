import React, { useState, useEffect } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  wrapperClassName?: string;
  imgClassName?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt, wrapperClassName, imgClassName }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Reset loading state when src changes
        setIsLoading(true);
    }, [src]);

    return (
        <div className={`${wrapperClassName || ''} bg-gray-200 dark:bg-gray-700 relative overflow-hidden`}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            )}
            <img
                src={src}
                alt={alt}
                className={`${imgClassName || ''} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)} // Stop loading on error to prevent infinite skeleton
            />
        </div>
    );
};

export default ImageWithSkeleton;
