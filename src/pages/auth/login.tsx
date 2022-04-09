import { Button, Form, Input, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';

const Login: FC<StyledProp> = ({ className }) => {
    const {data: session} = useSession()
    const router = useRouter()

    const onFinish = (values: any) => {
        signIn('credentials', values)
    }

    if (session) {
        router.replace(router.query.redirect as any)
    }

    return (
        <div className={className}>
            <div className='form-container'>
                <Typography.Title >Login</Typography.Title>
                <Form 
                    name='login-form'
                    labelCol={{ span: 6}}
                    labelAlign='left'
                    autoComplete='off'
                    onFinish={onFinish}
                    className='form'
                >
                    <Form.Item 
                        label='Email'
                        name='email'
                        rules={[{
                            required: true
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label='Password'
                        name='password'
                        rules={[{
                            required: true
                        }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default styled(Login)`

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .form-container {
        background-color: white;
        padding: 1.5em;
        width: 35%;
        min-width: 400px;

        .ant-row {
            justify-content: center;
        }
    }

`