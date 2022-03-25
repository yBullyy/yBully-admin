import React from 'react';
import NVD3Chart from 'react-nvd3';

function getDatum() {
    var data = [];
    let date = new Date();
    for (var i = 1; i < 40; i++) {        
        var r = Math.floor(Math.random() * 100) + 10;

        data.push({
            'x': date.getDate() + i,
            'y': r,
        });
    }
    return [
        {
            values: data,
            key: 'Daily Scans',
            color: '#A389D4',
            // color: '#1de9b6',
            area: true
        },
    ];
}

const LineChart = () => {

    const data = getDatum();
    return (
        <div>
            {
                React.createElement(NVD3Chart, {
                    xAxis: {
                        tickFormat: function (d) { return d; },
                        axisLabel: 'Date'
                    },
                    yAxis: {
                        axisLabel: 'Count',
                        tickFormat: function (d) { return parseFloat(d).toFixed(2); }
                    },
                    type: 'lineChart',
                    datum: data,
                    x: 'x',
                    y: 'y',
                    height: 300,
                    renderEnd: function () {
                        console.log('renderEnd');
                    }
                })
            }
        </div>
    )
}

export default LineChart;