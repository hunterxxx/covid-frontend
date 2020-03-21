import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

function TableData() {
    const [chartData, setChartData] = useState([]);

    async function fetchData() {
        const res = await fetch("https://backend-sql.herokuapp.com/covids");
        res.json().then(res => setChartData(res))
    }

    useEffect(() => {
        fetchData();
    }, []);

    let result = 0;
    chartData.map(data => {
        return result += data.value;
    })

    const { SearchBar } = Search;

    const columns = [
        {
            dataField: 'label',
            text: 'City',
            sort: true
        }, {
            dataField: 'value',
            text: 'Number of cases reported',
            sort: true
        }];

    return (
        <div className="container mt-2">
            <h1>Coronavirus Live Tracker (COVID-19)</h1>
            <h4>Number of cases reported in Germany : <b className="text-danger">
                {result > 0
                    ? result
                    : "Loading"
                }</b></h4>
            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={chartData}
                columns={columns}

                search
            >
                {
                    props => (
                        <div>
                            <div className="d-flex justify-content-between">
                                <p>Daily update of reported cases across cities in Germany <br class="mobile-break" />(Stand: 21.03.2020)</p>
                                <SearchBar
                                    style={{ marginRight: "10em" }}
                                    placeholder="Search City or Number"
                                    {...props.searchProps} />
                            </div>
                            <BootstrapTable
                                headerClasses="text-danger bg-dark"
                                striped
                                hover
                                condensed
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>

            <h6>Data sources: Robert-Koch-Institut, Health Offices of the Federal States, own research</h6>
        </div>
    );
};
export default TableData;
