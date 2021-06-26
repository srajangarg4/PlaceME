import React from 'react';
import { useState } from 'react';

const Card = ({
  children,
  className,
  verticalCentered,
  style,
  horizontalCenter,
  shadow,
  border,
}) => {
  const [shadowState, setShadow] = useState(shadow);
  const containerStyle = `card ${
    shadowState && 'shadow'
  } bg-white my-4 rounded d-flex
  ${className ?? ''}
  ${horizontalCenter ? 'justify-content-center' : ''}
  ${verticalCentered ? 'align-items-center' : ''}
  ${border ? 'border border-dark' : ''}
  `;
  return (
    <div
      className={containerStyle}
      style={style}
      onMouseEnter={() => setShadow(true)}
      onMouseLeave={() => setShadow(shadow)}
    >
      {children}
    </div>
  );
};

export default Card;
