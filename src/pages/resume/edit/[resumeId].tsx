import { Menu } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';
import { PersonalDetails } from '../../../components/resume/edit';

interface MenuViewProps {
    value: string
    selectedKeys: string[]
}

const MenuView: FC<MenuViewProps> = ({ children, value, selectedKeys }) => {
    if (selectedKeys.includes(value)) {
        return <div className='tab-view'>{children}</div>
    }
    return null
}

const EditResume: NextPage<StyledProp> = ({ className }) => {
    const { query: {resumeId} } = useRouter()
    const [ selectedKeys, setSelectedKeys ] = useState(['personalDetails'])
    return (
        <div className={className}>
            <Menu
                selectedKeys={selectedKeys}
                onSelect={(e) => setSelectedKeys([e.key])}
                className='tabs'
            >
                <Menu.Item key="personalDetails">
                    Personal Details
                </Menu.Item>
                <Menu.Item key="workExperience">
                    Work Experience
                </Menu.Item>
                <Menu.Item key="educationalDetails">
                    Educational Details
                </Menu.Item>
            </Menu>
            <MenuView value='personalDetails' selectedKeys={selectedKeys}><PersonalDetails /></MenuView>
        </div>
    )
}

export default styled(EditResume)`
    background-color: white;
    width: 100%;
    max-width: 900px;
    height: 100%;
    margin: 0 auto;
    display: flex;

    .tabs {
        width: 200px;
    }

    .tab-view {
        flex: 1;
        padding: 1em;
    }
`
