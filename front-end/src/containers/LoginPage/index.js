import React from 'react'

export default (props) => {
  return (
    <div>
      This is Login page
      <button onClick={() => props.history.push("/home")}> login </button>
    </div>
  )
}
