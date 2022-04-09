import { FC } from 'react';

import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';
import { RESUMES } from '../../graphql/resume';

const Resume: FC<StyledProp> = ({ className }) => {
    const {loading, data, error} = useQuery(RESUMES)
    console.log({ loading, data, error })
    return (
        <div className={className}>
            <h3>Use an existing one</h3>
            <div>
                {data?.resumes.map((resume: any) => (
                    <div key={resume.id}>{resume.title}</div>
                ))}
            </div>
            
        </div>
    )
}

export default styled(Resume)`
    background-color: white;
    height: 100%;
    width: 60%;
    margin: 0 auto;
    padding: 1em;
`