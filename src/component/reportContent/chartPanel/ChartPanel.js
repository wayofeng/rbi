import { Component } from 'react'
import ChartMenu from '../chartMenu/ChartMenu'
import RbiLine from '../../chartComponent/rbiLine/RbiLine'

import './ChartPanel.scss'

const panelComponents = {
  'rbi-line': RbiLine
}
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
  }

  render() {
    const { panel } = this.props
    const PanelComponent = panelComponents[panel.config.component]

    const isActive = panel.config.active || panel.config.menuShow
    const actionBtnClassName = `action-btn ${isActive ? 'show' : ''}`
    return (
      <div className="chart-panel">
        <div className={actionBtnClassName} onClick={this.handleClickActionBtn}>
          <i className="iconfont iconmoreif"></i>
        </div>
        <ChartMenu panel={panel} handleDeletePanel={this.handleDeletePanel} handleHideMenu={this.handleHideMenu}></ChartMenu>
        <div className="panel-content">
          <PanelComponent panel={panel}></PanelComponent>
        </div>
      </div>
    )
  }
}

export default ChartPanel