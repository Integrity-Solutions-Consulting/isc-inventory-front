import type React from 'react';
import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <div className="flex w-full flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {children && <div className="">{children}</div>}
    </div>
  );
};

export default Header;
