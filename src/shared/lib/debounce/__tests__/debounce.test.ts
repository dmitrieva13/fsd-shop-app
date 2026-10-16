import { debounce } from "../debounce";
import { jest } from '@jest/globals';

describe('testing /shared/lib/debounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });


    test('should call function only once when called during delay', () => {
        const callbackFn = jest.fn();
        const debouncedFn = debounce(callbackFn, 300);

        debouncedFn();
        debouncedFn();
        debouncedFn();
        debouncedFn();
        jest.advanceTimersByTime(299);
        expect(callbackFn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(1);
        expect(callbackFn).toHaveBeenCalledTimes(1);
    });

    test('should call function twice when called with big delay', () => {
        const callbackFn = jest.fn();
        const debouncedFn = debounce(callbackFn, 300);

        debouncedFn();
        jest.advanceTimersByTime(350);
        debouncedFn();
        debouncedFn();
        jest.advanceTimersByTime(300);
        expect(callbackFn).toHaveBeenCalledTimes(2);
    });

    test('should call function with correct arguments', () => {
        const callbackFn = jest.fn();
        const debouncedFn = debounce(callbackFn, 300);

        debouncedFn(1, 2, 'abc');
        jest.advanceTimersByTime(300);
        expect(callbackFn).toHaveBeenCalledWith(1, 2, 'abc');
    });
})