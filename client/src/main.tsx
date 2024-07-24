import '@mantine/core/styles.css';
import './index.scss';
import 'moment/dist/locale/ru';

import moment from 'moment';
import ReactDOM from 'react-dom/client';

import App from './App';

moment.locale('ru');

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
