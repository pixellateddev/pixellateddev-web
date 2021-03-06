import { Button, Empty, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';
import { DataLoader } from '../../components/ui';
import {
    CREATE_RESUME, DELETE_RESUME, GET_RESUMES, GET_RESUMES_DATA, RESUMES
} from '../../graphql/resume';

const Resume: FC<StyledProp> = ({ className }) => {
    const {loading, data, error} = useQuery(RESUMES)
    const [ createResume ] = useMutation(CREATE_RESUME)
    const [ deleteResume ] = useMutation(DELETE_RESUME)
    const { asPath, push } = useRouter()

    const onFinish = async (values: any) => {
        const {data} = await createResume({variables: values})
        push(`${asPath}/edit/${data.createResume.id}`)
    }

    const onDelete = (resumeId: string) => {
        deleteResume({ 
            variables: { resumeId },
            update: cache => {
                const data = cache.readQuery<GET_RESUMES_DATA>({query: RESUMES})!
                const resumes = data.resumes.filter(resume => resume.id !== resumeId)
                cache.writeQuery({query: RESUMES, data: { resumes }})
            }
        })
    }
    return (
        <div className={className}>
            <h3>Create a new resume</h3>
            <div className='create-resume-form'>
                <Form
                    onFinish={onFinish}
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
                                <Button type='link' onClick={() => onDelete(resume.id)}>
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                    {!data?.resumes.length && (
                        <Empty description='Nothing to show here' />
                    )}
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