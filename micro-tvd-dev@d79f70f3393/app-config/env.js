module.exports = {
  environment: {
    production: false,
    NSI_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/nsi',
    WORKFLOW_MANAGER_HOST: 'https://gas.apps.dev.devsun.ru/service/zeebe/manager',
    META_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/meta',
    FIAS_SERVICE_HOST: 'https://gas.apps.dev.devsun.ru//service/fias',
    CAMPAIGN_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/campaign/election',
    COMMISSIONS_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/commission',
    TERRITORY_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/territory',
    CANDIDATE_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/candidate',
    JOURNAL_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/journal',
    NOTIFIER_GATEWAY: 'wss://gas.apps.dev.devsun.ru/service/notifier/gateway',
    S3_URL_SIGNER: 'https://gas.apps.dev.devsun.ru/service/s3urlsigner',
    USERTASK_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/usertask',
    GAS_HOST: 'https://gas.apps.dev.devsun.ru',
    APOLLO_SERVER_HOST: 'https://gas.apps.dev.devsun.ru/service/graphql-federation/gateway',
  },
};
