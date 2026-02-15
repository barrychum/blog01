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

sample attack script

for i in {1..2000}; do

    for path in \
    "/.env" "/.git/config" "/wp-config.php" "/config.php" "/.aws/credentials" \
    "/.ssh/id_rsa" "/.env.local" "/.env.production" "/.git/HEAD" "/admin/.env" \
    "/app/.env" "/src/.env" "/backup.sql" "/database.sql" "/db.php" \
    "/.vscode/settings.json" "/.idea/workspace.xml" "/composer.json" "/package.json" "/.htaccess"; \
        do 
            curl -s -I -o /dev/null "https://myservice.mydomain.com$path"
            echo "Attacked: $path"
        done
done
