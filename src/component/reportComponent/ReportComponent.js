import React, { Component } from 'react'
import { Tooltip } from 'antd'


import './reportComponent.scss'
import panelListDefault from '../../mock/panelList.json'

class ReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentList: panelListDefault
    }
  }

  render() {
    function getComponentItems(list) {
      return list.map(item => {
        const classNameList = `iconfont ${item.config.icon}`
        return (<li className="component-item">
          <Tooltip title={item.config.componentName}>
            <i class="iconfont" className={classNameList}></i>
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