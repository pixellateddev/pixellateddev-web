import { Divider, Layout, Typography } from 'antd';
import { FC } from 'react';

const { Footer: AntdFooter } = Layout
const { Text } = Typography

const Footer: FC = () => {
    return (
        <div className='footer-container'>
            <div className='container'>
                <AntdFooter className='footer'>
                    <img src='/assets/logo.svg' className='footer-logo'/>
                    <Divider type='vertical' className='footer-divider'/>
                    <Text className='footer-text'>All Rights Reserved</Text>
                </AntdFooter>
            </div>
        </div>
    )
}

export default Footer