import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';

const WizardActions: FC<StyledProp> = ({ className, children }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default styled(WizardActions)`
    align-self: end;
    justify-self: end;
    gap: 1em;
    display: flex;
`
