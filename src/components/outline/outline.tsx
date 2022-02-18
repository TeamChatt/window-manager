import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import styles from './outline.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

// eslint-disable-next-line react/display-name
export const Outline = forwardRef(({ animate, rect }, ref) => {
  const style = {
    top:    rect.top,
    left:   rect.left,
    bottom: rect.bottom,
    right:  rect.right,
  }
  const className = cx('outline', {
    'outline--animate': animate,
  })
  return (
    <div ref={ref} className={className} style={style} />
  )
})
Outline.propTypes = {
  animate: PropTypes.bool,
  rect: PropTypes.shape({
    top:     PropTypes.number.isRequired,
    left:    PropTypes.number.isRequired,
    bottom:  PropTypes.number.isRequired,
    right:   PropTypes.number.isRequired,
  }).isRequired,
}