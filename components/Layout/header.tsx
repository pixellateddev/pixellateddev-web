import { Layout } from 'antd';
import { FC } from 'react';

const { Header : AntdHeader } = Layout

const Header: FC = () => {
    return (
        <div className='header-container'>
            <div className='container'>
                <AntdHeader className='header'>
                    Hello World
                </AntdHeader>
            </div>
        </div>
    )
}

export default Header