import { Component } from 'react'
import ChartMenu from './ChartMenu'

import './ChartPanel.scss'

class ChartPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClickActionBtn = this.handleClickActionBtn.bind(this)
    this.handleShowMenu = this.handleShowMenu.bind(this)
    this.handleHideMenu = this.handleHideMenu.bind(this)
    this.handleDeletePanel = this.handleDeletePanel.bind(this)
  }

  // 显示面板菜单
  handleShowMenu() {
    this.props.handleShowMenu(this.props.panel)
  }

  // 隐藏面板菜单
  handleHideMenu() {
    this.props.handleHideMenu(this.props.panel)
  }

  // 点击面板操作按钮
  handleClickActionBtn(e) {
    e.stopPropagation()
    const { panel } = this.props
    const menuShow = panel.config.menuShow
    menuShow ? this.handleHideMenu() : this.handleShowMenu()
  }

  handleDeletePanel(panel) {
    this.props.handleDeletePanel(panel)
    console.log(panel.id)
  }

  render() {
    const { panel } = this.props
    return (
      <div className="chart-panel">
        <div className="action-btn" onClick={this.handleClickActionBtn}>
          <i className="iconfont iconmoreif"></i>
        </div>
        <ChartMenu panel={panel} handleDeletePanel={this.handleDeletePanel}></ChartMenu>
        <div className="panel-content">{panel.id}</div>
      </div>
    )
  }
}

export default ChartPanel