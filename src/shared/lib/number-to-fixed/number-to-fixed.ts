export function numberToFixed(num: number, digits: number): string {
    if (Number.isNaN(num) || !Number.isFinite(num)) {
        return '0';
    }
    if (num.toString().includes('.')) {
        return (num + Number.EPSILON).toFixed(digits);
    }
    return num.toString();
}