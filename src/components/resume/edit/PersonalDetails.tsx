import { Button, Col, Form, Input, Row } from 'antd';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import { useWizard } from '../../../context/WizardContext';
import { EDIT_PERSONAL_DETAILS, GET_RESUME, GET_RESUME_DATA } from '../../../graphql/resume';
import { WizardActions, WizardBody } from '../../ui/Wizard';
import WizardView from '../../ui/Wizard/WizardView';

interface Props {
    selected: boolean
}

const PersonalDetails: FC<StyledProp<Props>> = ({ className, selected }) => {
    const [form] = Form.useForm()
    const { query: {resumeId} } = useRouter()
    const { data } = useQuery<GET_RESUME_DATA>(GET_RESUME, { variables: { resumeId }})

    const { next, previous, canPrevious} = useWizard()

    const [ editPersonalDetails ] = useMutation(EDIT_PERSONAL_DETAILS)

    const onSubmit = async (personalDetails: any) => {
        await editPersonalDetails({variables: {
            personalDetails,
            resumeId
        }})
        next()
    }
    return (
        <WizardView title='Personal Details' selected={selected}>
            <WizardBody>
                <Form 
                    labelAlign='left'
                    labelCol={{ span: 4 }} 
                    wrapperCol={{span: 7}} 
                    initialValues={data?.resume?.personalDetails}
                    layout='horizontal' 
                    form={form}
                    onFinish={onSubmit}
                    className='form'
                >
                    <Form.Item label='Full Name' name='fullName' rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label='Current Role' name='currentRole'>
                        <Input />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item label='Location' name='location' labelCol={{span: 8}} wrapperCol={{span: 14}} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Website' name='website' labelCol={{span: 8}} wrapperCol={{span: 14}}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label='Email' name='email' labelCol={{span: 8}} wrapperCol={{span: 14}} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Phone Number' name='phoneNumber' labelCol={{span: 8}} wrapperCol={{span: 14}} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label='Github' name='github' labelCol={{span: 8}} wrapperCol={{span: 14}}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='LinkedIn' name='linkedin' labelCol={{span: 8}} wrapperCol={{span: 14}}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </WizardBody>
            <WizardActions>
                {canPrevious && <Button onClick={previous}>Previous</Button>}
                <Button type='primary' onClick={() => form.submit()}>Save and Continue</Button>
            </WizardActions>
        </WizardView>
    )
}

export default styled(PersonalDetails)`
`