#!/bin/sh
curl http://localhost:8000/events \
    -X POST \
-u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
-H "Content-Type: application/json" -d'
{
    "event_name" : "ordered-item",
    "created_at": 1389913941,
    "user_id": "314159",
    "metadata": {
    "order_date": 1392036272,
        "stripe_invoice": "inv_3434343434",
        "order_number": {
        "value":"3434-3434",
            "url": "https://example.org/orders/3434-3434"
    },
    "price": {
        "currency":"usd",
            "amount": 2999
    }
}
}'
