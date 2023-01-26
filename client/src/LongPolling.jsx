import { useEffect, useState } from 'react';
import axios from 'axios';

const LongPolling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

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

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now(),
        });
    };

    return (
        <div className={'center'}>
            <h1>Long polling</h1>
            <div>
                <div className={'form'}>
                    <input
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
                        <div key={mes.id} className={'message'}>
                            {mes.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LongPolling;
