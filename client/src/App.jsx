import './App.css';
import LongPolling from './LongPolling';
import EventSourcing from './EventSourcing';
import WebSocketComponent from './WebSocketComponent';

function App() {
    return (
        <div>
            {/*<LongPolling />*/}
            {/*<EventSourcing />*/}
            <WebSocketComponent />
        </div>
    );
}

export default App;
