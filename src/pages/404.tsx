import { Button, Result, Typography } from 'antd';
import Link from 'next/link';
import { FC } from 'react';

const Custom404: FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link href='/'><Typography.Link>Go to Homepage</Typography.Link></Link>}
        />
    )
}

export default Custom404