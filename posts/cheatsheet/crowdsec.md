---
title: "Crowdsec cheatsheet"
date: 2026-02-16
tags: 
  - "Cheatsheet/crowdsec"
---
docker exec crowdsec cscli bouncers list
docker exec crowdsec cscli collections list
docker exec -it crowdsec cscli scenarios list

docker exec crowdsec cscli decisions add --reason "manual testing" --ip 84.70.251.67 --duration 5m
docker exec crowdsec cscli decisions delete --ip 84.70.251.67
docker exec crowdsec cscli decisions list

docker exec crowdsec cscli alerts list
docker exec -it crowdsec cscli metrics

