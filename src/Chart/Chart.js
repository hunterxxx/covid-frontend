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
    // console.log(data)

    // var dataScience = data.map(function (item) {
    //     return {
    //         city: item.attributes.GEN,
    //         count: item.attributes.cases
    //     };
    // });

    // console.log(dataScience)

    data.forEach(obj => delete obj.attributes.GEN)
    data.sort((x, y) => y.attributes.cases - x.attributes.cases)

    let chartData = data.slice(0, 10)


    const chartConfigs = {
        type: "column2d", // The chart type
        width: "90%", // Width of the chart
        height: "90%", // Height of the chart
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
