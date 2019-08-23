import React, { Component } from 'react';
import API from "../../utils/API";
import { Bar } from 'react-chartjs-2';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Cars Parked by Day',
                    data: [],
                    backgroundColor: [
                        'rgb(17, 180, 134)',
                        'rgb(17, 180, 134)',
                        'rgb(17, 180, 134)',
                        'rgb(17, 180, 134)',
                        'rgb(17, 180, 134)'
                    ]

                }]
            }

        }
    }

    componentWillMount() {
        // console.log('Chart.componentWillMount')
        this.load()
    }

    load() {
        console.log('Chart.load')
        let from = '2019-08-19'
        let to = '2019-08-26'
        API.statsVehicle(from, to).then((response) => {
            //console.log('statsVehicle resolve' + JSON.stringify(response))
            let {data, labels} = response.data;
            let {chartData} = this.state;
            chartData.labels = labels;
            chartData.datasets[0].data = data;
            this.setState({chartData})
        })
    }

    render() {
        return (
            <div className='chart'>
                <Bar
                    data={this.state.chartData}
                    width={100}
                    height={50}
                    options={{
                        title: {
                            display: true,
                            text: 'Daily Report',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;


