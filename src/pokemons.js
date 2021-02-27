import React from 'react'

function PokemonsIndex() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img className="navbar-brand" src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt=""/>
        </a>
      </nav>
      <div className='row'>
        <div className='col-36 col-sm-18 col-md-15 col-lg-12 col-xl-10'>
          <div className='input-group'>
            <input
              className='form-control'
              name='expression'
              type='text'
              placeholder='Busque por nome ou número'
            />
            <div className='input-group-append'>
              <button
                type='button'
                className='btn btn-default'
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className='row'>
          <div className='col-36'>
            <div className='table-responsive'>
              <table className={`table table-hover table-fixed-header`}>
                <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Número</th>
                  <th>Habilidades</th>
                </tr>
                </thead>
                <tbody>                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PokemonsIndex