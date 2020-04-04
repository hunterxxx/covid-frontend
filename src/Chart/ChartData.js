import React, { useState, useEffect } from "react";
import Chart from './Chart'


export default function ChartData() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        setLoading(true);
        const res = await fetch("https://backend-sql.herokuapp.com/covids");
        res.json().then(res => {
            setChartData(res)
            localStorage.setItem('data', JSON.stringify(res));
        })
        setLoading(false);
    }

    useEffect(() => {
        if (!navigator.onLine) {
            setLoading(true);
            setChartData(JSON.parse(localStorage.getItem('data')))
            setLoading(false);
        } else {
            fetchData();
        }
    }, []);

    return (<Chart data={chartData} loading={loading} />);
}
