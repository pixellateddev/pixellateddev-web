import { Button } from 'antd';
import { FC } from 'react';

import { Job } from '../../../types/resume';

interface JobDetailsProps {
    job: Job
    onDelete: () => void
    onEdit: () => void
}

export const JobDetails: FC<JobDetailsProps> = ({ job, onDelete, onEdit }) => {
    return (
        <div>
            <p>{job.id}</p>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
        </div>
    )
}

export default JobDetails