import request from 'axios';
import { toast } from 'react-toastify';
import { ErrorType } from '../types/error-types';
import { HTTPCode } from '../const';


export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTPCode.BadRequest:
        toast.info(response.data.error);
        break;
      case HTTPCode.NotFound:
        toast.info(response.data.error);
        break;
    }
  }
};
