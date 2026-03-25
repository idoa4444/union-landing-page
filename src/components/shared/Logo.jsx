import React from 'react';
import logoFull from '../../assets/union-logo.png';
import logoIcon from '../../assets/logo-icon.svg';

/**
 * UNION Logo component.
 * @param {'full'|'icon'|'wordmark'} variant
 *   - "full" = UNION + tagline (the complete logo image)
 *   - "wordmark" = just the UNION text, tagline cropped out
 *   - "icon" = just the purple U mark (SVG)
 * @param {string} className - additional classes
 * @param {number} height - height in pixels (width auto-scales)
 */
export default function Logo({ variant = 'wordmark', className = '', height = 32, onClick }) {
  if (variant === 'icon') {
    return (
      <img
        src={logoIcon}
        alt="UNION"
        style={{ height: `${height}px`, width: 'auto' }}
        className={`select-none ${className}`}
        onClick={onClick}
        draggable={false}
      />
    );
  }

  if (variant === 'full') {
    return (
      <img
        src={logoFull}
        alt="UNION — קונים ביחד, משלמים פחות"
        style={{ height: `${height}px`, width: 'auto' }}
        className={`select-none ${className}`}
        onClick={onClick}
        draggable={false}
      />
    );
  }

  // "wordmark" — show only the UNION text, crop the tagline via overflow hidden
  // The tagline takes roughly the bottom 30% of the image
  return (
    <div
      style={{ height: `${height}px`, overflow: 'hidden' }}
      className={`select-none ${className}`}
      onClick={onClick}
    >
      <img
        src={logoFull}
        alt="UNION"
        style={{ height: `${height * 1.45}px`, width: 'auto' }}
        draggable={false}
      />
    </div>
  );
}
