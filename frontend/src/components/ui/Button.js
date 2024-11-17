// src/components/ui/Button.js

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Button({ children, variant, size, asChild, component: Component = 'button', ...props }) {
  const classes = classNames(
    'px-4 py-2 rounded transition-colors duration-200',
    {
      'bg-primary text-white hover:bg-blue-700': variant === 'solid',
      'border border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
      'text-sm': size === 'sm',
      'text-lg': size === 'lg',
    }
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: classNames(children.props.className, classes),
      ...props,
    });
  }

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['solid', 'outline']),
  size: PropTypes.oneOf(['sm', 'lg']),
  asChild: PropTypes.bool,
  component: PropTypes.elementType,
};

Button.defaultProps = {
  variant: 'solid',
  size: 'sm',
  asChild: false,
  component: 'button',
};
