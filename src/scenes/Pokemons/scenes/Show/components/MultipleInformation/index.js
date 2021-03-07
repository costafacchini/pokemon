import React from 'react'
import styles from '../../style.css'

export default function MultipleInformation({ title, collection }) {
  return (
    <div>
      <div className='title-info' style={styles.titleInfo}>{title.toUpperCase()}</div>
      {collection.map(information => (
        <span key={information} className='badge hability-info' style={styles.habilityInfo}>{information}</span>
      ))}
    </div>
  )
}

