import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const LongPolling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [username, setUsername] = useState('Anon');
    const [usernameDisabled, setUsernameDisabled] = useState(true);

    useEffect(() => {
        subscribe();
    }, []);

    const subscribe = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/get-messages');
            setMessages((prev) => [data, ...prev]);
            await subscribe();
        } catch (e) {
            setTimeout(() => {
                subscribe();
            }, 500);
        }
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

    const sendMessage = useCallback(async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now(),
            user: username,
        });
        console.log('sended');
    }, [value, username]);

    return (
        <div className={'center'}>
            <h1>Long polling</h1>
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

export default LongPolling;
