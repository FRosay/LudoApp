import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { useTable } from 'react-table';

const TableView = (props) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns: props.columns, data: props.data })


    return (<Table striped bordered hover {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    </Table>)
}

TableView.propTypes = {
    columns: PropTypes.any.isRequired,
    data: PropTypes.any.isRequired
};

TableView.defaultProps = {
    columns: [],
    data: []
};

export default TableView