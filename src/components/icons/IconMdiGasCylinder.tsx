import * as React from 'react';

// By: mdi
// See: https://v0.app/icon/mdi/gas-cylinder
// Example: <IconMdiGasCylinder width="24px" height="24px" style={{color: "#000000"}} />

export const IconMdiGasCylinder = ({
  height = '1em',
  fill = 'currentColor',
  focusable = 'false',
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'>) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}>
    <path
      fill={fill}
      d="M16 9v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9c0-1.86 1.27-3.43 3-3.87V4H9V2h6v2h-2v1.13c1.73.44 3 2.01 3 3.87"
    />
  </svg>
);
