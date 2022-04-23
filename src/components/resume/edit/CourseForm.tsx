import { DatePicker, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { FC } from 'react';

import { Course } from '../../../types/resume';
import { parseCourse, reverseParseCourse } from '../../../utils/resume';

interface CourseFormProps {
    course?: Course
    onSubmit: (course: Course) => void
    onDelete?: () => void
    open: boolean
    onClose?: () => void
}

const CourseForm: FC<CourseFormProps> = ({course, onSubmit, open, onClose}) => {
    const [form] = Form.useForm()

    const onOk = () => {
        form.submit()
    }

    const handleSubmit = async (values: any) => {
        await onSubmit(reverseParseCourse(values))
    }

    const title = course ? 'Edit Course Details' : 'Add New Course Details'
    return (
        <Modal title={title} visible={open} onCancel={onClose} onOk={onOk}>
            <Form 
                form={form}
                labelAlign='left'
                labelCol={{ span: 8 }} 
                labelWrap
                wrapperCol={{span: 10}} 
                initialValues={course && parseCourse(course)}
                requiredMark
                layout='horizontal' 
                onFinish={handleSubmit}
                className='form'
            >
                <Form.Item name='id' hidden>
                    <Input />
                </Form.Item>
                <Form.Item label='Course Name' name='courseName' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                <Form.Item label='Institute Name' name='instituteName' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                <Form.Item label='Start Year - End Year' name='tenure' rules={[{ required: true, message: 'Start Year is required' }]}>
                    <DatePicker.RangePicker picker='year' allowEmpty={[false, true]} />
                </Form.Item>
                <Form.Item label='Location' name='location'>
                    <Input />
                </Form.Item>
                <Form.Item label='Score' name='score' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CourseForm