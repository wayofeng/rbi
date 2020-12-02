import React, { Component } from 'react'
import _ from 'lodash'
import UUID from 'uuidjs'
import { Layout } from 'antd'
import ReactHeader from './reportHeader/ReportHeader'
import ReportComponent from './reportComponent/ReportComponent'
import ReportContent from './reportContent/ReportContent'
import ReportSetting from './reportSetting/ReportSetting'

import './Report.scss'
const { Header, Sider, Content } = Layout

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panelList: [],
      activePanel: null
    }
    this.addPanel = this.addPanel.bind(this)
    this.changePanelProp = this.changePanelProp.bind(this)
    this.deletePanel = this.deletePanel.bind(this)
    this.handleInActivePanel = this.handleInActivePanel.bind(this)
    this.handleActivePanel = this.handleActivePanel.bind(this)
    this.handleClickContent = this.handleClickContent.bind(this)
    this.handleShowMenu = this.handleShowMenu.bind(this)
    this.handleHideMenu = this.handleHideMenu.bind(this)
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    // this.savePanelListToStroage(this.state.panelList)
  }

  // 从stroage中获取panelList
  getPanelListFromStroage() {
    const panelListStr = localStorage.getItem('panelList')
    return !panelListStr ? [] : JSON.parse(panelListStr)
  }

  // 存储panelList到stroage中
  savePanelListToStroage(panelList) {
    localStorage.setItem('panelList', JSON.stringify(panelList || []))
  }

  // 添加组件
  addPanel(sourcePanel) {
    const y = this.computedComponentY()
    const panel = _.cloneDeep(sourcePanel) 
    panel.id = UUID.generate()
    panel.config.title = _.uniqueId('panel-') 
    panel.config.dataGrid.y = y

    const newPanelList = [...this.state.panelList, panel]
    this.setState({ panelList: newPanelList }, () => {
      this.handleInActivePanel()
      this.handleActivePanel(panel)
    })
  }

  // 计算新组件放置的位置
  computedComponentY () {
    const { panelList } = this.state
    const yList = panelList.map(panel => panel.config.dataGrid.y + panel.config.dataGrid.h)
    if (yList.length) {
      const yMax = Math.max(...yList)
      console.log(yMax)
      return Number(yMax)
    }
    return 0
  } 
  // 删除组件
  deletePanel(panel) {
    const { panelList } = this.state
    const newPanelList = panelList.filter(item => item.id !== panel.id)
    this.setState({
      panelList: newPanelList,
      activePanel: null
    })
  }

  // 更新单个组件
  updatePanelItem (newPanel) {
    const { panelList } = this.state
    const index = panelList.findIndex(item => item.id === newPanel.id)
    if (index > -1) {
      panelList.splice(index, 1, newPanel)
    }
    this.setState({
      panelList
    })
  }

  // 更新多个组件
  updatePanelList (newPanelList) {
    const { panelList } = this.state
    newPanelList.forEach(newPanel => {
      const index = panelList.findIndex(item => item.id === newPanel.id)
      if (index > -1) {
        panelList.splice(index, 1, newPanel)
      }
    })
    this.setState({
      panelList
    })
  }

  // 修改panel单个属性,返回属性修改后的panel
  changePanelProp(panel, path, value) {
    return _.set(panel, path, value)
  }

  // 修改panel多个属性, 返回属性修改后的panel
  changePanelProps (panel, pathValueMap) {
    return Object.keys(pathValueMap).reduce((newPanel, path) => {
      return this.changePanelProp(newPanel, path, pathValueMap[path])
    }, panel)
  }

  // 查找组件
  getPanelById(id) {
    return this.state.panelList.find(item => item.id === id)
  }

  // 激活面板
  handleActivePanel(panel) {
    const newPanel = this.changePanelProp(panel, 'config.active', true)
    this.updatePanelItem(newPanel)
    this.setState({
      activePanel: newPanel
    })
  }

  // 取消面板激活
  handleInActivePanel() {
    const activePanel = this.state.panelList.find(item => item.config.active)
    if (activePanel) {
      const newpPanel = this.changePanelProps(activePanel, { 'config.active': false, 'config.menuShow': false })
      this.updatePanelItem(newpPanel)
      this.setState({
        activePanel: null
      })
    }
  }

  // 显示面板菜单
  handleShowMenu (panel) {
    this.handleInActivePanel()
    this.handleActivePanel(panel)
    const newPanel = this.changePanelProp(panel, 'config.menuShow', true)
    this.updatePanelItem(newPanel)
  }

  // 隐藏面板菜单
  handleHideMenu (panel) {
    const newPanel = this.changePanelProp(panel, 'config.menuShow', false)
    this.updatePanelItem(newPanel)
  }

  // 点击画布区域
  handleClickContent () {
    this.handleInActivePanel()
  }

  render() {
    const { panelList } = this.state
    return (
      <div className="report">
        <Layout className="report-layout">
          <Header style={{ height: '50px', lineHeight: '50px' }} theme="light">
            <ReactHeader></ReactHeader>
          </Header>
          <Layout>
            <Content>
              <ReportComponent handleAddPanel={this.addPanel}></ReportComponent>
              <ReportContent
                panelList={panelList}
                handleAddPanel={this.addPanel}
                handleActivePanel={this.handleActivePanel}
                handleInActivePanel={this.handleInActivePanel}
                handleDeletePanel={this.deletePanel}
                handleClickContent={this.handleClickContent}
                handleShowMenu={this.handleShowMenu}
                handleHideMenu={this.handleHideMenu}
                handleChangePanel={this.changePanelProp}></ReportContent>
            </Content>
            <Sider width="400" theme="light">
              <ReportSetting></ReportSetting>
            </Sider>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Report