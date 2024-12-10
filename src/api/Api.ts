/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Classrooms {
  /** Classroom id */
  classroom_id?: number;
  /**
   * Name
   * @maxLength 100
   */
  name?: string | null;
  /**
   * Address
   * @maxLength 100
   */
  address?: string | null;
  /**
   * Url
   * @maxLength 100
   */
  url?: string | null;
  /**
   * Description
   * @maxLength 300
   */
  description?: string | null;
  /**
   * Photo
   * @maxLength 100
   */
  photo?: string | null;
  /**
   * Status
   * @maxLength 100
   */
  status?: string;
}

export interface Applications {
  /** App id */
  app_id?: number;
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string | null;
  /**
   * Submitted at
   * @format date-time
   */
  submitted_at?: string | null;
  /**
   * Completed at
   * @format date-time
   */
  completed_at?: string | null;
  /**
   * Event date
   * @format date-time
   */
  event_date?: string | null;
  /**
   * Event name
   * @maxLength 100
   */
  event_name?: string | null;
  /** Start event time */
  start_event_time?: string | null;
  /** Status */
  status?: 1 | 2 | 3 | 4 | 5 | null;
  /** Classrooms count */
  classrooms_count?: string;
}

export interface ApplicationClassrooms {
  /** Mm id */
  mm_id?: number;
  /** Finish time */
  finish_time?: string | null;
  /** Classroom */
  classroom?: number | null;
  /** App */
  app?: number | null;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface User {
  /** ID */
  id?: number;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  classrooms = {
    /**
     * No description
     *
     * @tags classrooms
     * @name ClassroomsCreateCreate
     * @request POST:/classrooms/create/
     * @secure
     */
    classroomsCreateCreate: (data: Classrooms, params: RequestParams = {}) =>
      this.request<Classrooms, any>({
        path: `/classrooms/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * Поиск аудиторий
     *
     * @tags classrooms
     * @name ClassroomsSearchList
     * @request GET:/classrooms/search/
     * @secure
     */
    classroomsSearchList: (query?: { name?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/classrooms/search/`,
        method: "GET",
        secure: true,
        query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags classrooms
     * @name ClassroomsRead
     * @request GET:/classrooms/{classroom_id}/
     * @secure
     */
    classroomsRead: (classroomId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/classrooms/${classroomId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags classrooms
     * @name ClassroomsAddToEventCreate
     * @request POST:/classrooms/{classroom_id}/add_to_event/
     * @secure
     */
    classroomsAddToEventCreate: (classroomId: string, data: Applications, params: RequestParams = {}) =>
      this.request<Applications, any>({
        path: `/classrooms/${classroomId}/add_to_event/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags classrooms
     * @name ClassroomsDeleteDelete
     * @request DELETE:/classrooms/{classroom_id}/delete/
     * @secure
     */
    classroomsDeleteDelete: (classroomId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/classrooms/${classroomId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags classrooms
     * @name ClassroomsUpdateUpdate
     * @request PUT:/classrooms/{classroom_id}/update/
     * @secure
     */
    classroomsUpdateUpdate: (classroomId: string, data: Classrooms, params: RequestParams = {}) =>
      this.request<Classrooms, any>({
        path: `/classrooms/${classroomId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags classrooms
     * @name ClassroomsUpdateImageCreate
     * @request POST:/classrooms/{classroom_id}/update_image/
     * @secure
     */
    classroomsUpdateImageCreate: (classroomId: string, data: Classrooms, params: RequestParams = {}) =>
      this.request<Classrooms, any>({
        path: `/classrooms/${classroomId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  events = {
    /**
     * No description
     *
     * @tags events
     * @name EventsSearchList
     * @request GET:/events/search/
     * @secure
     */
    eventsSearchList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/search/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsRead
     * @request GET:/events/{event_id}/
     * @secure
     */
    eventsRead: (eventId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsDeleteDelete
     * @request DELETE:/events/{event_id}/delete/
     * @secure
     */
    eventsDeleteDelete: (eventId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsDeleteClassroomDelete
     * @request DELETE:/events/{event_id}/delete_classroom/{classroom_id}/
     * @secure
     */
    eventsDeleteClassroomDelete: (eventId: string, classroomId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/delete_classroom/${classroomId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsUpdateUpdate
     * @request PUT:/events/{event_id}/update/
     * @secure
     */
    eventsUpdateUpdate: (eventId: string, data: Applications, params: RequestParams = {}) =>
      this.request<Applications, any>({
        path: `/events/${eventId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsUpdateClassroomUpdate
     * @request PUT:/events/{event_id}/update_classroom/{classroom_id}/
     * @secure
     */
    eventsUpdateClassroomUpdate: (
      eventId: string,
      classroomId: string,
      data: ApplicationClassrooms,
      params: RequestParams = {},
    ) =>
      this.request<ApplicationClassrooms, any>({
        path: `/events/${eventId}/update_classroom/${classroomId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsUpdateStatusAdminUpdate
     * @request PUT:/events/{event_id}/update_status_admin/
     * @secure
     */
    eventsUpdateStatusAdminUpdate: (eventId: string, data: Applications, params: RequestParams = {}) =>
      this.request<Applications, any>({
        path: `/events/${eventId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsUpdateStatusUserUpdate
     * @request PUT:/events/{event_id}/update_status_user/
     * @secure
     */
    eventsUpdateStatusUserUpdate: (eventId: string, data: Applications, params: RequestParams = {}) =>
      this.request<Applications, any>({
        path: `/events/${eventId}/update_status_user/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersMeList
     * @request GET:/users/me
     * @secure
     */
    usersMeList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/me`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/update/
     * @secure
     */
    usersUpdateUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
