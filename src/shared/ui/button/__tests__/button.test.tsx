import { render, screen } from '@testing-library/react';
import { Button } from '../button'

describe('testing /shared/ui/button', () => {

    test('should have correct name', () => {
        render(<Button>Кнопка</Button>);
        const button = screen.getByRole('button', { name: "Кнопка" });
        expect(button).toBeInTheDocument();
    });

    test('should have correct className', () => {
        render(<Button className='testClassName'>Кнопка</Button>);
        const button = screen.getByRole('button', { name: "Кнопка" });
        expect(button).toHaveClass('testClassName');
        expect(button).toHaveClass('sharedBtn');
    });

    test('should get correct props', () => {
        render(<Button disabled={true}>Кнопка</Button>);
        const button = screen.getByRole('button', { name: "Кнопка" });
        expect(button).toBeDisabled();
    });
})