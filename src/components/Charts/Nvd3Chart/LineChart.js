import React from 'react';
import NVD3Chart from 'react-nvd3';
import { getFormattedDate } from '../../../utils/dateUtil';


const LineChart = (props) => {
    const getData = () => {
        var data = [];
        props.data.forEach(e => {
            let splitDate = e.date.split('-');            
            data.push({
                'x': new Date(splitDate[2], splitDate[1] - 1, splitDate[0]),
                'y': e.bullyCount + e.noBullyCount
            });            
        });
        return [{
                values: data,
                key: 'Daily Scans',
                color: '#A389D4',
                // color: '#1de9b6',
                area: true
            }];
    }

    const data = getData();
    return (
        <div>
            {
                React.createElement(NVD3Chart, {
                    xAxis: {
                        tickFormat: (d) => { return getFormattedDate(d); },
                        axisLabel: 'Date'
                    },
                    yAxis: {
                        axisLabel: 'Count',
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