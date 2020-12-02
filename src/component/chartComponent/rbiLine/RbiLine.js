import { Component } from 'react'
import { LineChart } from 'bizcharts';

import './RbiLine.scss'

class RbiLine extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { title, data } = this.props.panel.config
    let xField = null
    let yField = null
    if (data && Array.isArray(data) && data.length) {
      const dataItem = data[0]
      const keys = Object.keys(dataItem)
      xField = keys[0]
      yField = keys[1]
    }
    return (
      <div className="rbi-line">
        <LineChart
          data={data}
          forceFit={true}
          title={{
            visible: true,
            text: title,
          }}
          xField={xField}
          yField={yField}
        />
      </div>
    )
  }
}

export default RbiLine