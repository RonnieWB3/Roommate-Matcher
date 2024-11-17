// src/components/ui/CardContent.js

import React from 'react';
import PropTypes from 'prop-types';

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`text-gray-600 ${className}`} {...props}>
      {children}
    </div>
  );
}

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.defaultProps = {
  className: '',
};
