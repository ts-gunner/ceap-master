SET
    NAMES utf8mb4;

SET
    FOREIGN_KEY_CHECKS = 0;

-- --------------------------------
-- 后台管理平台的用户表
-- --------------------------------
DROP TABLE IF EXISTS `cp_system_admin`;

create table if not exists `cp_system_admin` (
    `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '后台管理员表ID',
    `account` varchar(32) NOT NULL COMMENT '后台管理员账号',
    `pwd` VARCHAR(100) NOT NULL COMMENT '后台管理员密码',
    `real_name` varchar(16) NOT NULL COMMENT '后台管理员姓名',
    `email` varchar(255) null comment '邮箱',
    `roles` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '后台角色ids,多个以逗号相隔',
    `last_ip` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '后台管理员最后一次登录ip',
    `level` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '后台管理员级别',
    `login_count` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '登录次数',
    `phone` varchar(15) null comment '手机号码',
    `status` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '后台管理员状态 1有效0无效',
    `is_sms` tinyint(1) UNSIGNED NULL DEFAULT 0 COMMENT '是否接收短信',
    `is_delete` tinyint default 0 not null comment '是否删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '后台管理员添加时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '后台管理员最后一次登录时间',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `account`(`account`) USING BTREE,
    INDEX `status`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 default charset = utf8mb4 comment '后台管理员表';

INSERT INTO
    `cp_system_admin`(
        `id`,
        `account`,
        `pwd`,
        `real_name`,
        `roles`,
        `last_ip`
    )
VALUES
    (
        1,
        'admin',
        '$2a$10$oCaSGSQA9F9TzsqSSQTJiu038QM6ikeBeJ4JGV8kgOsEXVWRicdNS',
        '超级管理员',
        '1',
        '127.0.0.1'
    );


-- --------------------------------
-- 后台管理平台的角色表
-- --------------------------------
DROP TABLE IF EXISTS `cp_system_role`;

create table if not exists `cp_system_role` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
    `role_name` VARCHAR(32) NOT NULL COMMENT '角色名称',
    `status` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态',
    `is_delete` tinyint default 0 not null comment '是否删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '后台管理员添加时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '后台管理员更新时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB default charset = utf8mb4 comment '后台角色表';

INSERT INTO `cp_system_role`(`id`, `role_name`) VALUES (1, '超级管理员');
INSERT INTO `cp_system_role`(`id`, `role_name`) VALUES (2, '演示员');



-- --------------------------------
-- 后台管理平台的权限表
-- --------------------------------
DROP TABLE IF EXISTS `cp_system_permission`;

create table if not exists `cp_system_permission` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '后台权限ID',
    `pid` int UNSIGNED NULL COMMENT '父级权限id',
    `name` VARCHAR(100) NOT NULL COMMENT '权限名称',
    `code` VARCHAR(100) NOT NULL COMMENT '权限代码',
    `is_delete` tinyint default 0 not null comment '是否删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB default charset = utf8mb4 comment '后台权限表';

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (1, null, '公共服务', 'admin:public');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (2, 1, '退出登录', 'admin:logout');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (3, 1, '获取用户详情', 'admin:info');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (4, 1, '管理员访问菜单', 'admin:login:menus');

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (5, null, '用户服务', 'admin:user_service');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (6, 5, '获取管理端用户列表', 'admin:admin:users');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (7, 5, '更新管理员信息', 'admin:admin:update');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (8, 5, '添加管理员账号', 'admin:admin:add');

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (9, null, '角色服务', 'admin:role_service');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (10, 9, '查询角色列表', 'admin:role:search');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (11, 9, '给角色添加权限', 'admin:role:addPerms');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (12, 9, '添加角色', 'admin:role:add');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (13, 9, '更新角色信息', 'admin:role:update');

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (14, null, '权限服务', 'admin:perm_service');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (15, 14, '查看权限相关内容', 'admin:perms:search');

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (16, null, '订单服务', 'admin:order_service');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (17, 16, '获取订单信息', 'admin:order:get');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (18, 16, '更新订单内容', 'admin:order:update');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (19, 16, '添加订单信息', 'admin:order:add');

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (20, null, '商品服务', 'admin:product_service');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (21, 20, '获取商品信息', 'admin:product:get');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (22, 20, '更新商品内容', 'admin:product:update');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (23, 20, '添加商品信息', 'admin:product:add');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (24, 20, '上架商品', 'admin:product:up');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (25, 20, '下架商品', 'admin:product:down');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (26, 20, '更新商品信息', 'admin:product:update');

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (27, null, '类别服务', 'admin:category_service');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (28, 27, '获取类别信息', 'admin:category:search');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (29, 27, '添加类别', 'admin:category:add');

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (30, null, '附件服务', 'admin:attachment_service');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (31, 30, '获取附件信息', 'admin:attachment:search');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (32, 30, '上传附件', 'admin:attachment:upload');


-- --------------------------------
-- 后台管理平台的角色权限映射表
-- --------------------------------
DROP TABLE IF EXISTS `cp_system_role_permission`;

create table if not exists `cp_system_role_permission` (
    `rid` int(11) NOT NULL COMMENT '角色id',
    `pid` int(11) NOT NULL COMMENT '权限id',
    PRIMARY KEY (`rid`, `pid`) USING BTREE
) ENGINE = InnoDB default charset = utf8mb4 comment '角色权限映射表';

INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 1);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 2);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 3);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 4);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 5);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 6);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 7);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 8);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 9);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 10);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 11);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 12);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 13);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 14);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 15);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 16);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 17);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 18);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 19);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 20);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 21);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 22);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 23);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 24);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 25);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 26);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 27);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 28);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 29);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 30);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 31);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (1, 32);
INSERT INTO `cp_system_role_permission`(`rid`, `pid`) VALUES (2, 2);


-- --------------------------------
-- 后台管理平台的订单表
-- --------------------------------
DROP TABLE IF EXISTS `cp_store_order`;

create table if not exists `cp_store_order` (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单ID',
    `order_id` VARCHAR(32) NOT NULL COMMENT '订单号',
    `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户id',
    `real_name` VARCHAR(32) NOT NULL COMMENT '用户姓名',
    `user_phone` VARCHAR(20) NOT NULL COMMENT '用户电话',
    `user_address` VARCHAR(255) NOT NULL COMMENT '用户地址',
    `freight_price` DECIMAL(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '运费',
    `total_num` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '订单商品总数',
    `total_price` DECIMAL(10, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '订单总价',
    `total_postage` DECIMAL(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '邮费',
    `pay_price` DECIMAL(10, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '实际支付金额',
    `pay_postage` DECIMAL(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '实际支付邮费',
    `deduction_price` DECIMAL(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '抵扣金额',
    `coupon_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '优惠券id',
    `coupon_price` DECIMAL(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '优惠券金额',
    `paid` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '支付状态， 0: 未支付 1： 已支付',
    `pay_time` DATETIME DEFAULT NULL COMMENT '支付时间',
    `pay_type` VARCHAR(32) NOT NULL COMMENT '支付方式',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '后台管理员添加时间',
    `status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '订单状态（0: 待发货；1：待收货； 2： 已收货，待评价；3：已完成）',
    `refund_status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '退款状态，0：未退款，1 申请中 2 已退款 3 退款中',
    `refund_reason_img_path` VARCHAR(255) COMMENT '退款图片地址',
    `refund_reason_explain` VARCHAR(255) COMMENT '退款用户说明',
    `refund_reason_wap` VARCHAR(255) COMMENT '退款原因',
    `refund_fail_reason` VARCHAR(255) COMMENT '退款失败的原因',
    `refund_price` DECIMAL(10, 2) DEFAULT 0.00 COMMENT '退款金额',
    `refund_reason_time` DATETIME COMMENT '申请退款时间',
    `delivery_name` VARCHAR(255) COMMENT '快递名称/送货人名称',
    `delivery_type` VARCHAR(255) COMMENT '发货类型',
    `delivery_id` VARCHAR(255) COMMENT '快递单号',
    `remark` VARCHAR(255) COMMENT '管理员备注',
    `is_delete` tinyint(1) UNSIGNED DEFAULT 0 COMMENT '逻辑删除',
    `mer_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商户ID',
    `is_system_del` tinyint(1) DEFAULT 0 COMMENT '是否后台删除',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `shipping_type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '配送方式： 1 快递， 2 门店自提',
    `order_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 普通订单',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `order_user_id`(`order_id`, `user_id`) USING BTREE,
    INDEX `user_id` (`user_id`) USING BTREE
) ENGINE = InnoDB default charset = utf8mb4 comment '订单表';


-- --------------------------------
-- 后台管理平台的订单与商品的信息表
-- --------------------------------
DROP TABLE IF EXISTS `cp_order_product_info`;
CREATE TABLE `cp_order_product_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` int(11) UNSIGNED NOT NULL COMMENT '订单id',
  `product_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商品ID',
  `info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '购买东西的详细信息',
  `order_num` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单号',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `product_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名称',
  `attr_value_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '规格属性值id',
  `image` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品图片',
  `sku` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品sku',
  `price` decimal(8, 2) UNSIGNED NOT NULL COMMENT '商品价格',
  `pay_num` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '购买数量',
  `weight` decimal(8, 2) UNSIGNED NOT NULL COMMENT '重量',
  `volume` decimal(8, 2) UNSIGNED NOT NULL COMMENT '体积',
  `is_reply` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否评价，0-未评价，1-已评价',
  `vip_price` decimal(8, 2) UNSIGNED NOT NULL COMMENT '会员价',
  `product_type` int(2) NOT NULL DEFAULT 0 COMMENT '商品类型:0-普通',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE
) ENGINE = InnoDB COMMENT = '订单与商品的信息表';


-- --------------------------------
-- 后台管理平台的订单操作记录表
-- --------------------------------
DROP TABLE IF EXISTS `cp_order_operation_record`;
CREATE TABLE `cp_order_operation_record`  (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `order_id` int(10) UNSIGNED NOT NULL COMMENT '订单id',
    `change_type` varchar(32) NOT NULL COMMENT '操作类型',
    `change_message` varchar(256) NOT NULL COMMENT '操作备注',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `order_id`(`order_id`) USING BTREE
) ENGINE = InnoDB COMMENT = '订单操作记录表';



-- --------------------------------
-- 后台管理平台的商品表
-- --------------------------------
DROP TABLE IF EXISTS `cp_store_product`;
CREATE TABLE `cp_store_product`  (
  `id` mediumint(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `mer_id` varchar(100) NOT NULL COMMENT '商户Id(0开头为总后台管理员创建,1开头是商户后台创建)',
  `image` varchar(1000)  NOT NULL COMMENT '商品图片',
  `slider_image` varchar(2000) NOT NULL COMMENT '轮播图',
  `store_name` varchar(128) NOT NULL COMMENT '商品名称',
  `description` varchar(256) NOT NULL COMMENT '商品简介',
  `keyword` varchar(256) NOT NULL COMMENT '关键字',
  `cate_id` varchar(64) NOT NULL DEFAULT '' COMMENT '分类id',
  `price` decimal(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '商品价格',
  `vip_price` decimal(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '会员价格',
  `ot_price` decimal(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '成本价',
  `postage` decimal(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '邮费',
  `unit_name` varchar(32) NOT NULL COMMENT '单位名',
  `sort` smallint(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `sales` mediumint(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '销量',
  `stock` mediumint(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '库存',
  `is_show` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态（0：未上架，1：上架）',
  `is_recycle` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否回收，（0: 未回收， 1： 已回收）',
  `is_hot` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否热卖',
  `is_benefit` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否优惠',
  `is_best` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否精品',
  `is_new` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否新品',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_postage` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否包邮',
  `is_delete` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否删除',
  `browse` int(11) NULL DEFAULT 0 COMMENT '浏览量',
  `temp_id` int(11) NOT NULL DEFAULT 1 COMMENT '运费模板ID',
  `spec_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '规格 0单 1多',
  `flat_pattern` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '展示图',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `cate_id`(`cate_id`) USING BTREE,
  INDEX `price`(`price`) USING BTREE,
  INDEX `sort`(`sort`) USING BTREE,
  INDEX `sales`(`sales`) USING BTREE
) ENGINE = InnoDB COMMENT = '商品表';


DROP TABLE IF EXISTS `cp_system_attachment`;
CREATE TABLE `cp_system_attachment`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `att_name` varchar(100) NOT NULL DEFAULT '' COMMENT '附件名称',
  `att_dir` varchar(1000) NOT NULL DEFAULT '' COMMENT '附件路径',
  `satt_dir` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '压缩图片路径',
  `att_size` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '附件大小',
  `att_type` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '附件类型',
  `user_id` int(11) NOT NULL DEFAULT 0 COMMENT '上传者ID',
  `uploader` varchar(100) NOT NULL DEFAULT '' COMMENT '上传者',
  `create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB  COMMENT = '附件管理表';


DROP TABLE IF EXISTS `cp_system_category`;
CREATE TABLE `cp_system_category`  (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pid` int(11) UNSIGNED NULL COMMENT '父级ID',
    `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
    `type` smallint(2) NULL DEFAULT 1 COMMENT '类型，1 产品分类，2 附件分类 3 设置分类',
    `create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB  COMMENT = '分类管理表';


DROP TABLE IF EXISTS `cp_attachment_category`;
CREATE TABLE `cp_attachment_category`  (
    `aid` int(11) NOT NULL COMMENT '附件ID',
    `cid` int(11) NOT NULL COMMENT '类型（标签）ID',
    PRIMARY KEY (`aid`, `cid`) USING BTREE
) ENGINE = InnoDB  COMMENT = '附件类型映射表';




SET FOREIGN_KEY_CHECKS = 1;