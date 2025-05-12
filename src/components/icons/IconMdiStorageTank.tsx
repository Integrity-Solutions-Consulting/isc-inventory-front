import * as React from 'react';

// By: mdi
// See: https://v0.app/icon/mdi/storage-tank
// Example: <IconMdiStorageTank width="24px" height="24px" style={{color: "#000000"}} />

export const IconMdiStorageTank = ({
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
      d="M17 6h-1V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1H7c-3.31 0-6 2.69-6 6s2.69 6 6 6v3h2v-3h6v3h2v-3c3.31 0 6-2.69 6-6s-2.69-6-6-6m-7-1h4v1h-4z"
    />
  </svg>
);
