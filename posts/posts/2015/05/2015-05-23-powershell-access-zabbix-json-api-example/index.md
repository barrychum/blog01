---
title: "Powershell access zabbix json api example"
date: 2015-05-23
categories: 
  - "zabbix"
---

The following example shows how to use zabbix 2.4 json api `ps> $json = '{"jsonrpc":"2.0","method":"apiinfo.version","id":1,"auth":null,"params":{}}'` ps> Invoke-RestMethod -Method Post -uri http:///zabbix/api\_jsonrpc.php -ContentType "application/json-rpc" -Body $json ps> $jsonauth = '{"jsonrpc": "2.0","method": "user.login","params": {"user": "<usrid>","password": "<password>"}, "id": 1, "auth": null}' ps> $auth = (Invoke-RestMethod -Method Post -uri http:///zabbix/api\_jsonrpc.php -ContentType "application/json-rpc" -Body $jsonauth).result ps> $json = '{"jsonrpc": "2.0","method": "host.get", "params": {"output": \["hostid","host"\],"selectInterfaces": \["interfaceid","ip"\]},"id": 2,"auth": "' + $auth + '"}' ps> Invoke-RestMethod -Method Post -uri http:///zabbix/api\_jsonrpc.php -ContentType "application/json-rpc" -Body $json ps> Invoke-RestMethod -Method Post -uri http:///zabbix/api\_jsonrpc.php -ContentType "application/json-rpc" -Body $json | select -ExpandProperty result ps> $json = '{"jsonrpc": "2.0","method": "host.get", "params": {"output": "extend","selectInventory":"extend"},"id": 2,"auth": "' + $auth + '"}' ps > $json = '{ "jsonrpc": "2.0","method": "item.get","params": {"output": "extend","hostids": "10105",
