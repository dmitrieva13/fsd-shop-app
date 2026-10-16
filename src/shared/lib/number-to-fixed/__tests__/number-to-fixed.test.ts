import { numberToFixed } from '../number-to-fixed';

describe('testing /shared/lib/number-to-fixed', () => {
    test('should return string', () => {
        const res = numberToFixed(10, 2);
        expect(typeof res).toBe('string');
    });

    test('should return string without dot if number is Integer', () => {
        const res = numberToFixed(10, 2);
        expect(res).toBe('10');
    });

    test('should return string with correct number of digits after decimal point', () => {
        const res = numberToFixed(10.74632, 3);
        expect(res).toBe('10.746');
    });

    test('should add zeros after decimal point if needed', () => {
        const res = numberToFixed(10.7, 3);
        expect(res).toBe('10.700');
    });

    test('should round correctly', () => {
        const res = numberToFixed(15.7452, 2);
        expect(res).toBe('15.75');
    });

    test('should work with negative numbers correctly', () => {
        const res = numberToFixed(-10.333, 3);
        expect(res).toBe('-10.333');
    });

    test('should return 0 if number is incorrect', () => {
        const res = numberToFixed(NaN, 2);
        expect(res).toBe('0');
    });
})