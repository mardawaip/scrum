import { useState } from 'react';
import Chart from 'react-apexcharts';

function RadialBar({ value })
{
    const state = {
        options: {
            labels     : ['Progres'],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
        },
        series : [value],
    };

    return (
        <div className="radialbar">
            <Chart options={state.options} series={state.series} type="radialBar"/>
        </div>
    );
}

export default RadialBar;