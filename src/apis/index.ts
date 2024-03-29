import http from '../services/http';

interface ErrorResponse {
  error: string;
}

const handleErrors = (err: any /* path: string, payload: any */): ErrorResponse => {
  const errorMessageKey = err.response?.data;
  return { error: errorMessageKey };
};

const getRequest = async (path: string, payload?: any): Promise<any> => {
  try {
    const res = await http.get(path, payload);
    return res;
  } catch (err) {
    return handleErrors(err);
  }
};

const postRequest = async (path: string, payload: any): Promise<any> => {
  try {
    const res = await http.post(path, payload);
    return res;
  } catch (err) {
    return handleErrors(err);
  }
};

const putRequest = async (path: string, payload: any): Promise<any> => {
  try {
    const res = await http.put(path, payload);
    return res;
  } catch (err) {
    return handleErrors(err);
  }
};

const patchRequest = async (path: string, payload: any): Promise<any> => {
  try {
    return await http.patch(path, payload);
  } catch (err) {
    return handleErrors(err);
  }
};

const deleteRequest = async (path: string): Promise<any> => {
  try {
    return await http.delete(path);
  } catch (err) {
    return handleErrors(err);
  }
};

export const auth = {
  login: (payload: any) => postRequest('/auth/login', payload)
}

export const product = {
  getAllProducts: () => getRequest('/products'),
};


