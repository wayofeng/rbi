import React, { Component } from 'react'
import { Layout } from 'antd'
import ReactHeader from './reportHeader/ReportHeader'
import ReportComponent from './reportComponent/ReportComponent'
import ReportContent from './reportContent/ReportContent'
import ReportSetting from './reportSetting/ReportSetting'

import './Report.scss'
const { Header, Sider, Content } = Layout

class Report extends Component {

  render () {
    return (
      <div className="report">
        <Layout className="report-layout">
          <Header style={{ height: '50px', lineHeight: '50px' }} theme="light">
            <ReactHeader></ReactHeader>
          </Header>
          <Layout>
            <Content>
              <ReportComponent></ReportComponent>
              <ReportContent></ReportContent>
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