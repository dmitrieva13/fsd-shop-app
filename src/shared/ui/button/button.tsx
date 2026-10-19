import { ReactNode, ButtonHTMLAttributes } from 'react';
import './button.css';

export function Button({ className='', children, ...props }: {className?: string, children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button lang='ru' className={`sharedBtn ${className}`} {...props}>
      <div className="sharedBtnChildren">
        {children}
      </div>
    </button>
  );
}