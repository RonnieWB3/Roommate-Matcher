// src/components/ui/CardTitle.js

import React from 'react';
import PropTypes from 'prop-types';

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
}

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.defaultProps = {
  className: '',
};
