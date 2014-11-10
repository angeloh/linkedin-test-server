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
