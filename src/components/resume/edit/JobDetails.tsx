import { Button, Descriptions, Popconfirm } from 'antd';
import { FC } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import { Job } from '../../../types/resume';

interface JobDetailsProps {
    job: Job
    onDelete: () => void
    onEdit: () => void
}


export const JobDetails: FC<StyledProp<JobDetailsProps>> = ({ job, onDelete, onEdit, className }) => {
    return (
        <div className={className}>
            <Descriptions layout='horizontal' column={1} size='small' labelStyle={{fontWeight: 'bold'}} className='info'>
                <Descriptions.Item label="Job Role">{job.role}</Descriptions.Item>
                <Descriptions.Item label="Organization Name">{job.orgName}</Descriptions.Item>
                <Descriptions.Item label="Tenure">{job.startDate} - {job.currentlyWorking ? 'Present' : job.endDate}</Descriptions.Item>
                <Descriptions.Item label="Description">
                {job.description}
                </Descriptions.Item>
            </Descriptions>
            <div className='actions'>
                <Button icon={<EditOutlined />} onClick={onEdit}>Edit</Button>
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={onDelete}
                    okText="Yes"
                    cancelText="No"
                    okType='danger'
                    okButtonProps={{loading: false}}
                >
                    <Button icon={<DeleteOutlined />} danger>Delete</Button>
                </Popconfirm>
                
            </div>
      </div>
    )
}

export default styled(JobDetails)`
    display: flex;
    gap: 1em;
    margin-bottom: 1.5em;

    .actions {
        display: flex;
        gap: 1em;
    }
`