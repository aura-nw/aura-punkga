import store from 'storeConfig';
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenStatic
} from 'axios';
import { appSetting } from 'constants/configuration';
import { Dispatch } from 'redux';

const { dispatch } = store || {};

export interface ServiceSingletonInstance extends AxiosInstance {
  CancelToken?: CancelTokenStatic;
  isCancel?: (value: any) => boolean;
  setupAxiosInterceptors?: (interceptors?: InterceptorsInstance) => void;
}

export interface InterceptorsInstance {
  request: {
    success?: (
      value: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    failure?: (error: any) => any;
  };
  response: {
    success?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    failure?: (error: any) => any;
  };
}

class ServiceSingleton {
  public static instance: ServiceSingletonInstance;
  public static dispatch: Dispatch<any> = dispatch;
  private static interceptorsRequestNumber: number;
  private static interceptorsResponseNumber: number;

  /**
   * Singleton's constructor must be private
   */
  private constructor() {}

  public static getInstance(): ServiceSingletonInstance {
    if (ServiceSingleton.instance) return ServiceSingleton.instance;

    ServiceSingleton.instance = Axios.create({
      baseURL: appSetting.apiUrl
    });

    ServiceSingleton.instance.setupAxiosInterceptors =
      ServiceSingleton.setupAxiosInterceptors;

    // Setup interceptor by default
    ServiceSingleton.setupAxiosInterceptors();

    return ServiceSingleton.instance;
  }

  private static setupAxiosInterceptors(interceptors?: InterceptorsInstance) {
    if (interceptors) {
      // Eject request/response interceptors
      ServiceSingleton.instance.interceptors.request.eject(
        ServiceSingleton.interceptorsRequestNumber
      );
      ServiceSingleton.instance.interceptors.response.eject(
        ServiceSingleton.interceptorsResponseNumber
      );

      /**
       * Try to set the handler to empty array,
       * cuz the handler will be set null after eject
       */
      (ServiceSingleton.instance.interceptors.request as any).handlers = [];
      (ServiceSingleton.instance.interceptors.response as any).handlers = [];

      // Inject request/response interceptors
      ServiceSingleton.interceptorsRequestNumber =
        ServiceSingleton.instance.interceptors.request.use(
          interceptors.request.success,
          interceptors.request.failure
        );
      ServiceSingleton.interceptorsResponseNumber =
        ServiceSingleton.instance.interceptors.response.use(
          interceptors.response.success,
          interceptors.response.failure
        );

      return;
    }

    const handleRequestSuccess = (
      config: AxiosRequestConfig
    ): Promise<AxiosRequestConfig> => {
      config.timeout = Number(appSetting.requestTimeout);
      return Promise.resolve(config);
    };

    const handleRequestFailure = (error: AxiosError): Promise<Error> => {
      return Promise.reject(error.request);
    };

    ServiceSingleton.interceptorsRequestNumber =
      ServiceSingleton.instance.interceptors.request.use(
        handleRequestSuccess,
        handleRequestFailure
      );

    const handleResponseSuccess = (
      response: AxiosResponse
    ): Promise<AxiosResponse> => {
      return Promise.resolve(response);
    };

    const handleResponseFailure = (error: AxiosError): Promise<Error> => {
      return Promise.reject(error.response);
    };

    ServiceSingleton.interceptorsResponseNumber =
      ServiceSingleton.instance.interceptors.response.use(
        handleResponseSuccess,
        handleResponseFailure
      );
  }
}

export const apiService = ServiceSingleton.getInstance();
