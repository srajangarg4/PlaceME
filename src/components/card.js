import React from 'react';

const Card = ({
  children,
  className,
  verticalCentered,
  style,
  horizontalCenter,
}) => {
  const containerStyle = `card shadow-lg bg-white my-4 rounded d-flex
  ${className ?? ''}
  ${horizontalCenter ? 'justify-content-center' : ''}
  ${verticalCentered ? 'align-items-center' : ''}
  `;
  return (
    <div className={containerStyle} style={style}>
      {children}
    </div>
  );
};

export default Card;
