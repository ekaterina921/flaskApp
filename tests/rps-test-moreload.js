import {sleep} from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        {duration: '5s', target: 50},
        {duration: '5s', target: 50},
        {duration: '10s', target: 500},
        {duration: '10s', target: 500},
        {duration: '10s', target: 1500},
        {duration: '10s', target: 1500}
    ],
    thresholds: {
        http_req_failed: [{threshold: 'rate<0.01', abortOnFail: true, delayAbortEval: "3s"}],
        http_req_duration: [{threshold: 'med < 100', abortOnFail: true, delayAbortEval: "3s"}]
    },
};

export default () => {
    http.get('http://localhost:5000/index');
    sleep(Math.random() * 5);
};