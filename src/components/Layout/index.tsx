import { Layout } from 'antd';
import { FC } from 'react';

import styled from '@emotion/styled';

import { StyledProp } from '../../../emotion';
import Footer from './footer';
import Header from './header';

const PageLayout: FC<StyledProp> = ({ children, className }) => {
    return (
        <Layout className={className}>
            <Header />
            <div className='page'>
                <div className='container'>
                    {children}
                </div>
            </div>
            <Footer />
        </Layout>
    )
}


export default styled(PageLayout)`
    height: 100vh;

    .page {
        flex: 1;
    }
    
    .container {
        max-width: 1280px;
        height: 100%;
        margin: 0 auto;
        padding: 1em;
    }
`