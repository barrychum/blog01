---
title: "Docker Macvlan"
date: 2024-08-02
tags: 
  - "Cheatsheet/docker"
---

Step 2: Create a Macvlan Network

    Identify the Network Interface:
        Use ifconfig or ip addr to identify the main network interface (e.g., eth0).

    Create the Macvlan Network:
        Replace eth0 with your network interface.
        Adjust 192.168.1.0/24 and 192.168.1.1 to match your network's subnet and gateway.
        

docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  macvlan_network

### To use dhcp
```
docker network create -d macvlan \
  --subnet=192.168.38.0/24 \
  --gateway=192.168.38.1 \
  --ip-range=192.168.38.51/32 \
  -o parent=eth0 \
  macvlan_network
```

# Create macvlan network
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  macvlan_network

# Run Nginx container 1
docker run -d --name nginx1 \
  --network macvlan_network \
  --ip 192.168.1.100 \
  nginx

# Run Nginx container 2
docker run -d --name nginx2 \
  --network macvlan_network \
  --ip 192.168.1.101 \
  nginx

# Run Apache container
docker run -d --name apache \
  --network macvlan_network \
  --ip 192.168.1.102 \
  httpd

