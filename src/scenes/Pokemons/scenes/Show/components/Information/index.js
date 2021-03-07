import React from 'react'
import styles from '../../style.css'

export default function Information({ title, value }) {
  return (
    <div>
      <div className='title-info' style={styles.titleInfo}>{title.toUpperCase()}</div>
      <div className='value-info' style={styles.valueInfo}>{value}</div>
    </div>
  )
}

