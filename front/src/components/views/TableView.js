import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Table } from 'antd';

function TableView(props) {

    const { columns, ...otherTableProps } = props;

    const sortableColumns = columns.map((column) => {
        const { sorter, dataIndex, ...otherColumnProps } = column;

        if (sorter) {
            const { compare, ...otherSorterProps } = sorter;

            return {
                ...otherColumnProps,
                dataIndex,
                sorter: {
                compare: (rowA, rowB) => compare(rowA[dataIndex], rowB[dataIndex]),
                ...otherSorterProps
                }
            };
        }

        return { ...otherColumnProps, dataIndex };
    });

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    
    return <Table sortDirections={['ascend', 'descend']} columns={sortableColumns} dataSource={props.data} { ...otherTableProps } onChange={onChange} />
};

TableView.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowKey: PropTypes.string.isRequired
};

TableView.defaultProps = {
    columns: [],
    data: []
};

export default TableView;

/*
    filtered: true,
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch:(input, record) => record.value.indexOf(input) > -1,
*/