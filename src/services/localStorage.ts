const serviceGenerator = (lsKey: string) => ({
  get: () => localStorage.getItem(lsKey),
  set: (value: string) => {
    localStorage.setItem(lsKey, value);
  },
  delete: () => localStorage.removeItem(lsKey),
});

export const localStorageAuthToken = serviceGenerator("buybuystore");

export const localStorageSiteLang = serviceGenerator("buybuystore");
