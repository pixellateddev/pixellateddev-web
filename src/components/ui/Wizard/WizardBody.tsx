import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';

const WizardBody: FC<StyledProp> = ({ children, className }) => {
    return (
        <div className={className}>{children}</div>
    )
}

export default styled(WizardBody)`
    padding: 1em;
`