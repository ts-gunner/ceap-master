import React, { useState, useEffect } from 'react'
import { ModalForm, ProFormText, ProForm } from '@ant-design/pro-components';
import { Tree, Typography, message } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { getPermissions } from '@/services/ceap/systemPermissionController';
import { addRolePerms } from '@/services/ceap/systemRoleController';
type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    values: any
}

function switchPermissionToTree(perms: Array<API.SystemPermission>) {
    const parentPerms = perms.filter(item => item.pid === null).map(item => {
        return { title: item.name, key: item.id || 0, children: [] }
    })
    perms.filter(item => item.pid !== null).map((item) => {
        const obj: any = parentPerms.find(it => it.key === item.pid);
        obj?.children.push({ title: item.name, key: item.id || 0 })
    })
    return parentPerms
}

export default function RoleAccessPermsModal({ modalOpen, handleModalOpen, values }: ModalProps) {
    // 强制刷新Modal，更新初始化值
    const [key, setKey] = useState(0)
    const [permissions, setPermissions] = useState<Array<API.SystemPermission>>([])
    useEffect(() => {
        setKey(key + 1)
        getPerms()
    }, [values])
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    const getPerms = async () => {
        const resp = await getPermissions({
            roleId: values.id || 0
        })
        if (resp.code === 200) {
            const ps = resp.data || []
            setPermissions(ps)

            const expandKeys: any = ps.filter(item => item.pid === null).map(item => item.id)
            setExpandedKeys(expandKeys)

            const checkedKeys: any = ps.map(item => item.id)
            setCheckedKeys(checkedKeys)
        } 
    }
    const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue as React.Key[]);
    };

    const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
        setSelectedKeys(selectedKeysValue);
    };


    const onSubmit = async (params: any) => {
      
        const resp = await addRolePerms({
            roleId: values.id,
            permissionId: checkedKeys.join(",")
        })
        if (resp.code === 200) {
            message.success("添加成功！！")
        }
        // handleModalOpen(false)
        getPerms()
    }

    return (
        <ModalForm
            title='角色授权'
            width="70%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={onSubmit}
            initialValues={{
                roleName: values.roleName
            }}

        >

            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "6rem"
            }}>
                <div>
                    <ProFormText
                        width="sm"
                        name="roleName"
                        label="角色名称"
                        tooltip=""
                        placeholder="请输入角色名称"
                        disabled
                    ></ProFormText>


                </div>
                <div>
                    <Typography.Text>权限列表</Typography.Text>
                    <div style={{
                        border: "solid 0.0125rem black",
                        borderRadius: "1rem",
                        padding: "1rem 1rem"
                    }}>
                        <Tree
                            checkable
                            onExpand={onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onCheck={onCheck}
                            checkedKeys={checkedKeys}
                            onSelect={onSelect}
                            selectedKeys={selectedKeys}
                            treeData={switchPermissionToTree(values.permissions)}
                        />
                    </div>

                </div>

            </div>


        </ModalForm>
    )
}
