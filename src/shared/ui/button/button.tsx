import { ReactNode, ButtonHTMLAttributes } from 'react';
import './button.css';

export function Button({ className='', children, ...props }: {className?: string, children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`sharedBtn ${className}`} {...props}>
      {children}
    </button>
  );
}