import {generateRandomText,generateIBAN,generateRandomNr} from "./utilities.js";

export function createAccount() {
    return  {
        "name": generateRandomText(15),
        "type": "asset",
        "iban": generateIBAN('DE', generateRandomNr(8)),
        "bic": "BOFAUS3N",
        "account_number": generateRandomNr(12),
        "opening_balance": "-1012.12",
        "opening_balance_date": "2018-09-17T12:46:47+01:00",
        "virtual_balance": "123.45",
        "currency_id": "1",
        "currency_code": "EUR",
        "active": false,
        "order": 1,
        "include_net_worth": true,
        "account_role": "defaultAsset",
        "credit_card_type": "monthlyFull",
        "monthly_payment_date": "2018-09-17T12:46:47+01:00",
        "liability_type": "loan",
        "liability_direction": "credit",
        "interest": "5.3",
        "interest_period": "monthly",
        "notes": "Some example notes",
        "latitude": 51.983333,
        "longitude": 5.916667,
        "zoom_level": 6
    }
}

export function createCategory() {
    return {
        "name": generateRandomText(15),
        "description": "I'm learning..."
    }
}

export function createPiggy(accId) {
    return  {
        "name": generateRandomText(10),
        "account_id": `${accId}`,
        "target_amount": "123.45",
        "current_amount": "123.45",
        "start_date": "2018-09-17",
        "target_date": "2018-10-17",
        "order": 5,
        "notes": "Some notes"
    }
}

export function createTransaction(accId,accName) {
    return  {

        "error_if_duplicate_hash": false,
        "apply_rules": false,
        "fire_webhooks": true,
        "group_title": "Split transaction title.",
        "transactions": [
            {
                "type": "withdrawal",
                "date": "2018-09-17T12:46:47+01:00",
                "amount": generateRandomNr(3),
                "description": generateRandomText(10),
                "order": 1,
                "currency_id": "1",
                "currency_code": "EUR",
                "source_id": `${accId}`,
                "source_name": `${accName}`,
                "destination_id": "7988",
                "destination_name": "Blanka Demangeon expense",
                "reconciled": false,
                "tags": null,
                "notes": "Some example notes",
                "internal_reference": "string",
                "external_id": "string",
                "external_url": "string",
                "bunq_payment_id": "string",
                "sepa_cc": "string",
                "sepa_ct_op": "string",
                "sepa_ct_id": "string",
                "sepa_db": "string",
                "sepa_country": "string",
                "sepa_ep": "string",
                "sepa_ci": "string",
                "sepa_batch_id": "string",
                "interest_date": "2024-10-29T13:14:03.427Z",
                "book_date": "2024-10-29T13:14:03.427Z",
                "process_date": "2024-10-29T13:14:03.427Z",
                "due_date": "2024-10-29T13:14:03.427Z",
                "payment_date": "2024-10-29T13:14:03.427Z",
                "invoice_date": "2024-10-29T13:14:03.427Z"
            }
        ]
    }
}

export function bill () {
    return {
        "currency_id": "1",
        "currency_code": "EUR",
        "name": generateRandomText(15),
        "amount_min": "123.45",
        "amount_max": "123.45",
        "date": "2018-09-17T12:46:47+01:00",
        "end_date": "2018-09-18T12:46:48+01:00",
        "extension_date": "2018-09-18T12:46:50+01:00",
        "repeat_freq": "monthly",
        "skip": 0,
        "active": true,
        "notes": "Some example notes",
        "object_group_id": "5",
        "object_group_title": "Example Group"
    }
}

export function createBudget () {
    return {
        "name": generateRandomText(15),
        "active": false,
        "notes": "Some notes",
        "auto_budget_type": "reset",
        "auto_budget_currency_id": "1",
        "auto_budget_currency_code": "EUR",
        "auto_budget_amount": "1012.12",
        "auto_budget_period": "monthly"
    }
}

export function createCurrency () {
    return {
        "enabled": true,
        "default": true,
        "code": generateRandomText(3).toUpperCase(),
        "name": generateRandomText(15),
        "symbol": generateRandomText(3),
        "decimal_places": 2
    }
}