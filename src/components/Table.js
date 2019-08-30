import React, { Component, useState } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data } from "react-data-grid-addons";
import * as actions from '../actions'
import { connect } from 'react-redux'
import { Button } from 'antd';


const selectors = Data.Selectors;


const handleFilterChange = filter => filters => {
    const newFilters = { ...filters };
    if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
    } else {
        delete newFilters[filter.column.key];
    }
    return newFilters;
};

function getRows(rows, filters) {
    return selectors.getRows({ rows, filters });
}
const EmptyRowsView = () => {
    const message = "No data to show";
    return (
        <div style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }} >
            {/* <img src={logo} alt={message} /> */}
            <h3>{message}</h3>
        </div>
    );
};




export function GridTable({ rows, columns, onGridRowsUpdated }) {
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [filters, setFilters] = useState({});
    const filteredRows = getRows(rows, filters);
    const onRowsSelected = rows => {
        setSelectedIndexes(selectedIndexes.concat(rows.map(r => r.rowIdx)))
    };
    const onRowsDeselected = rows => {
        let rowIndexes = rows.map(r => r.rowIdx);
        setSelectedIndexes(selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1))

    }
    React.useEffect(() => {
        console.log('selectedIndexes', selectedIndexes)

    });

    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => filteredRows[i]}
            rowsCount={filteredRows.length}
            minHeight={500}
            toolbar={<Toolbar enableFilter={true} enableAddRow={true} addRowButtonText='Add new Row' />}
            onAddFilter={filter => setFilters(handleFilterChange(filter))}
            onClearFilters={() => setFilters({})}
            emptyRowsView={EmptyRowsView}
            enableDragAndDrop={true}
            enableCellSelect={true}
            onGridRowsUpdated={onGridRowsUpdated}
            rowSelection={{
                showCheckbox: true,
                enableShiftSelect: true,
                onRowsSelected: onRowsSelected,
                onRowsDeselected: onRowsDeselected,
                selectBy: {
                    indexes: selectedIndexes
                }
            }}
        />

    );
}


export class GridTable1 extends Component {

    render() {
        console.log('datatable', this.props.dataTable)
        return (
            <div>
                <GridTable
                    rows={this.props.dataTable.rows}
                    columns={this.props.dataTable.cols}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                >
                </GridTable>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    dataTable: state.dataTable
})

const mapDispatchToProps = dispatch => ({
    GridRowsUpdated: cellInfo => dispatch(actions.GridRowsUpdated(cellInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GridTable1)
