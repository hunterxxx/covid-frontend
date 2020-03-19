import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap'

function TableData() {
    const [data, setData] = useState([]);

    async function fetchData() {
        const res = await fetch("https://backend-sql.herokuapp.com/covids");
        res
            .json()
            .then(res => setData(res))
    }

    useEffect(() => {
        fetchData();
    });

    return (
        <div className="container">
            <h1>Coronavirus Live Tracker</h1>
            <p>Current number of cases reported across cities in Germany</p>
            <Table striped bordered hover responsive="sm">
                <thead className="thead-light">
                    <tr>
                        <th>City</th>
                        <th>Total cases reported</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(book => (
                        <tr key={book.id}>
                            <td>{book.city} </td>
                            <td>{book.number} </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    );
};
export default TableData;
