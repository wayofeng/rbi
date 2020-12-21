import React, { Component } from 'react'
import { Button } from 'antd'

class DataField extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const DataFieldItem = (fields = []) => {
      const fieldItems = (
        <div className="df-fields-wrap">
          <div className="df-field">
            <span className="df-field-type">Str</span>
            <span className="df-tield-name">房子类型</span>
          </div>
          <div className="df-field">
            <span className="df-field-type">Str</span>
            <span className="df-tield-name">房子类型</span>
          </div>
          <div className="df-field">
            <span className="df-field-type">Str</span>
            <span className="df-tield-name">房子类型</span>
          </div>
        </div>
      )
      const fieldItemsEmpty = (
        <div className="df-fields-empty">拖动数据字段至此处</div>
      )
      return (
        <div className="data-field-item">
          <div className="df-title">
            <span className="df-categoary">类别/维度</span>
            <span className="df-addition">
              <span className="df-setting">
                <i className="iconfont iconsetting"></i>
              </span>
              <span className="df-num">1/1</span>
            </span>
          </div>
          <div className="df-fields">
            {fields.length ? fieldItems : fieldItemsEmpty}
          </div>
        </div>
      )
    }
    const DataFieldSettingMneu = () => {
      return (
        <div className="df-setting-menu"></div>
      )
    }
    return (
      <div className="data-panel">
        <div className="data-field">
          {DataFieldItem([1])}
          {DataFieldItem()}
          <div className="refresh-data">
            <Button type="primary" block>更新</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default DataField