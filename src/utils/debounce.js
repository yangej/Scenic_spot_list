export const debounce = (callback, delay = 250) => {
    let timer;

    return function () {
        let context = this;

        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(context, [...arguments]);
        }, delay);
    }
};