import React, { Component } from 'react'
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout'
import ChartPanel from './ChartPanel'

import './ReportContent.scss'

import panelListDefault from '../../mock/panelList.json'

const ResponsiveGridLayout = WidthProvider(Responsive)

class ReportContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelList: []
    }
    this.handleDrag = this.handleDrag.bind(this)
  }

  componentDidMount() {
    const panelList = this.getPanelListFromStroage() || panelListDefault
    this.setPanelList(panelList)
    this.savePanelListToStroage()
  }

  componentDidUpdate() {
    this.savePanelListToStroage()
  }

  setPanelList(panelList) {
    this.setState((state) => {
      return { ...state, panelList }
    })
  }

  savePanelListToStroage() {
    localStorage.setItem('panelList', JSON.stringify(this.state.panelList))
  }

  getPanelListFromStroage() {
    const panelListStr = localStorage.getItem('panelList')
    return !panelListStr ? '' : JSON.parse(panelListStr)
  }

  handleDrag(dataGrids) {
    const { panelList } = this.state 
    const newPanelList = dataGrids.map(dataGrid => {
      const oldPanel = panelList.find(val => val.id === dataGrid.i)
      oldPanel.config.dataGrid = dataGrid
      return oldPanel
    })
    this.setPanelList(newPanelList)
  }

  render() {
    const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
    const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }

    const { panelList } = this.state

    const panelItems = panelList.map(panel =>
      <div key={panel.id} data-grid={panel.config.dataGrid}>
        <ChartPanel></ChartPanel>
      </div>
    )
    return (
      <div className="report-content">
        <ResponsiveGridLayout onDragStop={this.handleDrag} className="layout" rowHeight={30} breakpoints={breakpoints} cols={cols}>
          {panelItems}
        </ResponsiveGridLayout>
      </div>
    )
  }
}

export default ReportContent