import { useRef, useState } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [username, setUsername] = useState('');

    const socket = useRef();
    const [isConnected, setIsConnected] = useState(false);

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            console.log('Connection established');
            setIsConnected(true);
            const message = {
                event: 'connection',
                username,
                id: Date.now(),
            };
            socket.current.send(JSON.stringify(message));
        };

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prev) => [message, ...prev]);
        };

        socket.current.onclose = () => {
            console.log('Socket closed');
        };

        socket.current.onerror = () => {
            console.log('Socket has an error');
        };
    };

    const sendMessage = async () => {
        if (value) {
            const message = {
                event: 'message',
                username,
                message: value,
                id: Date.now(),
            };

            socket.current.send(JSON.stringify(message));
            setValue('');
        }
    };

    if (!isConnected) {
        return (
            <div className={'center'}>
                <h1>WebSocket</h1>
                <div className={'form'}>
                    <input
                        type={'text'}
                        placeholder={'Type your name'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value.trim())}
                    />
                    <button onClick={connect}>Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className={'center'}>
            <h1>WebSocket</h1>
            <div>
                <div className={'form'}>
                    <label htmlFor={'messageInput'}>{`New message (${username}):`}</label>
                    <input
                        id={'messageInput'}
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value.trim())}
                    />
                    <button type={'button'} onClick={sendMessage}>
                        Send message
                    </button>
                </div>
                <div className={'messages'}>
                    {messages.map((mes) => (
                        <div key={mes.id}>
                            {mes.event === 'connection' ? (
                                <div
                                    className={'connection_message'}
                                >{`User ${username} connected`}</div>
                            ) : (
                                <div
                                    className={'message'}
                                >{`${mes.username} (${mes.time}): ${mes.message}`}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WebSocketComponent;
