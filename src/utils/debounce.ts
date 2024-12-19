export const debounce = (callback: Function, delay: number = 2000) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
