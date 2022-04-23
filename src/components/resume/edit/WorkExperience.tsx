import { Button, Descriptions, Empty } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import {
    ADD_NEW_JOB, DELETE_JOB, GET_RESUME, GET_RESUME_DATA, UPDATE_JOB
} from '../../../graphql/resume';
import { Job } from '../../../types/resume';
import { WizardActions, WizardBody } from '../../ui/Wizard';
import WizardView from '../../ui/Wizard/WizardView';
import Details from './Details';
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
    return (
        <WizardView title='Work Experience'>
            <WizardBody>
                {resume.workExperience && resume.workExperience.map((job: Job) => (
                    <Details key={job.id} onEdit={() => openModal(job)} onDelete={() => onDeleteJob(job.id)}>
                        <Descriptions.Item label="Job Role">{job.role}</Descriptions.Item>
                        <Descriptions.Item label="Organization Name">{job.orgName}</Descriptions.Item>
                        <Descriptions.Item label="Tenure">{job.startDate} - {job.currentlyWorking ? 'Present' : job.endDate}</Descriptions.Item>
                        <Descriptions.Item label="Description">
                        {job.description}
                        </Descriptions.Item>
                    </Details>
                ))}

                {!resume.workExperience?.length && (
                    <Empty description='Nothing to show here' />
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