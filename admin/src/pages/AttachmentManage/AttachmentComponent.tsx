import React from 'react'
import { PageContainer } from '@ant-design/pro-components'
import AttachmentGroup from './AttachmentGroup'
import AttachmentTable from './AttachmentTable'
export default function AttachmentComponent() {
    return (
        <div style={{
            display: 'flex',
            gap: 8,
            padding: 10
        }}>
            <PageContainer
                style={{
                    flex: 3,
                    borderRadius: "1rem",
                    padding: 8,
                    backgroundColor: "white",
                    border: "0.05rem solid #888888",
                    boxShadow: "0px 7px 30px 0px rgba(100, 100, 111, 0.2)"
                }}
                header={{
                    title: '',
                    breadcrumb: {}
                }}

            >
                <AttachmentGroup />
            </PageContainer>
            <PageContainer
                style={{
                    flex: 9,
                    borderRadius: "1rem",
                    border: "0.05rem solid #888888",
                    padding: 8,
                    backgroundColor: "white",
                    boxShadow: "0px 7px 30px 0px rgba(100, 100, 111, 0.2)"
                }}
                header={{
                    title: '',
                    breadcrumb: {}
                }}

            >
                <AttachmentTable />
            </PageContainer>
        </div>

    )
}

