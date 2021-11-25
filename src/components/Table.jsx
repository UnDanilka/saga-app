import React from 'react';
import {Row, Col} from 'antd'

const Table = () => {
    return (
        <div>
            <Row>
            <Col span={12}>Name</Col>
            <Col span={5}>Price</Col>
            <Col span={7}>Actions</Col>
            </Row>
        </div>
    );
};

export default Table;