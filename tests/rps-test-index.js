import {sleep} from 'k6';
import http from 'k6/http';

export const options = {
    scenarios: {
            low: {
            executor: 'constant-arrival-rate',
            rate: 350,
            duration: '60s',
            preAllocatedVUs: 100,
            maxVUs: 3000,
            timeUnit: '1s',
        }
    },
    thresholds: {
        http_req_failed: [{threshold: 'rate<0.01', abortOnFail: true, delayAbortEval: "3s"}],
        http_req_duration: [{threshold: 'med < 100', abortOnFail: true, delayAbortEval: "3s"}]
    },
};

export default () => {
    http.get('http://localhost:5000/index');
    sleep(Math.random() * 5);
};