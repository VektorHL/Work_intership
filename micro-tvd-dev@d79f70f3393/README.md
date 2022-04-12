# Актуализация схемы graphql
Перед работой актуализируйте файл schema.json (`src/app/schema.json`) и выполните `yarn graphql-json-to-sdl` для ковертации

# Поддерживаемые env
Значения по умолчанию хранятся в `./app-config/env.js`
```
NSI_REGISTRY_HOST=https://gas.apps.dev.devsun.ru/service/registry/nsi
WORKFLOW_MANAGER_HOST=https://gas.apps.dev.devsun.ru/service/zeebe/manager
META_REGISTRY_HOST=https://gas.apps.dev.devsun.ru/service/registry/meta
FIAS_SERVICE_HOST=https://platform.apps.dev.devsun.ru//service/fias
JOURNAL_REGISTRY_HOST=https://gas.apps.dev.devsun.ru/service/registry/journal
CAMPAIGN_REGISTRY_HOST: "https://gas.apps.dev.devsun.ru/service/registry/campaign/election"
CANDIDATE_REGISTRY_HOST: "https://gas.apps.dev.devsun.ru/service/registry/candidate"
NOTIFIER_GATEWAY=wss://platform.apps.dev.devsun.ru/service/notifier/gateway
S3_URL_SIGNER=https://gas.apps.dev.devsun.ru/service/s3urlsigner
```
