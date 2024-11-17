// src/components/ui/Card.js

import React from 'react';
import PropTypes from 'prop-types';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardTitle } from './CardTitle';

export function Card({ children, className, ...props }) {
  return (
    <div className={`bg-white shadow-md rounded p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Title = CardTitle;
