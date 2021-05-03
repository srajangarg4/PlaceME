import React from 'react';

const Card = ({
  children,
  className,
  verticalCentered,
  style,
  horizontalCenter,
}) => {
  const containerStyle = `card shadow bg-white rounded d-flex
  ${className ?? ''}
  ${verticalCentered ? 'justify-content-center' : ''}
  ${horizontalCenter ? 'align-items-center' : ''}
  `;
  return (
    <div>
      <div className={containerStyle} style={style}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
