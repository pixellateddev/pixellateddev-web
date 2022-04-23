import { Button, Descriptions, Empty } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import {
    ADD_SKILL, DELETE_SKILL, GET_RESUME, GET_RESUME_DATA, UPDATE_SKILL
} from '../../../graphql/resume';
import { Skill } from '../../../types/resume';
import { WizardActions, WizardBody } from '../../ui/Wizard';
import WizardView from '../../ui/Wizard/WizardView';
import Details from './Details';
import SkillForm from './SkillForm';

const Skills: FC = () => {
    const { query: {resumeId} } = useRouter()
    const { data } = useQuery<GET_RESUME_DATA>(GET_RESUME, { variables: { resumeId }})

    const [ editing, setEditing ] = useState(false)
    const [ selectedSkill, setSelectedSkill ] = useState<Skill | undefined>()

    const [ addSkill ] = useMutation(ADD_SKILL)
    const [ updateSkill ] = useMutation(UPDATE_SKILL)
    const [ deleteSkill ] = useMutation(DELETE_SKILL)

    const openModal = (skill?: Skill) => {
        setEditing(true)
        setSelectedSkill(skill)
    }

    const closeModal = () => {
        setEditing(false)
        setSelectedSkill(undefined)
    }

    const handleSubmit = async (skill: any) => {
        delete skill.id
        if (selectedSkill) {
            await updateSkill({variables: { resumeId, skillId: selectedSkill.id, skill}})
        } else {
            await addSkill({variables: {resumeId, skill: skill}})
        }
        closeModal()
    }

    const onDeleteSkill = (skillId: string) => {
        deleteSkill({ variables: {
            resumeId,
            skillId
        }})
    }

    const { resume } = data!
    return (
        <WizardView title='Skills'>
            <WizardBody>
                {resume.skills?.map(skill => (
                    <Details onEdit={() => openModal(skill)} onDelete={() => onDeleteSkill(skill.id)}>
                        <Descriptions.Item label='Skill'>{skill.skill}</Descriptions.Item>
                        <Descriptions.Item label='Proficiency'>{skill.proficiency} / 10</Descriptions.Item>
                        <Descriptions.Item label='Description'>{skill.description}</Descriptions.Item>
                    </Details>
                ))}
                {!resume.skills?.length && (
                    <Empty description='Nothing to show here' />
                )}

                {editing && <SkillForm skill={selectedSkill} open={editing} onSubmit={handleSubmit} onClose={closeModal}/>}
            </WizardBody>
            <WizardActions>
                <Button onClick={() => openModal()} >Add New Skill</Button>
            </WizardActions>
        </WizardView>
    )
}

export default Skills