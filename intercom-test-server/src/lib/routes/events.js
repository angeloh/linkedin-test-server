/*
 https://doc.intercom.io/api/#submitting-events

 event_name	yes	The name of the event that occurred. This is presented to your App’s admins when filtering and creating segments - a good event name is typically a past tense ‘verb-noun’ combination, to improve readability, for example updated-plan.
 created_at	yes	The time the event occurred as a UTC Unix timestamp
 user_id	yes if no email	Your identifier for the the user.
 email	yes if no user_id	An email address for your user. An email should only be used where your application uses email to uniquely identify users
 metadata	no	optional metadata about the event.
 */
/*
curl https://api.intercom.io/events \
    -X POST \
-u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
-H "Content-Type: application/json" -d'
{
    "event_name" : "invited-friend",
    "created_at": 1389913941,
    "user_id": "314159",
    "metadata": {
    "invitee_email": "pi@example.org",
        "invite_code": "ADDAFRIEND"
}
}'


The API may detect and ignore duplicate events. Each event is uniquely identified as a combination of the following data - the App identifier, the User identifier, the Event name and the Event created time. As a result, it is strongly recommended to send a second granularity Unix timestamp in the created_at field.


    curl https://api.intercom.io/events \
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
}

Successful responses to submitted events return 202 Accepted with an empty body.
    Unauthorised access will be rejected with a 401 Unauthorized or 403 Forbidden response code.
    Events sent about users that cannot be found will return a 404 Not Found.
    Event lists containing duplicate events will have those duplicates ignored.
    Server errors will return a 500 response code and may contain an error message in the body.


String	The value is a JSON String	"source":"desktop"
Number	The value is a JSON Number	"load": 3.67
Date	The key ends with the String _date and the value is a Unix timestamp, assumed to be in the UTC timezone.	"contact_date": 1392036272
Link	The value is a HTTP or HTTPS URI.	"article": "https://example.org/ab1de.html"
Rich Link	The value is a JSON object that contains url and value keys.	"article": {"url": "https://example.org/ab1de.html", "value":"the dude abides"}
Stripe Data	The key is one of - ‘stripe_customer’, ‘stripe_invoice’, ‘stripe_charge’. The value is a Stripe identifier.	"stripe_customer": "cus_42424242424"
Monetary Amount	The value is a JSON object that contains amount and currency keys. The amount key is a positive integer.	"price": {"amount": 34999, "currency": "eur"}

# The metadata key values in the example
# are treated as follows-
#
# - order_date: a Date
#    (key ends with '_date').
#
# - stripe_invoice: The identifier of the Stripe invoice
#     (has a 'stripe_invoice' key)
#
# - order_number: Rich Link
#     (contains 'url' and 'value')
#
# - price: Amount in US Dollars
#     (contains 'amount' and 'currency')
*/

Router.map(function() {
    this.route('events', {
        path: 'events',
        where: 'server'
    }).post(function() {
        var response = EventsManager.eventsCreateUpdateResponseMethod(this.request);
        sendJSONResponse(this, response);
    });
})