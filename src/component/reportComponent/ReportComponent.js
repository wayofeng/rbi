import React, { Component } from 'react'
import { Tooltip } from 'antd'


import './reportComponent.scss'
import panelListDefault from '../../mock/panelList.json'

class ReportComponent extends Component {
  constructor(props) {
    super(props);

    this.addPanel = this.addPanel.bind(this)

    this.state = {
      componentList: panelListDefault
    }

  }

  addPanel (item) {
    this.props.handleAddPanel(item)
  }

  render() {
    const getComponentItems = (list) => {
      return list.map(item => {
        const classNameList = `iconfont ${item.config.icon}`
        return (<li className="component-item" key={item.config.component} onClick={e => this.addPanel(item, e)}> 
          <Tooltip title={item.config.componentName}>
            <i className={classNameList}></i>
          </Tooltip>
        </li>)
      })
    }

    const { componentList } = this.state
    const helpList = componentList.filter(item => item.config.componentType === 'help')
    const chartList = componentList.filter(item => item.config.componentType === 'chart')
    return (
      <div className="report-component">
        <ul className="component-list help">
          {getComponentItems(helpList)}
        </ul>
        <ul className="component-list">
          {getComponentItems(chartList)}
        </ul>
      </div>
    )
  }
}

export default ReportComponent