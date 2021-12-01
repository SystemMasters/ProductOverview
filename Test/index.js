// eslint-disable-next-line import/no-unresolved
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '2m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '2m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '2m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

// const test = () => {
//   // http.get('http://localhost:3001/products?count=10&page=2000');
//   http.get('http://localhost:3001/products/10000/styles');
//   // http.get('http://localhost:3001/products/10000');
//   // http.get('http://localhost:3001/10000/related');
// };

// export default test;

export default function () {
  const BASE_URL = 'http://localhost:3001'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/products/272010/styles`],
    ['GET', `${BASE_URL}/products?count=1&page=272010`],
    ['GET', `${BASE_URL}/products/272010/related`],
    ['GET', `${BASE_URL}/products/272010`],
  ]);

  sleep(1);
}
