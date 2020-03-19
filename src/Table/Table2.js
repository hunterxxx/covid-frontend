import React, { useState, useEffect } from "react";
import { Table, Form, FormControl, Button } from 'react-bootstrap'
//import BootstrapTable from 'react-bootstrap-table-next';

function TableData() {
    const [chartData, setChartData] = useState([]);
    //const [total, setTotal] = useState(0);

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

    console.log(result);

    return (
        <div className="container mt-2">
            <h1>Coronavirus Live Tracker (COVID-19)</h1>
            <h4>Number of cases reported in Germany : <b className="text-danger">
                {result > 0
                    ? result
                    : "Loading"
                }</b></h4>
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

                    {/* const array = [10, 20, 30, 40];
                    const add = (a, b) => a + b
                    const result = array.reduce(add);

                    console.log(result); // Should give 100 */}

                </tbody>
            </Table>
            <h6>Data sources: Robert-Koch-Institut, Health Offices of the Federal States, own research</h6>
        </div>
    );
};
export default TableData;
