import { Button, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';
import { DataLoader } from '../../components/ui';
import { CREATE_RESUME, RESUMES } from '../../graphql/resume';

const Resume: FC<StyledProp> = ({ className }) => {
    const {loading, data, error} = useQuery(RESUMES)
    const [ createResume ] = useMutation(CREATE_RESUME)
    const { asPath } = useRouter()
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
            <div className='existing-resume-container'>
                <DataLoader data={data} loading={loading} error={error}>
                    <div className='existing-resume-list'>
                        {data?.resumes.map((resume: any) => (
                            <div key={resume.id} className='resume-item'>
                                <h4>{resume.title}</h4>
                                <Link href={`${asPath}/edit/${resume.id}`}>
                                    <Button type='link'>
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </DataLoader>
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
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
        padding: 2em 0;
        text-align: center;
    }

    .existing-resume-container {
        height: 100%;
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