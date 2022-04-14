import React from 'react';
import NVD3Chart from 'react-nvd3';

const MultiBarChart = (props) => {
    function getData() {
        let bully_predictions = [],
            nobully_predictions = [];
    
        props.data.forEach(e => {
            bully_predictions.push({
                'x': e.date,
                'y': e.bullyCount
            });
            nobully_predictions.push({
                'x': e.date,
                'y': e.noBullyCount
            });
        });
        
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

    const data = getData();
    return <NVD3Chart type="multiBarChart" datum={data} x="x" y="y" height={300} showValues groupSpacing={0.2} />
}

export default MultiBarChart;