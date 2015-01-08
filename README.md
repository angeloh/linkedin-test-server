LinkedIn Test Server
====================

## Usage

Run with either ./run.sh or ./fgrun.sh (only diff is run in background
vs run in foreground). WP-server should try to use the test server
while in debug mode if it's available.

## Adding profiles

1. Log into linkedIn with real linkedIn server.
2. WP server will create a linkedInHuman entry.
3. Copy the subdocument "linkedInData" of the linkedInHuman to profiles.js.
4. Remove 'lastLoggedInAt', because this contains ISODate, which confuses meteor.

Test accounts:

Naming Rule:

Female = Researcher
Male = Customer


Ada Lovelace
Researcher
Uploaded 1 research report
ada@lovelace.com
No Challenge Entries


Bruce WIllis
Customer
bruce@willis.com
Submitted 1 research request (not examined approved)
No user account

Charlie Sheen
Customer
charlie@sheen.com
Has user account
Submitted 2 research requests:
1 pending
2 approved
Challenges:
1 completed (CS-1):
$1000 prize pool
$300 paid to Rachel Carson
$700 needs to be returned to general account.
1 active (CS-2):
$2000 prize pool
$1000 funded
Paid: $2000

David Letterman:
Customer
david@letterman.com
New customer

Marie Curie:
Researcher
marie@curie.com
New researcher

Rachel Carson
Researcher
rachel@carson.com
Submitted 2 challenge entries to (CS-1):
1 rewarded ($300)
1 rejected
