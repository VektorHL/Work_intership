# Orchestrator

Проект сгенерирован с использованием [Angular CLI](https://github.com/angular/angular-cli) версии 12.1.1.

## Установка зависимостей

Для установки зависимостей выполните команду с использованием пакетного менеджера yarn: `yarn install`

## Development server

Для запуска проекта выполните команду `yarn start`

## Генерация элементов кода

Выполните `ng generate component component-name` для генерации нового компонента. Также можно сгенерировать: `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Сборка

Выполните `ng build` для сборки проекта.

## Запуск unit тестов

Выполните `ng test` для запуска unit тестов с использованием [Karma](https://karma-runner.github.io).

## Поддерживаемые env
Значения по умолчанию хранятся в `./app-config/env.js`
```
AUTH_DOMAIN=https://sso.gas.apps.dev.devsun.ru/
MF_AUTH=https://auth.platform.apps.dev.devsun.ru/remoteEntry.js
MF_NSI_HANDBOOKS=https://handbooks.nsi.micro.arm.gas.apps.dev.devsun.ru/remoteEntry.js
NSI_REGISTRY_HOST=https://gas.apps.dev.devsun.ru/service/registry/nsi
MF_PAIP_LAW=https://gas.apps.dev.devsun.ru/mfe/law/remoteEntry.js
PAIP_LAW_REGISTRY_HOST=https://gas.apps.dev.devsun.ru/service/registry/legal
WORKFLOW_MANAGER_HOST=https://gas.apps.dev.devsun.ru/service/zeebe/manager
META_REGISTRY_HOST=https://gas.apps.dev.devsun.ru/service/registry/meta
FIAS_SERVICE_HOST=https://platform.apps.dev.devsun.ru/service/fias
JOURNAL_REGISTRY_HOST=https://gas.apps.dev.devsun.ru/service/registry/journal
NOTIFIER_GATEWAY=wss://platform.apps.dev.devsun.ru/service/notifier/gateway
FORMAT_CONVERTER=https://gas.apps.dev.devsun.ru/service/format/converter
S3_URL_SIGNER=https://gas.apps.dev.devsun.ru/service/s3urlsigner
TERRITORY_REGISTRY_HOST=https://gas.apps.dev.devsun.ru/service/registry/territory
```
