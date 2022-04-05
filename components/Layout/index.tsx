import { Layout } from 'antd';
import { FC } from 'react';

import Footer from './footer';
import Header from './header';

const PageLayout: FC = () => {
    return (
        <Layout className='layout'>
            <Header />
            <div className='page'></div>
            <Footer />
        </Layout>
    )
}

export default PageLayout