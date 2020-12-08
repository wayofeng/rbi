import React, { Component } from 'react'
import ReportData from './reportData/ReportData'

import './ReportSetting.scss'

class ReportSetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTab: 'data'
    }
    this.handleSlider = this.handleSlider.bind(this)
  }

  handleSlider (value) {
    this.setState({
      currentTab: value
    })
  }

  render() {
    const {currentTab} = this.state
    const settingData = (
      <ReportData></ReportData>
    )
    const settingStyle = (
      <div className="report-style">
        样式
      </div>
    )
    const tabDataClassName = `settings-tab-item ${currentTab === 'data' ? 'active' : ''}`
    const tabStyleClassName = `settings-tab-item ${currentTab === 'style' ? 'active' : ''}`
    return (
      <div className="report-setting">
        <div className="report-setting-header">
          <span className="setting-title">图表设计</span>
        </div>
        <div className="report-setting-content">
          <ul className="setting-tab">
            <li className={tabDataClassName} onClick={e => this.handleSlider('data')}>数据</li>
            <li className={tabStyleClassName} onClick={e => this.handleSlider('style')}>样式</li>
          </ul>
          <div className="setting-list">
          {currentTab === "data" ? settingData : settingStyle}
          </div>
        </div>
      </div>
    )
  }
}

export default ReportSetting