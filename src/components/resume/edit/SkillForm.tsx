import { Form, Input, InputNumber, Modal } from 'antd';
import { FC } from 'react';

import { Skill } from '../../../types/resume';

interface SkillFormProps {
    skill?: Skill
    onSubmit: (skill: Skill) => void
    open: boolean
    onClose?: () => void
}

const SkillForm: FC<SkillFormProps> = ({skill, onSubmit, open, onClose}) => {
    const [ form ] = Form.useForm()

    const onOk = () => {
        form.submit()
    }

    const handleSubmit = async (values: any) => {
        await onSubmit(values)
    }

    const title = skill ? 'Edit Skill' : 'Add New Skill'

    return (
        <Modal title={title} visible={open} onCancel={onClose} onOk={onOk}>
            <Form 
                form={form}
                labelAlign='left'
                labelCol={{ span: 8 }} 
                labelWrap
                wrapperCol={{span: 10}} 
                initialValues={skill}
                requiredMark
                layout='horizontal' 
                onFinish={handleSubmit}
                className='form'
            >
                <Form.Item name='id' hidden>
                    <Input />
                </Form.Item>
                <Form.Item label='Skill' name='skill' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                <Form.Item label='Proficiency' name='proficiency' rules={[{ required: true, type: 'number', max:10, min: -1, message: 'Invalid Value' }]} >
                    <InputNumber />
                </Form.Item>
                <Form.Item label='Description' name='description' wrapperCol={{ span: 15}}>
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default SkillForm
