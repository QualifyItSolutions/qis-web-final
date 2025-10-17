import React, { useState } from 'react';
import { Atom, Cog, Shield, GraduationCap, FileCheck, Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackType?: 'pharmaceutical' | 'engineering' | 'compliance' | 'training' | 'regulatory' | 'default';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  style = {},
  fallbackType = 'default'
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getFallbackContent = () => {
    const baseClasses = `flex items-center justify-center text-white font-semibold relative overflow-hidden ${className}`;

    switch (fallbackType) {
      case 'pharmaceutical':
        return (
          <div
            className={baseClasses}
            style={{
              background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 30%, #60A5FA 70%, #93C5FD 100%)',
              ...style
            }}
          >
            {/* Pharmaceutical pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="pharmaPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3"/>
                    <circle cx="5" cy="5" r="1" fill="currentColor" opacity="0.2"/>
                    <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.2"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pharmaPattern)" />
              </svg>
            </div>
            <div className="text-center z-10">
              <Atom className="w-8 h-8 mx-auto mb-2" />
              <div className="text-xs font-medium">Pharmaceutical</div>
            </div>
          </div>
        );

      case 'engineering':
        return (
          <div
            className={baseClasses}
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #10B981 30%, #34D399 70%, #6EE7B7 100%)',
              ...style
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="engineeringPattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                    <rect x="7" y="7" width="1" height="1" fill="currentColor" opacity="0.4"/>
                    <rect x="3" y="3" width="1" height="1" fill="currentColor" opacity="0.3"/>
                    <rect x="11" y="11" width="1" height="1" fill="currentColor" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#engineeringPattern)" />
              </svg>
            </div>
            <div className="text-center z-10">
              <Cog className="w-8 h-8 mx-auto mb-2" />
              <div className="text-xs font-medium">Engineering</div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div
            className={baseClasses}
            style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 30%, #F87171 70%, #FCA5A5 100%)',
              ...style
            }}
          >
            <div className="text-center z-10">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <div className="text-xs font-medium">Compliance</div>
            </div>
          </div>
        );

      case 'training':
        return (
          <div
            className={baseClasses}
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 30%, #A78BFA 70%, #C4B5FD 100%)',
              ...style
            }}
          >
            <div className="text-center z-10">
              <GraduationCap className="w-8 h-8 mx-auto mb-2" />
              <div className="text-xs font-medium">Training</div>
            </div>
          </div>
        );

      case 'regulatory':
        return (
          <div
            className={baseClasses}
            style={{
              background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 30%, #FCD34D 70%, #FEF3C7 100%)',
              ...style
            }}
          >
            <div className="text-center z-10">
              <FileCheck className="w-8 h-8 mx-auto mb-2" />
              <div className="text-xs font-medium">Regulatory</div>
            </div>
          </div>
        );

      default:
        return (
          <div
            className={`bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white ${className}`}
            style={style}
          >
            <div className="text-center">
              <ImageIcon className="w-8 h-8 mx-auto mb-2" />
              <div className="text-xs font-medium">Image</div>
            </div>
          </div>
        );
    }
  };

  if (imageError) {
    return getFallbackContent();
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={handleImageError}
    />
  );
}
