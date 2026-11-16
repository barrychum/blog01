---
title: "Docker commands"
date: 2024-06-21
tags: 
  - "Cheatsheet/docker"
---
docker run -d --name vaultwarden -e ROCKET_TLS='{certs="/root/certs.pem",key="/root/key.pem"}' -v vault-volume:/data/ -p 5555:80 stellarhub/vaultwarden:1.30.5
docker cp ./key.pem testwarden:/root/key.pem
docker cp ./certs.pem testwarden:/root/certs.pem
docker exec vaultwarden chown root:root /root/key.pem
docker exec vaultwarden chown root:root /root/certs.pem

docker update --restart unless-stopped vaultwarden

./duplicate_docker_vol.sh bw vault-volume
