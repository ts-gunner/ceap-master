export default [
  {
    name: "登录",
    path: '/user/login',
    layout: false,
    component: './Login',
  },
  {
    path: '/dashboard',
    name: '数据看板',
    icon: "LineChartOutlined",
    component: './Dashboard',
  },
  {
    path: '/product',
    name: '商品',
    icon: "ShoppingOutlined",
    routes: [
      { path: "/product/manage", name: "商品管理", component: "./ProductManage" },
      { path: "/product/category", name: "商品分类", component: "./ProductCategoryManage" },
      { path: "/product/comment", name: "商品评论", component: "./ProductCommentManage" },
    ]
  },
  {
    path: '/orderManage',
    name: '订单管理',
    icon: "ProductOutlined",
    component: './OrderManage'
  },
  {
    path: '/attachment',
    name: '附件管理',
    icon: "file",
    component: './AttachmentManage'
  },
  {
    path: '/users',
    name: '用户',
    icon: "user",
    routes: [
      { path: "/users/manage", name: "用户管理", component: "./UsersManage" },
      { path: "/users/tagManage", name: "用户标签", component: "./UsersTagManage" },
      { path: "/users/levelManage", name: "用户等级", component: "./UsersLevelManage" },
      { path: "/users/groupManage", name: "用户分组", component: "./UsersGroupManage" },
    ]
  },

  {
    name: '设置',
    icon: 'setting',
    path: '/setting',
    routes: [
      { path: "/setting/system", name: '系统设置', component: "./SystemSetting" },
      {
        path: "/setting/permission", name: '权限管理', routes: [
          { path: "/setting/permission/role_perms", name: '角色权限', component: "./RolePermsManage" },
          { path: "/setting/permission/rules", name: '权限规则', component: "./PermissionRuleManage" },
        ]
      },

    ]
  },
  { path: '/', redirect: '/dashboard' },
  { path: '*', layout: false, component: './404' },
];
