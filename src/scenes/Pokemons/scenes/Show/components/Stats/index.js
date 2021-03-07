import React from 'react'
import Chart from 'react-google-charts'
import styles from "../../style.css";

export default function Stats({ stats }) {
  function getChartData(stats) {
    const chartData = [[
      'Poderes',
      'xp'
    ]]

    stats?.map(stat => chartData.push([ stat.name, stat.value ]))

    return chartData
  }

  return (
    <div>
      <div className='title-info' style={styles.titleInfo}>ESTATÍSTICAS</div>
      <Chart
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={getChartData(stats)}
        options={{
          width: 525,
          height: 200,
          bar: { groupWidth: '95%' },
          legend: { position: 'none' },
        }}
      />
    </div>
  )
}