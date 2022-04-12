import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';

export interface WizardViewProps {
    title: string,
    selected?: boolean,
}


const WizardView: FC<StyledProp<WizardViewProps>> = ({ className, title, children }) => {
    return (
        <div className={className}>
            <h3>{title}</h3>
            {children}
        </div>
    )
}

export default styled(WizardView)`
    padding: 1em;
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: 3em auto;
    .wizard-body {
        padding: 1em;
    }

`