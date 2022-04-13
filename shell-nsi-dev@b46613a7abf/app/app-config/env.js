/* eslint-disable max-len */
module.exports = {
  environment: {
    production: false,
    mockGraphQlUri: 'http://localhost:4211/graphql',
    graphQlUri: '',
    AUTH_DOMAIN: 'https://sso.gas.apps.dev.devsun.ru/',
    MF_AUTH: 'https://auth.gas.apps.dev.devsun.ru/remoteEntry.js',
    MF_NSI_HANDBOOKS: 'https://gas.apps.dev.devsun.ru/mfe/nsi/remoteEntry.js',
    MF_CAMPAIGNS: 'https://gas.apps.dev.devsun.ru/mfe/campaigns/remoteEntry.js',
    MF_COMMISSIONS: 'https://gas.apps.dev.devsun.ru/mfe/commissions/remoteEntry.js',
    MF_PAIP_LAW: 'https://gas.apps.dev.devsun.ru/mfe/law/remoteEntry.js',
    MF_PAIP_CALENDAR: 'https://gas.apps.dev.devsun.ru/mfe/calendar/remoteEntry.js',
    MF_PAIP_CERTIFICATE: 'https://gas.apps.dev.devsun.ru/mfe/certificate/remoteEntry.js',
    MF_CANDIDATES: 'https://gas.apps.dev.devsun.ru/mfe/candidates/remoteEntry.js',
    MF_TVD: 'https://gas.apps.dev.devsun.ru/mfe/tvd/remoteEntry.js',
    PAIP_LAW_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/legal',
    PAIP_CALENDAR_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/calendar',
    PAIP_CERTIFICATE_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/certificate',
    WORKFLOW_MANAGER_HOST: 'https://gas.apps.dev.devsun.ru/service/zeebe/manager',
    NSI_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/servicegw/registry/nsi',
    META_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/meta',
    FIAS_SERVICE_HOST: 'https://platform.apps.dev.devsun.ru/service/fias',
    JOURNAL_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/journal',
    NOTIFIER_GATEWAY: 'wss://gas.apps.dev.devsun.ru/service/notifier/gateway',
    S3_URL_SIGNER: 'https://gas.apps.dev.devsun.ru/service/s3urlsigner',
    FORMAT_CONVERTER: 'https://gas.apps.dev.devsun.ru/service/format/converter',
    USERTASK_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/usertask',
    ADDRESS_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/address',
    ADDRESS_SEARCH_NODE_HOST: 'https://gas.apps.dev.devsun.ru/service/address/search/node',
    CAMPAIGN_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/campaign/election',
    COMMISSIONS_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/commission',
    CANDIDATE_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/candidate',
    COMMISSION_MEMBER_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/commissionmember',
    TERRITORY_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/territory',
    RESULTS_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/results',
    ROLE_REGISTRY_HOST: 'https://gas.apps.dev.devsun.ru/service/registry/decision',
    APOLLO_SERVER_HOST:'https://gas.apps.dev.devsun.ru/service/graphql-federation/gateway',
    APP_PROJECT_PATH: '/shell',
    APP_DEFAULT_ROUTE: '/paip/main/authorities',
    AUTH_CLIENT_ID: 'arm',
    AUTH_CLIENT_SECRET: '',
    AUTH_SCOPE: 'openid nsiAdmin dictAdmin dictOperator',
  },
};