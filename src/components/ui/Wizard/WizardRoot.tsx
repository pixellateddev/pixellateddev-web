import { Menu } from 'antd';
import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import { useWizard } from '../../../context/WizardContext';

const WizardRoot: FC<StyledProp> = ({ className }) => {
    const { steps, selectedStep, selectedView, setSelectedView} = useWizard()
    return (
        <div className={className}>
            <Menu
                selectedKeys={selectedView}
                onSelect={(e) => setSelectedView([e.key])}
                className='tabs'
            >
                {steps.map(step => (
                    <Menu.Item key={step.id}>
                        {step.label}
                    </Menu.Item>
                ))}
            </Menu>
            {selectedStep && (
                <selectedStep.body />
            )} 
        </div>
    )
}

export default styled(WizardRoot)`
    display: flex;
    height: 100%;
    width: 100%;

    .tabs {
        width: 250px;
    }
`