import { Component } from 'react'

class ChartMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleDeletePanel = this.handleDeletePanel.bind(this)
  }

  handleDeletePanel() {
    const { panel } = this.props
    this.props.handleDeletePanel(panel)
  }

  render() {
    const { panel } = this.props
    const menu = <div className="chart-menu">
      <ul className="chart-menu-list">
        <li className="chart-menu-item" onClick={this.handleDeletePanel}>
          <span className="menu-title">删除</span>
        </li>
      </ul>
    </div>
    return (
      panel && panel.config.menuShow ? menu : ''
    )
  }
}

export default ChartMenu