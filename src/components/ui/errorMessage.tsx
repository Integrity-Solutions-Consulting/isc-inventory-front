import type React from 'react';
import type { ReactNode } from 'react';

interface HeaderProps {
  icon?: string;
  title?: string;
  message?: string;
  children?: ReactNode;
}

const ErrorMessage: React.FC<HeaderProps> = ({
  icon = 'AlertCircle',
  title = 'Ups, algo ha pasado',
  message = 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
  children,
}) => {
  const Icon = icon;
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
      <div className="flex flex-col items-center text-center">
        <div className="text-destructive mb-4 h-12 w-12">
          <Icon />
        </div>
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
      {children}
    </div>
  );
};

export default ErrorMessage;
