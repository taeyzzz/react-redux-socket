import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeMessage, fetchAPI , sendMessageSocket} from "../../slice/aplication";

export default (props) => {
  const dispatch = useDispatch();
  const applicationState = useSelector(state => state.application);
  const [chatText, setChatText] = useState("")
  useEffect(() => {
    if(!applicationState.socketConnected){
      props.history.push("/login")
    }
  }, [])

  const handleInputChatChanged = (e) => {
    setChatText(e.target.value)
  }

  const handleSubmitSendClicked = () => {
    dispatch(sendMessageSocket(chatText))
    setChatText("")
  }

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
      <div>
        List User:
        <div>
          {applicationState.listUser.map(user => <div>{user}</div>)}
        </div>
      </div>
      <div>
        Chat:
        <div>
          {applicationState.listChat.map(data => <div>{data.message}: {data.author}</div>)}
        </div>
      </div>
      <div>
        <input type="text" onChange={handleInputChatChanged} value={chatText}/>
        <div>
          <button onClick={handleSubmitSendClicked}>Send</button>
        </div>
      </div>
      <button onClick={() => dispatch(fetchAPI())}>update</button>
    </div>
  )
}
