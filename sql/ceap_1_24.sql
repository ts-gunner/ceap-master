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
        '$2a$10$RCqmR46Q2.w5ebxSXlyKOubSUIvyOZFaiof0.0TRBrD5gDFs58RZO',
        '超级管理员',
        '1',
        '127.0.0.1'
    );

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

INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (1, null, '退出登录', 'admin:logout');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (2, null, '获取用户详情', 'admin:info');
INSERT INTO `cp_system_permission`(`id`, `pid`, `name`, `code`) VALUES (3, null, '管理员访问', 'admin:login:menus');

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
-- 后台管理平台的角色权限映射表
-- --------------------------------
DROP TABLE IF EXISTS `cp_system_role_permisson`;

create table if not exists `cp_system_role_permisson` (
    `rid` int(11) NOT NULL COMMENT '角色id',
    `pid` int(11) NOT NULL COMMENT '权限id',
    `is_delete` tinyint default 0 not null comment '是否删除',
    PRIMARY KEY (`rid`, `pid`) USING BTREE
) ENGINE = InnoDB default charset = utf8mb4 comment '角色权限映射表';

INSERT INTO `cp_system_role_permisson`(`rid`, `pid`) VALUES (1, 1);
INSERT INTO `cp_system_role_permisson`(`rid`, `pid`) VALUES (1, 2);
INSERT INTO `cp_system_role_permisson`(`rid`, `pid`) VALUES (1, 3);
INSERT INTO `cp_system_role_permisson`(`rid`, `pid`) VALUES (2, 1);
INSERT INTO `cp_system_role_permisson`(`rid`, `pid`) VALUES (2, 2);
INSERT INTO `cp_system_role_permisson`(`rid`, `pid`) VALUES (2, 3);
SET FOREIGN_KEY_CHECKS = 1;