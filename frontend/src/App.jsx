import './App.css'
import Option from './components/Option'
import { useState, useEffect } from 'react'
import {socket} from './socket'


function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [poll, setPoll] = useState();
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onDefault(value) {
      setPoll(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('default', onDefault);

    socket.connect();
    console.log(1)
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('default', onDefault);
    };


  }, []);
  return (
    <>

        

        {poll && 
          <>
            <h1>{poll.question}</h1>
            {poll.options.map((option, index) => (
              <Option key={index} info={option} />
            ))}
          </>
        }
    </>
  )
}

export default App
