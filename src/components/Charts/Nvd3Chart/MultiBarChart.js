import React from 'react';
import NVD3Chart from 'react-nvd3';

function generateNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function getData() {
    let bully_predictions = [],
        nobully_predictions = [];

    const len =  35 + (Math.random() * (70-35));
    for (let i = 0; i < len; i++) {
        bully_predictions.push({
            'x': i,
            'y': generateNumber(0, 60)
        });
        nobully_predictions.push({
            'x': i,
            'y': generateNumber(0, 100)
        });
    }
    return [
        {
            values: bully_predictions,
            key: 'Bully',
            color: '#A389D4'
        },
        {
            values: nobully_predictions,
            key: 'No Bully',
            color: '#04a9f5'
        }
    ];
}

class MultiBarChart extends React.Component {
    render() {
        const data = getData();
        return <NVD3Chart type="multiBarChart" datum={data} x="x" y="y" height={300} showValues groupSpacing={0.2} />
    }
}

export default MultiBarChart;