import type { AxiosResponse } from "axios";

export type ErrorResponse<T = null> = {
  success: false;
  data: T;
  message: string;
  errorCode: string;
};
export type BaseResponse<T> =
  | {
      success: true;
      data: T;
      timestamp: Date;
    }
  | ErrorResponse<T>;
export type ApiResponse<T> = AxiosResponse<BaseResponse<T>>;
export type Enumable<T = Record<string, unknown>> = {
  id: string;
  label: string;
} & T;
