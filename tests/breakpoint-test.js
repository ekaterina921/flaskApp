import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
    scenarios: {
        main: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 100,
            maxVUs: 5000,
            stages: [
                {duration: '6m', target: 5000},
            ]
        }
        },
    thresholds: {
        http_req_failed: [{threshold: 'rate<0.01', abortOnFail: true, delayAbortEval: "3s"}],
        'http_req_duration{request_type:index}': [{threshold: 'med < 100', abortOnFail: true, delayAbortEval: "3s"}],
        'http_req_duration{request_type:moreload}': [{threshold: 'med < 500', abortOnFail: true, delayAbortEval: "3s"}]
    },
};

export default function () {
  let res;
  let url = "http://localhost:5000/";
  if (Math.random() <= 0.2) {
        res = http.get(`${url}moreload`, {
            tags: {
                request_type: "moreload"
            }
        });
    } else {
        res = http.get(`${url}index`, {
            tags: {
                request_type: "index"
            }
        });
    }
    sleep(Math.random() * 5);
}