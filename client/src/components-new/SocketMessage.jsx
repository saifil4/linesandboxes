import React, { useEffect, useState } from 'react';
import { connect } from 'socket.io-client';
import { Input, Button } from '@chakra-ui/react'


const socket = connect('http://localhost:8080')

const SocketMessage = () => {

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        setMessages([...messages, text])
        socket.emit('send_message', { message: text })
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMessages(prev => [...prev, data.message])
        })
    }, [])

    return (
        <div>

            <form onSubmit={sendMessage}>
                <Button variant="outline" onClick={sendMessage}>Create Game</Button>
            </form>

            <form onSubmit={sendMessage}>
                <Input type='text' value={text} onChange={(e) => setText(e.target.value)} />
                <Button onClick={sendMessage}>Send</Button>
            </form>
            <div>
                {
                    messages.map(m => (
                        <div>{m}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default SocketMessage