import { Button, Descriptions, Popconfirm } from 'antd';
import { FC } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import { Course } from '../../../types/resume';

interface CourseDetailsProps {
    course: Course
    onDelete: () => void
    onEdit: () => void
}

const CourseDetails: FC<StyledProp<CourseDetailsProps>> = ({ className, onDelete, onEdit, course }) => {
    return (
        <div className={className}>
            <Descriptions layout='horizontal' column={1} size='small' labelStyle={{fontWeight: 'bold'}} className='info'>
                <Descriptions.Item label='Course Name'>{course.courseName}</Descriptions.Item>
                <Descriptions.Item label='Institute Name'>{course.instituteName}</Descriptions.Item>
                <Descriptions.Item label='Tenure'>{course.startYear} - {course.currentlyPersuing ? 'Present' : course.endYear}</Descriptions.Item>
                <Descriptions.Item label='Location'>{course.location}</Descriptions.Item>
                <Descriptions.Item label='score'>{course.score}</Descriptions.Item>
            </Descriptions>
            <div className='actions'>
                <Button icon={<EditOutlined />} onClick={onEdit}>Edit</Button>
                <Popconfirm
                    title="Are you sure to delete this Course?"
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

export default styled(CourseDetails)`
    display: flex;
    gap: 1em;
    margin-bottom: 1.5em;

    .actions {
        display: flex;
        gap: 1em;
    }
`