import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap'

function TableData() {
    const [chartData, setChartData] = useState([]);

    async function fetchData() {
        const res = await fetch("https://backend-sql.herokuapp.com/covids");
        res.json().then(res => setChartData(res))
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Coronavirus Live Tracker</h1>
            <p>Daily update of reported cases across cities in Germany</p>
            <Table striped bordered hover responsive="sm">
                <thead className="thead-light">
                    <tr>
                        <th>City</th>
                        <th>Total no. of cases reported</th>
                    </tr>
                </thead>
                <tbody>
                    {chartData.map(data => (
                        <tr key={data.id}>
                            <td>{data.label} </td>
                            <td>{data.value} </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <h6>Data sources: Robert-Koch-Institut, Health Offices of the Federal States, own research</h6>
        </div>
    );
};
export default TableData;
