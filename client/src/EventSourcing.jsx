import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [username, setUsername] = useState('Anon');
    const [usernameDisabled, setUsernameDisabled] = useState(true);

    useEffect(() => {
        subscribe();
    }, []);

    const subscribe = async () => {
        const eventSource = new EventSource(`http://localhost:5000/connect`);
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data);
            setMessages((prev) => [message, ...prev]);
        };
    };

    const changeUsername = () => {
        if (usernameDisabled) {
            setUsernameDisabled(false);
        } else {
            if (username !== '') {
                setUsernameDisabled(true);
            }
        }
    };

    const sendMessage = async () => {
        if (value) {
            await axios.post('http://localhost:5000/new-messages', {
                message: value,
                id: Date.now(),
                user: username,
            });
        }
    };

    return (
        <div className={'center'}>
            <h1>Event sourcing</h1>
            <div>
                <div className={'form'}>
                    <label htmlFor={'usernameInput'}>Username:</label>
                    <div className={'usernameContainer'}>
                        <input
                            id={'usernameInput'}
                            type={'text'}
                            value={username}
                            disabled={usernameDisabled}
                            onChange={(e) => setUsername(e.target.value.trim())}
                        />
                        <button type={'button'} onClick={changeUsername}>
                            {usernameDisabled ? 'Change' : 'Apply'}
                        </button>
                    </div>
                    <label htmlFor={'messageInput'}>New message:</label>
                    <input
                        id={'messageInput'}
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value.trim())}
                    />
                    <button type={'button'} onClick={sendMessage} disabled={!usernameDisabled}>
                        Send message
                    </button>
                </div>
                <div className={'messages'}>
                    {messages.map((mes) => (
                        <div key={mes.id} className={'message'}>
                            {`${mes.user} (${mes.time}): ${mes.message}`}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventSourcing;
