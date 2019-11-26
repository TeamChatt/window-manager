import React from 'react'
import PropTypes from 'prop-types'

import styles from './icon.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const sizeMap = {
  s: 18,
  m: 24,
  l: 38,
  xl: 48,
}
const makeIcon = (Icon) => {
  const IconComponent = ({ size, color }) => (
    <Icon
      className={cx('icon', {
        'icon--white': color === 'white',
        'icon--black': color === 'black',
      })}
      width={sizeMap[size]}
      height={sizeMap[size]}
      viewBox="0 0 24 24"
    />
  )
  IconComponent.propTypes = {
    size:  PropTypes.oneOf(['s', 'm', 'l', 'xl']),
    color: PropTypes.oneOf(['white', 'black'])
  }
  IconComponent.defaultProps = {
    size: 'm',
    color: 'white',
  }

  return IconComponent
}

export default makeIcon
