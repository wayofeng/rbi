import React, { Component } from 'react'
import ReportDataField from './ReportDataField'
import ReportDataModel from './ReportDataModel'
import './ReportData.scss'
class ReportData extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    return (
      <div className="data-wrap" onMouseUp={this.endMoveMeasure}>
        <ReportDataField></ReportDataField>
        <ReportDataModel></ReportDataModel>
      </div>
    )
  }
}

export default ReportData