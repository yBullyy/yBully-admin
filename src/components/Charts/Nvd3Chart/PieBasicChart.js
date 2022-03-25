import React from 'react';
import NVD3Chart from 'react-nvd3';

const data = [
    {key: "User", y: 29, color: "#ff8a65"},
    {key: "Admin", y: 10, color: "#f4c22b"},
    {key: "Trusted User", y: 32, color: "#04a9f5"}
];

class PieBasicChart extends React.Component {
    render() {
        return <NVD3Chart id="chart" height={300} type="pieChart" datum={data} x="key" y="y"  />
    }
}

export default PieBasicChart;