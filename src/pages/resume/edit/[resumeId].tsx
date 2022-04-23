import { Menu } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import {
    EducationDetails, PersonalDetails, Skills, WorkExperience
} from '../../../components/resume/edit';
import { DataLoader, Wizard } from '../../../components/ui';
import { Step } from '../../../components/ui/Wizard/Wizard';
import { GET_RESUME, GET_RESUME_DATA } from '../../../graphql/resume';

const EditResume: NextPage<StyledProp> = ({ className }) => {
    const { query: {resumeId} } = useRouter()
    const { data, loading, error } = useQuery<GET_RESUME_DATA>(GET_RESUME, { variables: { resumeId }})
    const steps: Step[] = [
        {
            id: 'personalDetails',
            label: 'Personal Details',
            body: PersonalDetails
        },
        {
            id: 'workExperience',
            label: 'Work Experience',
            body: WorkExperience
        },
        {
            id: 'educationDetails',
            label: 'Education Details',
            body: EducationDetails
        },
        {
            id: 'skills',
            label: 'Skills',
            body: Skills
        }
    ]
    const defaultStep = steps[0].id
    return (
        <div className={className}>
            <DataLoader loading={loading} error={error} data={data}>
                <Wizard steps={steps} defaultStep={defaultStep}/>
            </DataLoader>
        </div>
    )
}

export default styled(EditResume)`
    background-color: white;
    width: 100%;
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;
    display: flex;


    .tab-view {
        flex: 1;
        padding: 1em;
    }
`
