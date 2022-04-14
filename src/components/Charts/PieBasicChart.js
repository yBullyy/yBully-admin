import React from 'react';
import NVD3Chart from 'react-nvd3';


const PieBasicChart = (props) => {
    const getData = () => {
        let data = {"user": 0, "admin": 0, "trustedUser": 0 };
        props.data.forEach(e => {
            data[e.role] += 1;
        });
        return [
            {key: "User",y: data["user"]},
            {key: "Admin",y: data["admin"]},
            {key: "Trusted User",y: data["trustedUser"]}
        ];
    }
    const data = getData();
    
    return <NVD3Chart id="chart" height={300} type="pieChart" datum={data} x="key" y="y"  />
}

export default PieBasicChart;