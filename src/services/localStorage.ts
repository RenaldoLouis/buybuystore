const serviceGenerator = (lsKey: string) => ({
  get: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(lsKey);
    }
    return null; // Or handle the case where localStorage is not available
  },
  set: (value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(lsKey, value);
    }
  },
  delete: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(lsKey);
    }
  },
});

export const localStorageAuthToken = serviceGenerator("buybuystore");
