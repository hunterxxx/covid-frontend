import React, { useState, useEffect } from "react";
import Chart from './Chart'
import _ from 'lodash';

export default function ChartData() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        setLoading(true);
        const res = await fetch("https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=GEN,BEZ,cases&returnGeometry=false&outSR=4326&f=json");
        res.json().then(res => {
            let result = res.features
            let data = _.map(result, "attributes")
            setChartData(data)
            localStorage.setItem('data', JSON.stringify(data));
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

    Object.keys(chartData).forEach(function (key) {
        chartData[key].label = chartData[key].GEN;
        chartData[key].value = chartData[key].cases;

        delete chartData[key].GEN;
        delete chartData[key].cases;

    });

    return (<Chart data={chartData} loading={loading} />);
}
