import React, { Component } from 'react'
import { Select, Input } from 'antd'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const { Option } = Select
const { Search } = Input

let oldClientY = 0
let fieldWrapHeight = 0
const fieldList = {
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

const fieldTypeIconMap = {
  string: 'iconField-String',
  number: 'iconshuzi1'
}

class ReportDataField extends Component {
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
      fieldList: fieldList,
      isStartMoveMeasure: false,
      isMoveMeasure: false,
      measureFieldTop: '50%',
      dimensionFieldHeight: 0,
      measureFieldHeight: 0
    }
    this.onModelChange = this.onModelChange.bind(this)
    this.onModelSearch = this.onModelSearch.bind(this)
    this.moveMeasureField = this.moveMeasureField.bind(this)
    this.startMoveMeasure = this.startMoveMeasure.bind(this)
    this.endMoveMeasure = this.endMoveMeasure.bind(this)
    this.onFieldSearch = this.onFieldSearch.bind(this)

    this.fieldRef = React.createRef()
    this.measureFieldRef = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      const fieldWrap = this.fieldRef.current
      fieldWrapHeight = fieldWrap.getBoundingClientRect().height
      this.setState({
        measureFieldTop: fieldWrapHeight / 2,
        dimensionFieldHeight: fieldWrapHeight / 2,
        measureFieldHeight: fieldWrapHeight / 2
      })
    }, 0);

  }

  onModelChange(value) { }

  onModelSearch(value) { }

  onFieldSearch(value) {
    const filterFields = (list, val) => list.filter(item => item.comment.indexOf(val) > -1)
    const newFieldList = {
      dimension: filterFields(fieldList.dimension, value),
      measure: filterFields(fieldList.measure, value)
    }
    this.setState({
      fieldList: newFieldList
    })
  }

  startMoveMeasure() {
    this.setState({
      isStartMoveMeasure: true
    })
  }

  moveMeasureField(e) {
    const { isStartMoveMeasure, isMoveMeasure } = this.state
    if (isStartMoveMeasure && !isMoveMeasure) {
      this.setState({
        isMoveMeasure: true,
        isStartMoveMeasure: false
      })
    } else if (isMoveMeasure) {
      const distance = e.clientY - oldClientY
      this.setState(state => {
        const { measureFieldTop } = state
        const newMeasureFieldTop = measureFieldTop >= 0 ? measureFieldTop + distance : 0
        return {
          measureFieldTop: newMeasureFieldTop,
          measureFieldHeight: fieldWrapHeight - newMeasureFieldTop,
          dimensionFieldHeight: newMeasureFieldTop
        }
      })
    }
    oldClientY = e.clientY
  }

  endMoveMeasure() {
    if (this.state.isMoveMeasure) {
      this.setState({
        isMoveMeasure: false,
        isStartMoveMeasure: false
      })
    }
  }

  render() {
    const { dataModelList, fieldList, fieldPanel, measureFieldTop, dimensionFieldHeight, measureFieldHeight } = this.state
    const { dimension, measure } = fieldList
    const { dimensionExpand, measureExpand } = fieldPanel
    const dataModelItems = dataModelList.map(item => (
      <Option value={item.value} key={item.value}>{item.title}</Option>
    ))

    const fieldItems = (fields, id) => (
      <Droppable droppableId={id}>
        {provided =>
          <div className="field-items" ref={provided.innerRef} >
            {fields.map((field, index) =>
                <Draggable draggableId={field.alias} index={index} key={field.alias}>
                  {(provided) => {
                    const classNameList = `iconfont ${fieldTypeIconMap[field.type] || fieldTypeIconMap.string}`
                    return (<div className="field-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <i className={classNameList}></i>
                      <span className="field-title">{field.comment}</span>
                    </div>)
                  }}
                </Draggable>
              )}
              {provided.placeholder}
          </div>
        }
      </Droppable>
    )

    const emptyData = (
      <div className="empty-data">暂无数据</div>
    )
    return (
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
        <div className="data-model-body" ref={this.fieldRef}>
          <div className="dimension-field" style={{ height: dimensionFieldHeight }}>
            <div className="field-group-title">
              <div className="group-title">
                {dimensionExpand ? <i className="iconfont iconarrow-down"></i> :
                  <i className="iconfont iconarrow-top"></i>} 维度
                </div>
            </div>
            <div className="field-item-wrap">
              {dimension.length ? fieldItems(dimension, 'dimension') : emptyData}
            </div>
          </div>
          <div className="measure-field" style={{ top: measureFieldTop, height: measureFieldHeight }} ref={this.measureFieldRef}>
            <div className="field-group-title">
              <div className="group-title">
                {measureExpand ? <i className="iconfont iconarrow-down"></i> :
                  <i className="iconfont iconarrow-top"></i>} 度量
                </div>
              <i className="iconfont bar iconmenucaidan"
                onMouseDown={this.startMoveMeasure}
                onMouseMove={e => this.moveMeasureField(e)}></i>
            </div>
            <div className="field-item-wrap">
              {/* <DragDropContext>
                {measure.length ? fieldItems(measure) : emptyData}
              </DragDropContext> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReportDataField