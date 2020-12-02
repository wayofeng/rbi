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
    this.addPanel = this.addPanel.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
  }

  addPanel(e, item) {
    e.stopPropagation()
    this.props.handleAddPanel(item)
  }

  handleDragStart (e, item) {
    e.dataTransfer.setData('panel', JSON.stringify(item))
    e.dataTransfer.dropEffect = 'copy'
  }

  render() {
    const getComponentItems = (list) => {
      return list.map(item => {
        const classNameList = `iconfont ${item.config.icon}`
        return (<li
          className="component-item"
          key={item.config.component}
          onClick={e => this.addPanel(e, item)}
          draggable={true}
          onDragStart={e => this.handleDragStart(e, item)}>
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