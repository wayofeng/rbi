import React from 'react'
import { Responsive } from 'react-grid-layout'
import { withSize } from 'react-sizeme'

function ResponsiveGridLayout({ size, ...rest }) {
  return <Responsive width={size.width} {...rest}></Responsive>
}

export default withSize({monitorWidth: true})(ResponsiveGridLayout)