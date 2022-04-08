import 'antd/dist/antd.css';
import '../styles/globals.scss';

import PageLayout from '../components/Layout';

import type { AppProps } from 'next/app'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default MyApp
