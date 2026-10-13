import { ReactNode, ProgressHTMLAttributes } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import './progress-bar.css';

export function ProgressBar({ value, max, ...props }: {value: number} & {max: number} & ProgressHTMLAttributes<HTMLProgressElement>) {
    function getProgressPercent() {
        const percent = (value/max) * 100;
        return percent <= 100 ? percent : 100;
    }

    return (
        <div className="progressBlock">
            <progress className='sharedProgress' value={value} max={max} {...props} 
                data-completed={value >= max}
                style={{'--progress': getProgressPercent()} as React.CSSProperties} />
        </div>
    );
}