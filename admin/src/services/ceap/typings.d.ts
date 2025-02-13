declare namespace API {
  type addRoleParams = {
    roleName: string;
  };

  type AddSystemAdminRequest = {
    account: string;
    password: string;
    realName: string;
    roles?: string;
  };

  type AdminLoginRequest = {
    username: string;
    password: string;
  };

  type BaseResponseListSystemPermission = {
    code?: number;
    msg?: string;
    data?: SystemPermission[];
  };

  type BaseResponseListSystemRole = {
    code?: number;
    msg?: string;
    data?: SystemRole[];
  };

  type BaseResponseObject = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type BaseResponsePageStoreOrder = {
    code?: number;
    msg?: string;
    data?: PageStoreOrder;
  };

  type BaseResponsePageStoreProduct = {
    code?: number;
    msg?: string;
    data?: PageStoreProduct;
  };

  type BaseResponsePageSystemAdminPageVo = {
    code?: number;
    msg?: string;
    data?: PageSystemAdminPageVo;
  };

  type BaseResponsePageSystemPermission = {
    code?: number;
    msg?: string;
    data?: PageSystemPermission;
  };

  type BaseResponsePageSystemRole = {
    code?: number;
    msg?: string;
    data?: PageSystemRole;
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

  type getPermissionsParams = {
    roleId: number;
  };

  type getRoleListParams = {
    roleName: string;
    status: boolean;
  };

  type GetRolesPageRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    roleName?: string;
    status?: boolean;
  };

  type GetStoreOrderRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type GetStoreProductRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    productType?: number;
  };

  type GetSystemAdminListRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    account?: string;
    status?: boolean;
  };

  type GetSystemPermissionPageRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    permissionName?: string;
    permissionCode?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageStoreOrder = {
    records?: StoreOrder[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageStoreOrder;
    searchCount?: PageStoreOrder;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageStoreProduct = {
    records?: StoreProduct[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageStoreProduct;
    searchCount?: PageStoreProduct;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageSystemAdminPageVo = {
    records?: SystemAdminPageVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageSystemAdminPageVo;
    searchCount?: PageSystemAdminPageVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageSystemPermission = {
    records?: SystemPermission[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageSystemPermission;
    searchCount?: PageSystemPermission;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageSystemRole = {
    records?: SystemRole[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageSystemRole;
    searchCount?: PageSystemRole;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type ResetAdminPasswordRequest = {
    userId?: number;
    password?: string;
    rePassword?: string;
  };

  type RoleAddPermissionRequest = {
    roleId?: number;
    permissionId?: string;
  };

  type StoreOrder = {
    id?: number;
    orderId?: string;
    userId?: number;
    realName?: string;
    userPhone?: string;
    userAddress?: string;
    freightPrice?: number;
    totalNum?: number;
    totalPrice?: number;
    totalPostage?: number;
    payPrice?: number;
    payPostage?: number;
    deductionPrice?: number;
    couponId?: number;
    couponPrice?: number;
    paid?: boolean;
    payTime?: string;
    payType?: string;
    createTime?: string;
    status?: number;
    refundStatus?: number;
    refundReasonImgPath?: string;
    refundReasonExplain?: string;
    refundReasonWap?: string;
    refundFailReason?: string;
    refundPrice?: number;
    refundReasonTime?: string;
    deliveryName?: string;
    deliveryType?: string;
    deliveryId?: string;
    remark?: string;
    isDelete?: boolean;
    merId?: number;
    isSystemDel?: boolean;
    updateTime?: string;
    shippingType?: number;
    orderType?: number;
  };

  type StoreProduct = {
    id?: number;
    merId?: number;
    image?: string;
    sliderImage?: string;
    storeName?: string;
    description?: string;
    keyword?: string;
    cateId?: string;
    price?: number;
    vipPrice?: number;
    otPrice?: number;
    postage?: number;
    unitName?: string;
    sort?: number;
    sales?: number;
    stock?: number;
    isShow?: boolean;
    isHot?: boolean;
    isBenefit?: boolean;
    isBest?: boolean;
    isNew?: boolean;
    createTime?: string;
    updateTime?: string;
    isPostage?: boolean;
    isDelete?: boolean;
    browse?: number;
    tempId?: number;
    specType?: boolean;
    flatPattern?: string;
  };

  type SystemAdminPageVo = {
    id?: number;
    account?: string;
    realName?: string;
    lastIp?: string;
    roleNames?: string;
    roles?: string;
    loginCount?: number;
    status?: boolean;
    phone?: string;
    email?: string;
    isSms?: boolean;
    createTime?: string;
    updateTime?: string;
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

  type SystemPermission = {
    id?: number;
    pid?: number;
    name?: string;
    code?: string;
    isDelete?: boolean;
  };

  type SystemRole = {
    id?: number;
    roleName?: string;
    status?: boolean;
    isDelete?: boolean;
    createTime?: string;
    updateTime?: string;
  };

  type UpdateAdminInfoRequest = {
    userId?: number;
    realName?: string;
    email?: string;
    phone?: string;
    roles?: string;
    isSms?: boolean;
    status?: boolean;
  };

  type UpdateSystemRoleRequest = {
    roleId?: number;
    roleName?: string;
  };
}
