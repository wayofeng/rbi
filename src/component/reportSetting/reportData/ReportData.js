import { Component } from 'react'
import { Select, Input } from 'antd'
import './ReportData.scss'

const { Option } = Select
const { Search } = Input

const fieldTypeIconMap = {
  string: 'iconField-String',
  number: 'iconshuzi1'
}

class ReportData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldPanel: {
        dimensionExpand: true,
        measureExpand: true,
        measureTop: -1
      },
      dataModelList: [
        {
          title: '示例模型1',
          value: 'model1'
        },
        {
          title: '示例模型2',
          value: 'model2'
        },
        {
          title: '示例模型3',
          value: 'model3'
        },
        {
          title: '示例模型4',
          value: 'model4'
        },
        {
          title: '示例模型5',
          value: 'model5'
        }
      ],
      fieldList: {
        dimension: [
          {
            alias: 'field1',
            comment: '维度字段1',
            type: 'string'
          },
          {
            alias: 'field2',
            comment: '维度字段2',
            type: 'string'
          },
          {
            alias: 'field3',
            comment: '维度字段3',
            type: 'string'
          },
          {
            alias: 'field4',
            comment: '维度字段4',
            type: 'string'
          },
          {
            alias: 'field5',
            comment: '维度字段5',
            type: 'string'
          },
          {
            alias: 'field11',
            comment: '维度字段1',
            type: 'string'
          },
          {
            alias: 'field21',
            comment: '维度字段2',
            type: 'string'
          },
          {
            alias: 'field31',
            comment: '维度字段3',
            type: 'string'
          },
          {
            alias: 'field41',
            comment: '维度字段4',
            type: 'string'
          },
          {
            alias: 'field51',
            comment: '维度字段5',
            type: 'string'
          }
        ],
        measure: [
          {
            alias: 'field1',
            comment: '维度字段1',
            type: 'number'
          },
          {
            alias: 'field2',
            comment: '维度字段2',
            type: 'number'
          },
          {
            alias: 'field3',
            comment: '维度字段3',
            type: 'number'
          },
          {
            alias: 'field4',
            comment: '维度字段4',
            type: 'number'
          },
          {
            alias: 'field5',
            comment: '维度字段5',
            type: 'number'
          },
          {
            alias: 'field6',
            comment: '维度字段6',
            type: 'number'
          },
          {
            alias: 'field31',
            comment: '维度字段31',
            type: 'number'
          },
          {
            alias: 'field41',
            comment: '维度字段41',
            type: 'number'
          },
          {
            alias: 'field51',
            comment: '维度字段51',
            type: 'number'
          },
          {
            alias: 'field61',
            comment: '维度字段61',
            type: 'number'
          }
        ]
      }
    }
    this.onModelChange = this.onModelChange.bind(this)
    this.onModelSearch = this.onModelSearch.bind(this)
    this.moveMeasureField = this.moveMeasureField.bind(this)
  }

  onModelChange(value) { }

  onModelSearch(value) { }

  onFieldSearch(value) { }

  moveMeasureField (e) {
    console.log(e)
  }

  render() {
    const { dataModelList, fieldList, fieldPanel } = this.state
    const { dimension, measure } = fieldList
    const { dimensionExpand, measureExpand } = fieldPanel
    const dataModelItems = dataModelList.map(item => (
      <Option value={item.value} key={item.value}>{item.title}</Option>
    ))
    const fieldItems = (fields) => {
      return fields.map(field => {
        const classNameList = `iconfont ${fieldTypeIconMap[field.type] || fieldTypeIconMap.string}`
        return (<div className="field-item" key={field.alias}>
          <i className={classNameList}></i>
          <span className="field-title">{field.comment}</span>
        </div>)
      })
    }
    return (
      <div className="data-wrap">
        <div className="data-panel"></div>
        <div className="data-model">
          <div className="data-model-header">
            <Select
              showSearch
              style={{ width: 180, marginBottom: 10 }}
              size="small"
              placeholder="请选择模型"
              optionFilterProp="children"
              onChange={this.onChange}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {dataModelItems}
            </Select>
            <Search placeholder="请输入关键字搜索" size="small" onSearch={this.onFieldSearch} style={{ width: 180 }} />
          </div>
          <div className="data-model-body">
            <div className="dimension-field">
              <div className="field-group-title">
                <div className="group-title">
                  {dimensionExpand ? <i className="iconfont iconarrow-down"></i> :
                    <i className="iconfont iconarrow-top"></i>} 维度
                </div>
              </div>
              <div className="field-item-wrap">
                {fieldItems(dimension)}
              </div>
            </div>
            <div className="measure-field">
              <div className="field-group-title" onMouseMove={e => this.moveMeasureField(e)}>
                <div className="group-title">
                  {measureExpand ? <i className="iconfont iconarrow-down"></i> :
                    <i className="iconfont iconarrow-top"></i>} 度量
                </div>
                <i className="iconfont bar iconmenucaidan"></i>
              </div>
              <div className="field-item-wrap">
                {fieldItems(measure)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReportData