import React from 'react';

export default function Icon({ className, name, size, fill }) {
  if (!Array.isArray(size)) size = [size, size];
  return (
    <svg
      className={className}
      width={size[0]}
      height={size[1]}
      viewBox={`0 0 ${size[0]} ${size[1]}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use xlinkHref={`./spritemap.svg#sprite-${name}`} />
    </svg>
  );
}

Icon.defaultProps = {
  size: [48, 48],
  fill: 'none'
};

Icon.propTypes = {
  name: function(props, propName, componentName) {
    if (typeof props.name !== 'string') {
      return new Error(
        `'${propName}' supplied to <${componentName}> must be string ('${typeof props.name}' supplied).`
      );
    }

    if (props.name.indexOf('.') !== -1) {
      return new Error(
        `'${propName}' supplied to <${componentName}> must content only file name, without extention. ('${
          props.name
        }' supplied).`
      );
    }
  }
};
