import React, { Component } from 'react'
import _ from 'lodash'
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
      panelList: this.getPanelListFromStroage()
    }
    this.addPanel = this.addPanel.bind(this)
    this.changePanel = this.changePanel.bind(this)
    this.deletePanel = this.deletePanel.bind(this)
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
  addPanel(panel) {
    panel.id = _.uniqueId('panel')
    this.setState((state) => {
      const { panelList } = state
      const newPanelList = [...panelList, panel]
      return Object.assign({}, state, { panelList: newPanelList })
    })
  }

  // 删除组件
  deletePanel(panel) {
    this.setState((state) => {
      const { panelList } = state
      const newPanelList = panelList.filter(item => item.id !== panel.id)
      return Object.assign({}, state, { panelList: newPanelList })
    })
  }

  // 修改组件
  changePanel(panel, path, value) {
    const newPanel = this.setPanel(panel.id, path, value)
    this.setState((state) => {
      const { panelList } = state
      const newPanelList = panelList.map(item => item.id === newPanel.id ? newPanel : item)
      return Object.assign({}, state, { panelList: newPanelList })
    })
  }

  // 修改panel属性
  setPanel(id, path, value) {
    const panel = this.getPanel(id)
    return _.set(panel, path, value)
  }

  // 查找组件
  getPanel(id) {
    return this.state.panelList.find(item => item.id === id)
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
                handleDeletePanel={this.deletePanel}
                handleChangePanel={this.changePanel}></ReportContent>
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