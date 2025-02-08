import React, { useRef, useState, useEffect } from 'react'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { ActionType } from '@ant-design/pro-components';
import { Button, message, Tag } from 'antd';
import { addAdminAccount, getAdmins, resetAdminPassword, updateAdminInfo } from '@/services/ceap/systemAdminController';
import { PlusOutlined } from '@ant-design/icons';
import AddAdminUserModal from './AddAdminUserModal';
import AdminResetPasswordModal from './AdminResetPasswordModal';
import UpdateAdminUserModal from './UpdateAdminUserModal';
import { encryptByMd5 } from '@/utils/encryptUtils';

export default function AdminUsers() {
  const actionRef = useRef<ActionType>();
  const [addUserModalOpen, handleAddUserModalOpen] = useState(false)
  const [updateUserModalOpen, handleUpdateUserModalOpen] = useState(false)
  const [resetPwdModalOpen, handleResetPwdModalOpen] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<API.SystemAdminPageVo>({})

  const columns: ProColumns<API.SystemAdminPageVo>[] = [

    {
      key: "id",
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      key: "account",
      title: '用户账号',
      dataIndex: 'account',
      align: "center",
    },
    {
      key: "realName",
      title: '用户昵称',
      dataIndex: 'realName',
      hideInSearch: true,
      align: "center",
    },
    {
      key: "lastIp",
      title: '上一次登录IP',
      dataIndex: 'lastIp',
      align: "center",
      hideInSearch: true,
    },
    {
      key: "loginCount",
      title: '登录次数',
      dataIndex: 'loginCount',
      hideInSearch: true,
      align: "center",
    },
    {
      key: "phone",
      title: '手机号码',
      dataIndex: 'phone',
      hideInSearch: true,
      align: "center",
    },
    {
      key: "email",
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
      align: "center",
    },
    {
      key: "isSms",
      title: '是否接收短信',
      dataIndex: 'isSms',
      hideInSearch: true,
      align: "center",
      render: (text) => {
        return text === true ? <Tag color='success'>是</Tag> : <Tag color='error'>否</Tag>
      }
    },
    {
      key: "roleNames",
      title: '角色',
      dataIndex: 'roleNames',
      hideInSearch: true,
      align: "center",
      render: (text) => {
        return <>
          {
            text?.toString().split(",").map(item => {
              return <Tag>{item}</Tag>
            })
          }
        </>
      }
    },
    {
      key: "status",
      title: '状态',
      dataIndex: 'status',
      width: 100,
      align: "center",
      valueEnum: {
        "true": {
          text: "正常",
          status: "Success"
        },
        "false": {
          text: "停用",
          status: "Error"
        },
      }
    },
    {
      key: "createTime",
      title: '创建时间',
      dataIndex: 'createTime',
      align: "center",
      hideInSearch: true,
    },
    {
      key: 'option',
      title: '操作',
      dataIndex: 'option',
      valueType: "option",
      align: "center",
      width: 150,
      fixed: "right",
      render: (_, record) => [
        (<a
          key="change-data"
          onClick={() => {
            setCurrentRecord(record)
            handleUpdateUserModalOpen(true)
          }}
        >
          修改
        </a>),
        (<a
          key="reset-password"
          onClick={() => {
            setCurrentRecord(record)
            handleResetPwdModalOpen(true)
          }}
        >
          重置密码
        </a>),
      ]
    }

  ]
  return (
    <div>

      <ProTable<API.SystemAdminPageVo, API.GetSystemAdminListRequest>
        headerTitle='管理员列表'
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAddUserModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={
          async (params) => {
            const response = await getAdmins({
              currentPage: params.current,
              pageSize: params.pageSize,
              account: params.account,
              status: params.status,
            })
            if (response.code !== 200) {
              message.error(response.msg)
            }
            return {
              data: response.data?.records,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: response.code === 200,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: response.data?.total,
            }
          }
        }
      />

      <AddAdminUserModal
        modalOpen={addUserModalOpen}
        handleModalOpen={handleAddUserModalOpen}
        onSubmit={async (values: any) => {
          const resp = await addAdminAccount({
            account: values.account,
            password: encryptByMd5(values.password),
            realName: values.realName,
            roles: values.roleId.join(",")
          })
          if (resp.code === 200) {
            message.success("添加成功！")
          } else {
            message.error(resp.msg)
          }
          handleAddUserModalOpen(false)
          actionRef.current?.reload()
        }}

      />

      <AdminResetPasswordModal
        modalOpen={resetPwdModalOpen}
        handleModalOpen={handleResetPwdModalOpen}
        onSubmit={async (values: any) => {
          if (values.password !== values.rePassword) {
            message.error("两次密码不一致，请重新输入")
            return;
          }

          const resp = await resetAdminPassword({
            userId: currentRecord?.id,
            password: encryptByMd5(values.password),
            rePassword: encryptByMd5(values.rePassword)
          })
          if (resp.code === 200) {
            message.success("修改成功！！")
            handleResetPwdModalOpen(false)
          } else {
            message.error(resp.msg)
          }
        }}

      />
      <UpdateAdminUserModal
        modalOpen={updateUserModalOpen}
        handleModalOpen={handleUpdateUserModalOpen}
        values={currentRecord}
        onSubmit={async (values: any) => {

          const resp = await updateAdminInfo({
            userId: currentRecord.id,
            realName: values.realName,
            email: values.email,
            phone: values.phone,
            roles: values.roleId.join(","),
            isSms: values.isSms,
            status: values.status
          })
          if (resp.code === 200) {
            message.success("修改成功！！")
            actionRef.current?.reload()
            handleUpdateUserModalOpen(false)
          } else {
            message.error(resp.msg)
          }


        }}

      />
    </div>
  )
}
