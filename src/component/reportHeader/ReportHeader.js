import React, { Component } from 'react'
import { Button, Space, Radio } from 'antd'
import './ReportHeader.scss'

class ReportHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.switchEditOrPreview = this.switchEditOrPreview.bind(this)
  }

  // 切换报表为编辑或预览
  switchEditOrPreview (e) {
    this.props.switchEditOrPreview(e.target.value)
  }

  render() {
    return (
      <div className="report-header">
        <div className="report-name">
          报表设计器
        </div>
        <div className="report-action">
          <Space size="middle">
            <Radio.Group defaultValue="edit" onChange={this.switchEditOrPreview} size="small">
              <Radio.Button value="edit">编辑</Radio.Button>
              <Radio.Button value="preview">预览</Radio.Button>
            </Radio.Group>
            <Button className="report-action-btn" type="primary" size="small">保存</Button>
            <Button className="report-action-btn" type="primary" size="small">导出</Button>
          </Space>
        </div>
      </div>
    )
  }
}

export default ReportHeader