import { render, screen } from '@testing-library/react';
import { Input} from '../input';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';


describe('testing /shared/ui/input', () => {

    test('should have correct value on render', () => {
        render(<Input value={'10'} />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('10');

        const clearBtn = screen.getByLabelText('input-clear');
        expect(clearBtn).toBeInTheDocument();
    });

    test('should call handleChange on user input', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        await user.type(input, 'Сыр');
        expect(handleChange).toHaveBeenCalledTimes(3);
    });

    test('should call handleChange with correct arguments', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        await user.type(input, 'Сыр');
        expect(handleChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: 'Сыр'
                })
            })
        );
    });

    test('should call handleClear on user click on clear', async () => {
        const user = userEvent.setup();
        const handleClear = jest.fn();
        render(<Input onClear={handleClear} />);
        const clearBtn = screen.getByLabelText('input-clear');
        await user.click(clearBtn);
        expect(handleClear).toHaveBeenCalledTimes(1);
    });
})