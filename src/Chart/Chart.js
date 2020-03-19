import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export default function Chart({ data, loading }) {
    if (loading) {
        return <h2>Loading...</h2>;
    }
    data.forEach(obj => delete obj.id)
    data.sort((x, y) => y.value - x.value)

    let chartData = data.slice(0, 10)

    console.log(data)
    const chartConfigs = {
        type: "column2d", // The chart type
        width: "700", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            chart: {
                caption: "Coronavirus Live Tracker",
                subCaption: "Top 10 Cities in Germany",
                xAxisName: "City",
                yAxisName: "No. of Reported Cases",
                theme: "fusion"
            },
            data: chartData // Chart Data
        }
    };

    return (
        <div className="container">
            <ReactFC {...chartConfigs} />
        </div>);
}
