#!/bin/bash

# Start MongoDB
/usr/bin/mongod --bind_ip_all --tlsMode disabled &

# Start npm
sleep 10
npm start