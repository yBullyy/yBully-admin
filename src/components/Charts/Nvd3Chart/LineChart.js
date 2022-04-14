import React from 'react';
import NVD3Chart from 'react-nvd3';
import { getFormattedDate } from '../../../utils/dateUtil';


const LineChart = ({ getData, xAxisLabel, yAxisLabel }) => {
    const data = getData();
    return (
        <div>
            {
                React.createElement(NVD3Chart, {
                    xAxis: {
                        tickFormat: (d) => { return getFormattedDate(d); },
                        axisLabel: xAxisLabel
                    },
                    yAxis: {
                        axisLabel: yAxisLabel,
                        tickFormat: (d) => { return d; }
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