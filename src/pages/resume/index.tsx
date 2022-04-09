import { Button, Form, Input } from 'antd';
import { FC } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';
import { CREATE_RESUME, RESUMES } from '../../graphql/resume';

const Resume: FC<StyledProp> = ({ className }) => {
    const {loading, data, error} = useQuery(RESUMES)
    const [ createResume ] = useMutation(CREATE_RESUME)
    console.log({ loading, data, error })

    const onFinish = (values: any) => {
        console.log(values)
        createResume({variables: values})
    }

    const onFinishFailed = (values: any) => {
        console.log(values)
    }

    return (
        <div className={className}>
            <h3>Create a new resume</h3>
            <div className='create-resume-form'>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name='title' rules={[{required: true}]}>
                        <Input placeholder='Choose a cool name'/>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Create Resume
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <h6>Or</h6>
            <h3>Use an existing one</h3>
            <div className='existing-resume-list'>
                {data?.resumes.map((resume: any) => (
                    <div key={resume.id} className='resume-item'>{resume.title}</div>
                ))}
            </div>
            
        </div>
    )
}

export default styled(Resume)`
    background-color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    max-width: 700px;
    margin: 0 auto;
    padding: 1em;

    .create-resume-form {
        width: 50%;
        margin: 0 auto;
        padding: 2em;
        text-align: center;
    }

    .existing-resume-list {
        display: grid;
        gap: 1em;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

        .resume-item {
            height: 200px;
            background-image: linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%);
            color: darkblue;
            padding: 1em;
        }
    }
`