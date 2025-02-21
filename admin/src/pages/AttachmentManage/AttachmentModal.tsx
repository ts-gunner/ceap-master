import React from 'react'
import { ModalForm } from '@ant-design/pro-components';
import AttachmentComponent from './AttachmentComponent';
type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
}

export default function AttachmentModal({ modalOpen, handleModalOpen, onSubmit }: ModalProps) {
  return (
        <ModalForm
        title='附件管理'
        width="80%"
        open={modalOpen}
        onOpenChange={handleModalOpen}
        onFinish={onSubmit}
        
    >
        <AttachmentComponent />

    </ModalForm>
  )
}
