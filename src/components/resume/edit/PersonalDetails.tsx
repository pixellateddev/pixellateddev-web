import { Button, Col, Form, Input, Row } from 'antd';
import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';

const PersonalDetails: FC<StyledProp> = ( { className }) => {
    return (
        <div className={className}>
            <h3>Personal Details</h3>

            <Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{span: 7}} layout='horizontal' className='form'>
                <Form.Item label='Full Name' name='fullName' rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                <Form.Item label='Current Role' name='currentRole' rules={[{ required: true }]}>
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
                        <Form.Item label='Github' name='githubUrl' labelCol={{span: 8}} wrapperCol={{span: 14}}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='LinkedIn' name='linkedinUrl' labelCol={{span: 8}} wrapperCol={{span: 14}}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Form.Item style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Row>
            </Form>

            <div className='action-buttons'>
                <Button type='primary'>Continue</Button>
            </div>
        </div>
    )
}

export default styled(PersonalDetails)`
    display: grid;
    height: 100%;
    align-content: flex-start;
    grid-template-rows: auto 1fr auto;
    .form {
        padding-left: 1em;
    }

    .action-buttons {
        justify-self: end;
    }
    
`