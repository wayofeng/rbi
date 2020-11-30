import React, { Component } from 'react'
import { Button, Space } from 'antd'
import './ReportHeader.scss'

class ReportHeader extends Component {

  render() {
    return (
      <div className="report-header">
        <div className="report-name">
          未命名报表
        </div>
        <div className="report-action">
          <Space>
            <Button type="primary" shape="round">保存</Button>
            <Button type="primary" shape="round">发布</Button>
          </Space>
        </div>
      </div>
    )
  }
}

export default ReportHeader