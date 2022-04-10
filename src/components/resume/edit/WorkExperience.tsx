import { Button } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import {
    ADD_NEW_JOB, DELETE_JOB, GET_RESUME, GET_RESUME_DATA, UPDATE_JOB
} from '../../../graphql/resume';
import { Job } from '../../../types/resume';
import { WizardActions, WizardBody } from '../../ui/Wizard';
import WizardView from '../../ui/Wizard/WizardView';
import JobForm from './JobForm';

const WorkExperience: FC = () => {
    const { query: {resumeId} } = useRouter()
    const { data } = useQuery<GET_RESUME_DATA>(GET_RESUME, { variables: { resumeId }})
    const [editingId, setEditingId] = useState('none')

    const [addNewJob] = useMutation(ADD_NEW_JOB)
    const [deleteJob] = useMutation(DELETE_JOB)
    const [updateJob] = useMutation(UPDATE_JOB)
    const onAddNewJob = async (newJob: Job) => {
        await addNewJob({ variables: { resumeId, newJob }})
        setEditingId('none')
    }

    const onUpdateJob = (jobId: string) => async (job: any) => {
        delete job.id
        await updateJob({ variables: {resumeId, jobId, job}})
        setEditingId('none')
    }

    const onDeleteJob = (jobId: string) => {
        deleteJob({ variables: {
            resumeId,
            jobId
        }})
    }

    const { resume } = data!
    console.log(resume)
    return (
        <WizardView title='Work Experience'>
            <WizardBody>
                {resume.workExperience && resume.workExperience.map(job => (
                    <JobForm 
                        key={job.id} 
                        job={job} 
                        editing={editingId === job.id}
                        onSubmit={onUpdateJob(job.id)} 
                        onDelete={() => onDeleteJob(job.id)}
                        onEdit={() => setEditingId(job.id)}
                    />
                ))}
            </WizardBody>
            { editingId === 'new' &&
                <JobForm editing onSubmit={onAddNewJob}/> 
            }
            <WizardActions>
                <Button onClick={() => setEditingId('new')}>Add New Job</Button>
            </WizardActions>
        </WizardView>
    )
}

export default WorkExperience