import React, { Component } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import ChartPanel from './ChartPanel'

import './ReportContent.scss'

const ResponsiveGridLayout = WidthProvider(Responsive)

class ReportContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleDragStop = this.handleDragStop.bind(this)
    this.handleResizeStop = this.handleResizeStop.bind(this)
    this.handleClickPanel = this.handleClickPanel.bind(this)
    this.handleShowMenu = this.handleShowMenu.bind(this)
    this.handleHideMenu = this.handleHideMenu.bind(this)
    this.handleDeletePanel = this.handleDeletePanel.bind(this)
  }

  // 结束拖拽移动面板
  handleDragStop(dataGrids, oldDataGrid, newDataGrid) {
    const panel = this.props.panelList.find(item => item.id === newDataGrid.i)
    this.props.handleChangePanel(panel, 'config.dataGrid', newDataGrid)
  }

  // 结束拖拽缩放面板
  handleResizeStop(dataGrids, oldDataGrid, newDataGrid) {
    const panel = this.props.panelList.find(item => item.id === newDataGrid.i)
    this.props.handleChangePanel(panel, 'config.dataGrid', newDataGrid)
  }

  // 点击面板
  handleClickPanel(e, panel) {
    e.stopPropagation()
    this.props.handleInActivePanel()
    this.props.handleActivePanel(panel)
  }

  // 显示面板菜单
  handleShowMenu(panel) {
    this.props.handleShowMenu(panel)
  }

  // 隐藏面板菜单
  handleHideMenu(panel) {
    this.props.handleHideMenu(panel)
  }

  // 删除面板
  handleDeletePanel (panel) {
    this.props.handleDeletePanel(panel)
  }

  // 点击画布区域
  handleClickContent (e) {
    e.stopPropagation()
    this.props.handleClickContent()
  }

  render() {
    const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
    const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }

    const { panelList } = this.props

    const panelItems = panelList.map(panel => {
      const panelItemClassName = `panel-item ${panel.config.active ? 'active' : ''}`
      return (
        <div key={panel.id} data-grid={panel.config.dataGrid} className={panelItemClassName} onClick={(e) => this.handleClickPanel(e, panel)}>
          <ChartPanel
            panel={panel}
            handleDeletePanel={this.handleDeletePanel}
            handleShowMenu={this.handleShowMenu}
            handleHideMenu={this.handleHideMenu}></ChartPanel>
        </div>
      )
    })
    return (
      <div className="report-content" onClick={(e) => this.handleClickContent(e)}>
        <ResponsiveGridLayout
          onDragStop={this.handleDragStop}
          onResizeStop={this.handleResizeStop}
          className="layout"
          rowHeight={30}
          breakpoints={breakpoints}
          cols={cols}>
          {panelItems}
        </ResponsiveGridLayout>
      </div>
    )
  }
}

export default ReportContent