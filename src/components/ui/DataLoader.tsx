import { Spin } from 'antd';
import { FC } from 'react';

import { ApolloError } from '@apollo/client/errors';

import Loader from './Loader';

interface DataLoaderProps {
    data: any
    loading: boolean
    error?: ApolloError
}

const DataLoader: FC<DataLoaderProps> = ({ data, loading, error, children }) => {
    if (loading) {
        return (
            <Loader />
        )
    }
    if (error) {
        return <p>Something Went Wrong</p>
    }
    return <>{children}</>
}

export default DataLoader