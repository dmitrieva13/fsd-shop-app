import { render, screen } from '@testing-library/react';
import { ProgressBar} from '../progress-bar';

describe('testing /shared/ui/progress-bar', () => {

    test('should have correct value and max', () => {
        render(<ProgressBar  value={10} max={50} />);
        const progressBar = screen.getByRole('progressbar', { name: /progress-bar/i });
        expect(progressBar).toHaveAttribute('value', '10');
        expect(progressBar).toHaveAttribute('max', '50');
    });

    test('should have correct data-complete', () => {
        render(<ProgressBar  value={100} max={50} />);
        const progressBar = screen.getByRole('progressbar', { name: /progress-bar/i });
        expect(progressBar).toHaveAttribute('data-completed', 'true');
    });

    test('should have correct --progress attribute when not completed', () => {
        render(<ProgressBar  value={10} max={100} />);
        const progressBar = screen.getByRole('progressbar', { name: /progress-bar/i });
        expect(progressBar).toHaveStyle({'--progress': '10'});
    });

    test('should have correct --progress attribute when completed', () => {
        render(<ProgressBar  value={100} max={100} />);
        const progressBar = screen.getByRole('progressbar', { name: /progress-bar/i });
        expect(progressBar).toHaveStyle({'--progress': '100'});
    });

    test('should have correct --progress attribute when over completed', () => {
        render(<ProgressBar  value={500} max={100} />);
        const progressBar = screen.getByRole('progressbar', { name: /progress-bar/i });
        expect(progressBar).toHaveStyle({'--progress': '100'});
    });
})