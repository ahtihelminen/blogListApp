import React from 'react'

const one = ({ value }) => {
  return <h1 style={{textAlign: "center"}}>{value}</h1>
}

const two = ({ value }) => {
  return <h2 style={{textAlign: "center"}}>{value}</h2>
}

const three = ({ value }) => {
  return <h3>{value}</h3>
}

export default { one, two, three }
