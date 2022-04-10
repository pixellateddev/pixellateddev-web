import { Button, Empty } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import {
    ADD_NEW_JOB, DELETE_JOB, GET_RESUME, GET_RESUME_DATA, UPDATE_JOB
} from '../../../graphql/resume';
import { Job } from '../../../types/resume';
import { WizardActions, WizardBody } from '../../ui/Wizard';
import WizardView from '../../ui/Wizard/WizardView';
import JobDetails from './JobDetails';
import JobForm from './JobForm';

const WorkExperience: FC = () => {
    const { query: {resumeId} } = useRouter()
    const { data } = useQuery<GET_RESUME_DATA>(GET_RESUME, { variables: { resumeId }})

    const [ editing, setEditing ] = useState(false)
    const [ selectedJob, setSelectedJob ] = useState<Job | undefined>()

    const [addNewJob] = useMutation(ADD_NEW_JOB)
    const [deleteJob] = useMutation(DELETE_JOB)
    const [updateJob] = useMutation(UPDATE_JOB)

    const handleSubmit = async (job: any) => {
        delete job.id
        if (selectedJob) {
            await updateJob({variables: { resumeId, jobId: selectedJob.id, job}})
        } else {
            await addNewJob({variables: {resumeId, newJob: job}})
        }
        closeModal()
    }
    

    const onDeleteJob = (jobId: string) => {
        deleteJob({ variables: {
            resumeId,
            jobId
        }})
    }

    const openModal = (job?: Job) => {
        setEditing(true)
        setSelectedJob(job)
    }

    const closeModal = () => {
        setEditing(false)
        setSelectedJob(undefined)
    }

    const { resume } = data!
    console.log(resume)
    return (
        <WizardView title='Work Experience'>
            <WizardBody>
                {resume.workExperience && resume.workExperience.map(job => (
                    <JobDetails key={job.id} job={job} onEdit={() => openModal(job)} onDelete={() => onDeleteJob(job.id)}/>
                ))}

                {!resume.workExperience?.length && (
                    <Empty description='Nothing to show here' image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                )}

                {editing && <JobForm open onSubmit={handleSubmit} job={selectedJob} onClose={closeModal}/>}
            </WizardBody>
            
            <WizardActions>
                <Button onClick={() => openModal()} >Add New Job</Button>
            </WizardActions>
        </WizardView>
    )
}

export default WorkExperience