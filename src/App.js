import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Col, Row, Container
} from 'react-bootstrap';
import Waitingroom from './components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';



function App() {
  const [conn, setConnection] = useState();

  const joinChatRoom = async (username, chatroom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5237/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("ReceiveMessage", (username, msg) => {
        console.log(" msg: ", msg);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(conn);
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>Welcome to the F1 ChatApp</h1>
            </Col>
          </Row>
          <Waitingroom joinChatRoom={joinChatRoom} />
        </Container>
      </main>
    </div>
  );
}

export default App;