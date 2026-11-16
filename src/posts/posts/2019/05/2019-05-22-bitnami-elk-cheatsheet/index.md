---
title: "bitnami ELK cheatsheet"
date: 2019-05-22
categories: 
  - "installation-guide"
---

sudo rm -f /etc/ssh/sshd\_not\_to\_be\_run  
sudo systemctl enable ssh  
sudo systemctl start ssh

sudo ifconfig  
cd /etc/systemd/network  
sudo cp 99-dhcp.network 25-wired.network

nano 25-wired.network

\[Match\]  
Name=  
\[Network\]  
Address=x.x.x.x/24  
Gateway=x.x.x.x  
DNS=x.x.x.x

sudo /opt/bitnami/elasticsearch/bnconfig  
sudo /opt/bitnami/logstash/bnconfig  
sudo /opt/bitnami/apache2/bnconfig

\==========================================

sudo /opt/bitnami/apache2/bin/htpasswd -c /opt/bitnami/elasticsearch/apache-conf/password user  
sudo /opt/bitnami/ctlscript.sh restart apache

\============================================

get started  
Load ELK environment  
sudo /opt/bitnami/use\_elk

stop logstash  
sudo /opt/bitnami/ctlscript.sh stop logstash

create /opt/bitnami/logstash/conf/access-log.conf

check config, and check for "Configuration OK"  
/opt/bitnami/logstash/bin/logstash -f /opt/bitnami/logstash/conf/ -t

(or use --config.test\_and\_exit)

start logstash  
sudo /opt/bitnami/ctlscript.sh start logstash

check elasticsearch  
curl 'localhost:9200/\_cat/indices?v'

delete elasticsearch  
curl -XDELETE localhost:9200/index/type/documentID

configure kibana pattern and dashboard

to stop all services  
sudo /opt/bitnami/ctlscript.sh stop

http://SERVER-IP/APP

\==========================================

move elasticsearch data path

A. You need to move the elasticsearch folder, i.e. that's the folder which bears the same name as your cluster.name configured in the elasticsearch.yml file.

B. You need to modify the path.data setting in the elasticsearch.yml file to the new folder you've moved the data to.

So, say you are currently using /var/lib/elasticsearch and you want to move the data folder to /foo/bar, here is what you need to do:

mv /var/lib/elasticsearch /foo/bar

Then in elasticsearch.yml modify path.data to:

path.data: /foo/bar  
You'll end up with your data being stored in /foo/bar/elasticsearch instead of /var/lib/elasticsearch. Make sure that the elasticsearch process can access your new folder.

\==========================================

https://rzetterberg.github.io/nginx-elk-logging.html

https://krakensystems.co/blog/2018/logstash-nginx-logs-part-1  
https://krakensystems.co/blog/2018/logstash-nginx-logs-part-2

https://logz.io/blog/nginx-log-analysis/

https://www.elastic.co/guide/en/logstash/current/plugins-inputs-syslog.html  
https://www.elastic.co/guide/en/logstash/current/config-examples.html

\==========================================

default configuration  
/opt/bitnami/elasticsearch/config/elasticsearch.yml  
/opt/bitnami/elasticsearch/logs/elasticsearch.log  
port 9200 and up for requests  
port 9300 and up for communication  
curl -XGET 'localhost:9200/'

/opt/bitnami/logstash/conf/logstash.conf  
/opt/bitnami/logstash/logs/logstash.log  
port 9600 and up

/opt/bitnami/kibana/config/kibana.yml  
/opt/bitnami/kibana/logs/kibana.log  
port 5601 and up

/opt/bitnami/apache2/conf/httpd.conf  
apachectl -V

\==========================================

sudo /opt/bitnami/ctlscript.sh status  
sudo /opt/bitnami/ctlscript.sh stop  
cd /opt/bitnami/elasticsearch  
sudo mkdir data  
echo "/dev/sdb /opt/bitnami/elasticsearch/data ext4 defaults 0 0" | sudo tee -a /etc/fstab  
sudo mount -a  
sudo chown elasticsearch data  
sudo chgrp elasticsearch data  
df -h  
sudo /opt/bitnami/ctlscript.sh start
