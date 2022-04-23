import { Button, Descriptions, Empty } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { useWizard } from '../../../context/WizardContext';
import {
    ADD_NEW_COURSE, DELETE_COURSE, GET_RESUME, GET_RESUME_DATA, UPDATE_COURSE
} from '../../../graphql/resume';
import { Course } from '../../../types/resume';
import { WizardActions, WizardBody } from '../../ui/Wizard';
import WizardView from '../../ui/Wizard/WizardView';
import CourseDetails from './CourseDetails';
import CourseForm from './CourseForm';
import Details from './Details';

const EducationDetails: FC = () => {
    const { query: {resumeId} } = useRouter()
    const { data } = useQuery<GET_RESUME_DATA>(GET_RESUME, { variables: { resumeId }})

    const [ editing, setEditing ] = useState(false)
    const [ selectedCourse, setSelectedCourse ] = useState<Course | undefined>()
    const { canNext, canPrevious, next, previous} = useWizard()

    const [addNewCourse] = useMutation(ADD_NEW_COURSE)
    const [deleteCourse] = useMutation(DELETE_COURSE)
    const [updateJob] = useMutation(UPDATE_COURSE)

    const handleSubmit = async (course: any) => {
        delete course.id
        if (selectedCourse) {
            await updateJob({variables: { resumeId, courseId: selectedCourse.id, course}})
        } else {
            await addNewCourse({variables: {resumeId, course: course}})
        }
        closeModal()
    }
    

    const onDeleteJob = (courseId: string) => {
        deleteCourse({ variables: {
            resumeId,
            courseId
        }})
    }

    const openModal = (course?: Course) => {
        setEditing(true)
        setSelectedCourse(course)
    }

    const closeModal = () => {
        setEditing(false)
        setSelectedCourse(undefined)
    }

    const { resume } = data!
    return (
        <WizardView title='Education Details'>
            <WizardBody>
                {resume.educationDetails && resume.educationDetails.map((course) => (
                    <Details key={course.id} onEdit={() => openModal(course)} onDelete={() => onDeleteJob(course.id)}>
                        <Descriptions.Item label='Course Name'>{course.courseName}</Descriptions.Item>
                        <Descriptions.Item label='Institute Name'>{course.instituteName}</Descriptions.Item>
                        <Descriptions.Item label='Tenure'>{course.startYear} - {course.currentlyPersuing ? 'Present' : course.endYear}</Descriptions.Item>
                        <Descriptions.Item label='Location'>{course.location}</Descriptions.Item>
                        <Descriptions.Item label='score'>{course.score}</Descriptions.Item>
                    </Details>
                ))}

                {!resume.educationDetails?.length && (
                    <Empty description='Nothing to show here' />
                )}

                {editing && <CourseForm open onSubmit={handleSubmit} course={selectedCourse} onClose={closeModal}/>}
            </WizardBody>
            
            <WizardActions>
                <Button onClick={() => openModal()}>Add New Course</Button>
            </WizardActions>
        </WizardView>
    )
}

export default EducationDetails