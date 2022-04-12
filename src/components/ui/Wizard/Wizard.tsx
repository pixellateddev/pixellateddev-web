import { Menu } from 'antd';
import { FC, ReactNode, useState } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import { WizardContext } from '../../../context/WizardContext';
import WizardRoot from './WizardRoot';

export interface Step {
    id: string
    label: string
    body: FC<any>
}

interface WizardProps {
    steps: Step[]
    defaultStep: string
}



const Wizard: FC<StyledProp<WizardProps>> = ({ steps, defaultStep, className }) => {
    const [selectedView, setSelectedView] = useState(defaultStep)
    const selectedIndex = steps.findIndex(step => selectedView.includes(step.id))
    const selectedStep = steps[selectedIndex]
    const total = steps.length
    const canPrevious = !!selectedIndex
    const canNext = selectedIndex < total - 1

    const next = () => {
        if (canNext) {
            setSelectedView(steps[selectedIndex + 1].id)
        }
    }

    const previous = () => {
        if (canPrevious) {
            setSelectedView(steps[selectedIndex - 1].id)
        }
    }
    return (
        <WizardContext.Provider value={{
            steps,
            selectedStep,
            next,
            previous,
            defaultStep,
            setSelectedView,
            selectedView,
            canNext,
            canPrevious
        }}>
            <WizardRoot />
        </WizardContext.Provider>
    )
}

export default styled(Wizard)`
    display: flex;
    height: 100%;
    width: 100%;

    .tabs {
        width: 250px;
    }
`