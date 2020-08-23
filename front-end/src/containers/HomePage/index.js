import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeMessage, fetchAPI } from "../../slice/aplication";

export default (props) => {
  const dispatch = useDispatch();
  const applicationState = useSelector(state => state.application);
  return (
    <div>
      This is Home Page
      <div>
        {applicationState.message}
      </div>
      <div>
        {applicationState.list.map(v => {
          return <div key={v}>{v}</div>
        })}
      </div>
      <button onClick={() => dispatch(fetchAPI())}>update</button>
    </div>
  )
}
