import 'antd/dist/antd.css';
import '../styles/globals.scss';

import { SessionProvider } from 'next-auth/react';

import ApolloProviderAuth from '../apollo-client';
import PageLayout from '../components/Layout';

import type { AppProps } from 'next/app'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProviderAuth>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ApolloProviderAuth>
    </SessionProvider>
  )
}

export default MyApp
