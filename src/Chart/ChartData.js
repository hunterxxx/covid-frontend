import React, { useState, useEffect } from "react";
import Chart from './Chart'


export default function ChartData() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        setLoading(true);
        const res = await fetch("https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=GEN,cases&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json");
        res.json().then(res => {
            setChartData(res.features)
            localStorage.setItem('data', JSON.stringify(res.features));
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
