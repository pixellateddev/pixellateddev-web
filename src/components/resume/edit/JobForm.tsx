import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import { FC } from 'react';

import { Job } from '../../../types/resume';
import { parseJob, reverseParseJob } from '../../../utils/resume';
import JobDetails from './JobDetails';

interface JobFormProps {
    job?: Job
    editing?: boolean,
    onSubmit: (job: Job) => void
    onEdit?: () => void
    onDelete?: () => void
    open: boolean
    onClose?: () => void
}

const JobForm: FC<JobFormProps> = ({job, editing, onSubmit, onDelete, onEdit, open, onClose}) => {
    const [form] = Form.useForm()

    const onOk = () => {
        form.submit()
    }

    const handleSubmit = async (values: any) => {
        await onSubmit(reverseParseJob(values))
    }

    const title = job ? 'Edit Job Details' : 'Add New Job Details'
    return (
        <Modal title={title} visible={open} onCancel={onClose} onOk={onOk}>
            <Form 
                form={form}
                labelAlign='left'
                labelCol={{ span: 8 }} 
                labelWrap
                wrapperCol={{span: 10}} 
                initialValues={job && parseJob(job)}
                requiredMark
                layout='horizontal' 
                onFinish={handleSubmit}
                className='form'
            >
                <Form.Item name='id' hidden>
                    <Input />
                </Form.Item>
                <Form.Item label='Organization Name' name='orgName' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                <Form.Item label='Job Role' name='role' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                <Form.Item label='Start Date - End Date' name='tenure' rules={[{ required: true, message: 'Start Date is required' }]}>
                    <DatePicker.RangePicker picker='month' allowEmpty={[false, true]} />
                </Form.Item>
                <Form.Item label='Job Description' name='description' wrapperCol={{ span: 15}}>
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )

    if (!editing) {
        return <JobDetails job={job!} onDelete={onDelete!} onEdit={onEdit!}/>
    }


    return (
        <div>
            <Form 
                labelAlign='left'
                labelCol={{ span: 6 }} 
                labelWrap
                wrapperCol={{span: 7}} 
                initialValues={job && parseJob(job)}
                requiredMark={false}
                layout='horizontal' 
                onFinish={handleSubmit}
                className='form'
            >
                <Form.Item name='id' hidden>
                    <Input />
                </Form.Item>
                <Form.Item label='Organization Name' name='orgName' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                <Form.Item label='Job Role' name='role' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                <Form.Item label='Start Date - End Date' name='tenure' rules={[{ required: true, message: 'Start Date is required' }]}>
                    <DatePicker.RangePicker picker='month' allowEmpty={[false, true]} />
                </Form.Item>
                <Form.Item label='Job Description' name='description' wrapperCol={{ span: 15}}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default JobForm