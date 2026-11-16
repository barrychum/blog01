---
title: "Gitea ipvlan Cheatsheet"
date: 2026-03-06
tags: 
  - "Cheatsheet"
---


Run these commands on your **Docker Host** (adjust `ens192` to your interface name):

```bash
# 1. Create a new ipvlan interface for the host
sudo ip link add ipvlan-host link ens192 type ipvlan mode l2

# 2. Assign an IP from your range to the host's new interface 
# (Use .66 since .64 is network and .65 is Gitea)
sudo ip addr add 192.168.38.66/30 dev ipvlan-host

# 3. Bring the interface up
sudo ip link set ipvlan-host up

# 4. Add a specific route so the host knows to use this bridge to find Gitea
sudo ip route add 192.168.38.65 dev ipvlan-host

```

---

### Why this fixes the Bad Gateway

Without this bridge, when Traefik tries to send a packet to `.65`, the packet goes out to your physical router. The router sees the packet is meant for an IP that is "on the same wire" and sends it back. However, the Linux kernel sees a packet with the same MAC address as itself and drops it for security. The commands above create a "internal side-door" for that traffic.

### Check your Gitea Config

Your environment variables are actually correct for a proxy setup:

* `GITEA__server__HTTP_PORT=80`: Gitea listens on 80.
* `GITEA__server__ROOT_URL=https://...`: Gitea knows the *user* is seeing HTTPS, so it generates the correct links.

### Verification

Once you run the commands above, try this on the host:

```bash
ping 192.168.38.65

```

nano /etc/systemd/system/ipvlan-bridge.service
```
[Unit]
Description=Fix IPVLAN Host-to-Container Communication
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes

# The "-" prefix ignores the error if the link or addr already exists
ExecStartPre=-/usr/sbin/ip link add gitea-shim link ens192 type ipvlan mode l2
ExecStartPre=-/usr/sbin/ip addr add 192.168.38.66/32 dev gitea-shim
ExecStartPre=/usr/sbin/ip link set gitea-shim up

# Apply the route
ExecStart=/usr/sbin/ip route add 192.168.38.64/30 dev gitea-shim

# Optional: Cleanup when service stops
ExecStop=/usr/sbin/ip route del 192.168.38.64/30 dev gitea-shim
ExecStop=/usr/sbin/ip link del gitea-shim

[Install]
WantedBy=multi-user.target
```
systemctl daemon-reload

systemctl enable ipvlan-bridge.service

systemctl start ipvlan-bridge.service
