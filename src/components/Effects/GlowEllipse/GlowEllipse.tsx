import styles from './GlowEllipse.module.scss';

interface GlowEllipseProps {
  variant?: 'hero' | 'secondary' | 'accent';
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  size?: 'small' | 'medium' | 'large';
  className?: string;
  zIndex?: number;
}

export default function GlowEllipse({
  variant = 'hero',
  position,
  size = 'large',
  className = '',
  zIndex = 5,
}: GlowEllipseProps) {
  const variantClass = styles[`glow${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
  const sizeClass = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`];
  
  const style: React.CSSProperties = {
    zIndex,
    ...(position && {
      top: position.top,
      left: position.left,
      right: position.right,
      bottom: position.bottom,
    }),
  };

  return (
    <div 
      className={`${styles.glowEllipse} ${variantClass} ${sizeClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}