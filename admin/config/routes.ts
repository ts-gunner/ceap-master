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
    path: '/orderManage',
    name: '订单管理',
    icon: "ProductOutlined",
    component: './OrderManage'
  },
  {
    path: '/users',
    name: '用户',
    icon: "user",
    routes: [
      { path: "/users/manage", name: "用户管理", component: "./UsersManage" },
      { path: "/users/tagManage", name: "用户标签", component: "./UsersManage" },
      { path: "/users/levelManage", name: "用户等级", component: "./UsersManage" },
      { path: "/users/groupManage", name: "用户分组", component: "./UsersManage" },
    ]
  },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     { path: '/admin', redirect: '/admin/sub-page' },
  //     { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
  //   ],
  // },
  {
    name: '设置',
    icon: 'setting',
    path: '/setting',
    routes: [
      { path: "/setting/system", name: '系统设置', component: "./SystemSetting" },
      { path: "/setting/permission", name: '权限管理', component: "./PermissionManage" },
    ]
  },
  { path: '/', redirect: '/dashboard' },
  { path: '*', layout: false, component: './404' },
];
