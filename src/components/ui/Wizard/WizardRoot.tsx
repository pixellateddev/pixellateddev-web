import { Tabs } from 'antd';
import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import { useWizard } from '../../../context/WizardContext';

const WizardRoot: FC<StyledProp> = ({ className }) => {
    const { steps, selectedView, setSelectedView} = useWizard()
    return (
        <Tabs 
            tabPosition='left'
            activeKey={selectedView}
            onChange={setSelectedView}
            className={className}
            
        >
            {steps.map(step => (
                <Tabs.TabPane tab={step.label} key={step.id}>
                    <step.body />
                </Tabs.TabPane>
            ))}
        </Tabs>
    )
}

export default styled(WizardRoot)`
    /* display: flex; */
    height: 100%;
    width: 100%;

    .ant-tabs-content {
        height: 100%;
    }
`