import { Divider, Typography } from 'antd';
import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';

const { Text } = Typography


const Footer: FC<StyledProp<{}>> = ({ className }) => {
    return (
        <div className={className}>
            <div className='container'>
                <footer className='footer'>
                    <img src='/assets/logo.svg' className='footer-logo' />
                    <Divider type='vertical' className='footer-divider' />
                    <Text className='footer-text'>All Rights Reserved</Text>
                </footer>
            </div>
        </div>
    )
}

export default styled(Footer)`

    background-color: #292527;

    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3em;
      background: transparent;
    }

    .footer-logo {
      height: 32px;
    }

    .footer-divider {
      height: 40px;
      background-color: #59ffd1;
      margin: 0 1em;
    }
    .footer-text {
      color: #59ffd1
    }
`