import { Button, Descriptions, Popconfirm } from 'antd';
import { FC } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { StyledProp } from '../../../../emotion';

interface DetailsProp {
    onDelete: () => void
    onEdit: () => void
}

const Details: FC<StyledProp<DetailsProp>> = ({ className, onDelete, onEdit, children }) => {
    return (
        <div className={className}>
            <Descriptions layout='horizontal' column={1} size='small' labelStyle={{fontWeight: 'bold'}} className='info'>
                {children}
            </Descriptions>
            <div className='actions'>
                <Button icon={<EditOutlined />} onClick={onEdit}>Edit</Button>
                <Popconfirm
                    title="Are you sure to delete this item?"
                    onConfirm={onDelete}
                    okText="Yes"
                    cancelText="No"
                    okType='danger'
                    okButtonProps={{loading: false}}
                >
                    <Button icon={<DeleteOutlined />} danger>Delete</Button>
                </Popconfirm>
            </div>
        </div>    
    )
}

export default styled(Details)`
    display: flex;
    gap: 1em;
    margin-bottom: 1.5em;

    .actions {
        display: flex;
        gap: 1em;
    }
`