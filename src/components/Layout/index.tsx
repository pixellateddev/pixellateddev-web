import { Layout } from 'antd';
import { FC } from 'react';

import Footer from './footer';
import Header from './header';

const PageLayout: FC = ({ children }) => {
    return (
        <Layout className='layout'>
            <Header />
            <div className='page'>
                {children}
            </div>
            <Footer />
        </Layout>
    )
}

export default PageLayout