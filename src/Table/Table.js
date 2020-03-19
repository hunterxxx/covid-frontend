import React, { useState, useEffect } from "react";
import { Table, Form, FormControl, Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';

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
        <div className="container mt-2">
            <h1>Coronavirus Live Tracker (COVID-19)</h1>
            <Form inline className="mb-1">
                <p>Daily update of reported cases across cities in Germany</p>
                <FormControl style={{ marginLeft: "auto" }} type="text" placeholder="Search City" className="mr-sm-2" />
                <Button className="btn btn-danger">Search</Button>
            </Form>
            <Table striped bordered hover responsive="sm">
                <thead className="thead-dark">
                    <tr>
                        <th className="text-danger">City</th>
                        <th className="text-danger">Number of cases reported</th>
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
