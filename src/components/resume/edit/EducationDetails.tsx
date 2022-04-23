import { Button, Empty } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import {
    ADD_NEW_COURSE, DELETE_COURSE, GET_RESUME, GET_RESUME_DATA, UPDATE_COURSE
} from '../../../graphql/resume';
import { Course } from '../../../types/resume';
import { WizardActions, WizardBody } from '../../ui/Wizard';
import WizardView from '../../ui/Wizard/WizardView';
import CourseDetails from './CourseDetails';
import CourseForm from './CourseForm';

const EducationDetails: FC = () => {
    const { query: {resumeId} } = useRouter()
    const { data } = useQuery<GET_RESUME_DATA>(GET_RESUME, { variables: { resumeId }})

    const [ editing, setEditing ] = useState(false)
    const [ selectedCourse, setSelectedCourse ] = useState<Course | undefined>()

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
                    <CourseDetails key={course.id} course={course} onEdit={() => openModal(course)} onDelete={() => onDeleteJob(course.id)}/>
                ))}

                {!resume.educationDetails?.length && (
                    <Empty description='Nothing to show here' />
                )}

                {editing && <CourseForm open onSubmit={handleSubmit} course={selectedCourse} onClose={closeModal}/>}
            </WizardBody>
            
            <WizardActions>
                <Button onClick={() => openModal()} >Add New Job</Button>
            </WizardActions>
        </WizardView>
    )
}

export default EducationDetails