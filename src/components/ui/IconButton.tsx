import { Button } from 'antd';
import { FC, MouseEventHandler, ReactNode } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';

interface Props {
    icon?: ReactNode
    onClick?: MouseEventHandler<HTMLElement>
    size?: 24 | 32
}

const IconButton: FC<StyledProp<Props>> = ({className, onClick, icon}) => {
    return <Button className={className} onClick={onClick} icon={icon} /> 
}


export default styled(IconButton)`
    background-color: transparent;
    border: 0;
    color: inherit;

    &:hover, &:focus {
        background-color: transparent;
        color: inherit;
        filter: brightness(1.6);
    }

    .anticon {
        font-size: ${({size=24}) => size}px
    }

`