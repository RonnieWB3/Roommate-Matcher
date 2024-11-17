// src/components/ui/CardHeader.js

import React from 'react';
import PropTypes from 'prop-types';

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardHeader.defaultProps = {
  className: '',
};
