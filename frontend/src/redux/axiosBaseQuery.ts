import { AppDispatch } from '@/redux/store';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface initialQueryArgs {
  baseUrl: string,
  prepareHeaders: () => Record<string, string | undefined>,
}

interface QueryArgs extends AxiosRequestConfig {
  onSuccess?: (dispatch: AppDispatch, data: unknown) => Promise<void>,
}

type AxiosBaseQueryType = BaseQueryFn<QueryArgs, unknown, unknown>;

const axiosBaseQuery = ({ prepareHeaders, baseUrl }: initialQueryArgs): AxiosBaseQueryType => async ({ onSuccess, url, ...args }, { dispatch }) => {
  try {
    const response = await axios({
      url: baseUrl + url,
      headers: prepareHeaders(),
      ...args,
    });

    if (onSuccess) {
      try {
        await onSuccess(dispatch, response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in onSuccess function');
        throw error;
      }
    }

    return { data: response.data };
  } catch (axiosError) {
    const error = axiosError as AxiosError;

    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message,
      },
    };
  }
};

export default axiosBaseQuery;
