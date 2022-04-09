import { Drawer } from 'antd';
import { FC, MouseEventHandler, useState } from 'react';

import { MenuFoldOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';
import { IconButton } from '../ui';

interface HamburgerMenuProps {
    onClose?: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
    open?: boolean
}

let HamburgerMenu: FC<StyledProp<HamburgerMenuProps>> = ({ className, onClose, open }) => {
    return (
        <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={open} className={className}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    )
}

HamburgerMenu = styled(HamburgerMenu)`
    .ant-drawer-content, .ant-drawer-header, .ant-drawer-close {
        background-color: rgba(0, 0, 0, 0.7);
        color: #59ffd1;
    }

    .ant-drawer-close:hover {
        filter: brightness(1.6);
    }

    .ant-drawer-header {
        border-color: #59ffd1;
    }
`



const Header: FC<StyledProp> = ({className}) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <div className={className}>
            <div className='container'>
                <header className='header'>
                    <img src='/assets/logo.svg' className='header-logo' />
                    <IconButton icon={<MenuFoldOutlined />} onClick={toggleMenu}/>
                    <HamburgerMenu open={menuOpen} onClose={toggleMenu} />
                </header>
            </div>
        </div>
    )
}

export default styled(Header)`
    background-color: #292527;
    color: #59ffd1;
    
    .header {
        padding: 1em;
        display: flex;
        justify-content: space-between;
    }

    .header-logo {
        height: 32px;
    }

    .drawer {
        background-color: blue;

        .ant-drawer-header, .ant-drawer-body {
            background-color: red;
        }
    }
`