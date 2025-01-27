declare namespace API {
  type AdminLoginRequest = {
    username: string;
    password: string;
  };

  type BaseResponseObject = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type BaseResponseString = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type BaseResponseSystemAdminVo = {
    code?: number;
    msg?: string;
    data?: SystemAdminVo;
  };

  type SystemAdminVo = {
    id?: number;
    account?: string;
    realName?: string;
    roles?: string;
    roleNames?: string;
    lastIp?: string;
    loginCount?: number;
    level?: number;
    status?: boolean;
    token?: string;
    phone?: string;
    isSms?: boolean;
    permissionsList?: string[];
  };
}
