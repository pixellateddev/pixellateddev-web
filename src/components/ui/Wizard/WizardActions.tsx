import { Button } from 'antd';
import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import { useWizard } from '../../../context/WizardContext';

interface WizardActionsProps {
    hideNext?: boolean
    hidePrevious?: boolean
}

const WizardActions: FC<StyledProp<WizardActionsProps>> = ({ className, children, hideNext, hidePrevious }) => {
    const { next, canNext, previous, canPrevious } = useWizard()
    return (
        <div className={className}>
            {!hidePrevious && canPrevious && <Button onClick={previous}>Previous</Button>}
            {children}
            {!hideNext && canNext && <Button type='primary' onClick={next} >Next</Button>}
        </div>
    )
}

export default styled(WizardActions)`
    align-self: end;
    justify-self: end;
    gap: 1em;
    display: flex;
`
