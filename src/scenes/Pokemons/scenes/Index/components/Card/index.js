import React from 'react'
import Hability from '../Hability'

export default function Card({ pokemon }) {
  const { images, name, number, abilities } = pokemon

  return (
    <div className="col mt-4">
      <div className='card shadow-sm border-0 rounded'>
        <div className='card-body p-0'>
          <a href={`#/pokemon/${name.toLowerCase()}`}>
            <img className='card-img-top w-80 img-thumbnail' src={images.original} alt="" />
          </a>
          <div className="p-3">
            <h5 className="mb-0">{name}</h5>
            <p className="small text-muted">{number}</p>
            <ul className="social mb-0 list-inline mt-3">
              {abilities && abilities.map((hability, index) => (
                <li key={name + index} className="list-inline-item m-0">
                  <Hability hability={hability} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}