export const numbersOnlyRegex = /^\d+$/;

export const truncate = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num) + '...';
  }
};
