import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeMessage,connectSocket, loginSocket } from "../../slice/aplication";

import "./styles.scss"

export default (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(connectSocket())
  }, [])
  const [name, setName] = useState("")
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleSubmit = () => {
    dispatch(loginSocket(name))
    props.history.push("/home")
  }
  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <div className="login-title">
          Please input your name
        </div>
        <div className="login-input-container">
          <input type="text" value={name} onChange={handleNameChange}/>
        </div>
        <div>
          <button onClick={handleSubmit}>OK</button>
        </div>
      </div>
    </div>
  )
}
