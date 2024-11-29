import http from 'k6/http';
import { check, sleep, fail } from 'k6';
import { Trend } from 'k6/metrics';  // pridani metriky//
import {generateRandomText, generateRandomNr} from "./helpers/utilities.js";
import{headers, baseUrl} from "./data/constants.js";
import {createAccount, createTransaction, createPiggy, createCurrency, createCategory, bill, createBudget} from "./helpers/dataCreator.js";

const acountCreation = new Trend('waiting_time_account');
const currencyGroup = new Trend('duration_currency');
const acountGroup = new Trend('duration_accountGr');
const piggyGroup = new Trend('duration_piggy');
const transactionGroup = new Trend('duration_transactions');

export const options= {
    scenarios: {
        loadtest: {
            executor: 'constant-vus',
            exec: 'repairTest',
            vus: 1,
            duration: '20s'
        }
        // loadtest: {
        //     executor: 'constant-vus',
        //     exec: 'repairTest',
        //     vus: 5,
        //     duration: '20s'
        // }

    //     rampUpTest: {
    //         executor: 'ramping-vus',
    //         exec: 'repairTest',
    //         startVUs: 0,
    //         stages: [
    //             { duration: '3m', target: 10 },
    //             { duration: '1m', target: 15 },
    //             { duration: '3m', target: 5 },
    //         ],
    //         gracefulRampDown: '0s',
    //     }
    },
    thresholds: {
        http_req_failed: ['rate<0.005'],
        http_req_duration: ['p(95)<2000','p(90)<1500' ],
        'duration_accountGr': ['p(95)<1500'],
        'duration_transactions': ['p(95)<1000']
    }
}


export function repairTest () {

    let res = http.post(`${baseUrl}/api/v1/categories`, JSON.stringify(createCategory()), {headers});
    console.log(JSON.stringify(createCategory()));
    let isSuccess = check(res, {
        'status is 200 post /category': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    sleep(1);

    res= http.get(`${baseUrl}/api/v1/categories`, { headers });
    // console.log(res.body);
    let categoryId = res.json().data[0].id;
    console.log(categoryId);
    acountGroup.add(res.timings.duration);
    isSuccess = check(res, {
        'status is 200 get /category': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    sleep(1);

    res= http.put(`${baseUrl}/api/v1/categories/${categoryId}`,JSON.stringify({"name": `${generateRandomText(8)}`}), { headers });
    isSuccess = check(res, {
        'status is 200 put /category': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    sleep(1);

    res= http.post(`${baseUrl}/api/v1/bills`, JSON.stringify(bill()), {headers});
    console.log(JSON.stringify(bill()));
    isSuccess = check(res, {
        'status is 200 post /bill': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    sleep(1);

    res= http.get(`${baseUrl}/api/v1/bills`, { headers });
    isSuccess = check(res, {
        'status is 200 get /bills': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    sleep(1);

    res = http.post(`${baseUrl}/api/v1/currencies`, JSON.stringify(createCurrency()), {headers});
    console.log(JSON.stringify(createCurrency()));
    check(res, {
        'status is 200 post /curency': (r) => r.status === 200,
    });
    // if (!isSuccess) {
    //     fail(`Test aborted: Expected status 200 but got ${res.status}`);
    // }
    sleep(1);

    res= http.get(`${baseUrl}/api/v1/currencies/default`, { headers });
    check(res, {
        'status is 200 get /currency default': (r) => r.status === 200,
    });
    // if (!isSuccess) {
    //     fail(`Test aborted: Expected status 200 but got ${res.status}`);
    // }
    sleep(1);

    res= http.post(`${baseUrl}/api/v1/budgets`, JSON.stringify(createBudget()), {headers});
    console.log(JSON.stringify(createBudget()));
    check(res, {
        'status is 200 post /budget': (r) => r.status === 200,
    });
    // if (!isSuccess) {
    //     fail(`Test aborted: Expected status 200 but got ${res.status}`);
    // }
    sleep(1);

    res= http.get(`${baseUrl}/api/v1/budgets`, { headers });
    console.log(res.body);
    let budgetId = res.json().data[1].id;
    console.log(budgetId);
    isSuccess = check(res, {
        'status is 200 get /budget': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    sleep(1);

    res= http.put(`${baseUrl}/api/v1/budgets/${budgetId}`,JSON.stringify({"name": `${generateRandomText(8)}`}), { headers });
    check(res, {
        'status is 200 put /budget': (r) => r.status === 200,
    });
    // if (!isSuccess) {
    //     fail(`Test aborted: Expected status 200 but got ${res.status}`);
    // }
    sleep(1);

    // res= http.get(`${baseUrl}/api/v1/accounts`, { headers });
    // console.log(res.body);
    // let accId = res.json().data.id;
    // let accName=res.json().data.attributes.name;

    let accId = "7988";
    let accName="Ahoj";
    res= http.post(`${baseUrl}/api/v1/transactions`,JSON.stringify(createTransaction(accId,accName)), { headers });
    transactionGroup.add(res.timings.duration);
    check(res, {
        'status is 200 post /transactions': (r) => r.status === 200,
    });
    // if (!isSuccess) {
    //     fail(`Test aborted: Expected status 200 but got ${res.status}`);
    // }
    // let tranId =res.json().data.id;
    let transId ="3630";
    sleep(1);

    res= http.put(`${baseUrl}/api/v1/transactions/${transId}`,JSON.stringify({"name": `${generateRandomNr(4)}`}), { headers });
    sleep(1);
    transactionGroup.add(res.timings.duration);
    check(res, {
        'status is 200 put /transactions/${tranId}': (r) => r.status === 200,
    });
    // if (!isSuccess) {
    //     fail(`Test aborted: Expected status 200 but got ${res.status}`);
    // }
    sleep(1);

    res= http.get(`${baseUrl}/api/v1/transactions`, { headers });
    check(res, {
        'status is 200 get /transactions': (r) => r.status === 200,
    });
    // if (!isSuccess) {
    //     fail(`Test aborted: Expected status 200 but got ${res.status}`);
    // }
    sleep(1);

    res= http.get(`${baseUrl}/api/v1/accounts`, { headers });
    acountGroup.add(res.timings.duration);
    isSuccess = check(res, {
        'status is 200 get /accounts': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    sleep(1);

    res = http.post(`${baseUrl}/api/v1/accounts`, JSON.stringify(createAccount()), {headers});
    console.log(JSON.stringify(createAccount()));
    acountGroup.add(res.timings.duration);  // vlozeni metriky//
    check(res, {
        'status is 200 post /accounts': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    // let accId = res.json().data.id;
    sleep(1);

    res= http.put(`${baseUrl}/api/v1/accounts/${accId}`,JSON.stringify({"name": `${generateRandomText(10)}`}), { headers });
    acountGroup.add(res.timings.duration);
    isSuccess = check(res, {
        'status is 200 get /accounts': (r) => r.status === 200,
    });
    if (!isSuccess) {
        fail(`Test aborted: Expected status 200 but got ${res.status}`);
    }
    sleep(1);



}





    export default function  () {
    }