import { Spin } from 'antd';
import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';

const Loader: FC<StyledProp> = ({ className }) => {
    return (
        <div className={className}>
            <Spin size='large' />
        </div>
    )
}

export default styled(Loader)`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`