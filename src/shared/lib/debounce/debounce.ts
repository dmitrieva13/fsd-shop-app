export function debounce(func: (...args: any[]) => void, delay: number) {
    let timerId: ReturnType<typeof setTimeout> | null;
    let context: any;

    function wrapper(this: any, ...args: any[]) {
        context = this;
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }

    return wrapper;
}