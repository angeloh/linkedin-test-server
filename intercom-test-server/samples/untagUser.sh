#!/bin/sh
curl http://localhost:8000/tags \
-XPOST \
-u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d'
{
  "name": "Independent",
  "users": [
    {
      "user_id" : "25",
      "untag": true
    }
  ]
}'
