import { ReactNode, InputHTMLAttributes } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import './input.css';

export function Input({ value, onClear, ...props }: 
    { onClear?: () => void; 
      } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="inputBlock">
        <input className='sharedInput' type='text' value={value} {...props} />
        <XCircleFill className='XCircleIcon' size={16} color='gray' onClick={onClear} />
    </div>
  );
}