import React from 'react'

const one = ({ value }) => {
  return <h1>{value}</h1>
}

const two = ({ value }) => {
  return <h2>{value}</h2>
}

const three = ({ value }) => {
  return <h3>{value}</h3>
}

export default { one, two, three }
