import { useState } from 'react';
import Chart from 'react-apexcharts';

function RadialBar()
{
    const [state, setState] = useState({
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
        series : [78],
    });

    return (
        <div className="radialbar">
            <Chart options={state.options} series={state.series} type="radialBar"/>
        </div>
    );
}

export default RadialBar;