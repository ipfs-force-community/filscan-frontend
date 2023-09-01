import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import navEn from './en/nav.js';
import navZh from './zh/nav.js';
import navHa from './kr/nav.js';

import homeZh from './zh/home.js';
import homeEh from './en/home.js';
import homeHa from './kr/home.js';

import statisticZh from './zh/statistic.js';
import statisticEn from './en/statistic.js';
import statisticHa from './kr/statistic.js';

import rankZh from './zh/rank.js'
import rankEn from './en/rank.js';
import rankHa from './kr/rank.js';

import tipsetZh from './zh/tipset.js';
import tipsetEn from './en/tipset';
import tipsetHa from './kr/tipset.js';

import detailZh from './zh/detail';
import detailEn from './en/detail';
import detailHa from './kr/detail';

import fvm from './zh/fvm.js';
import fvmEn from './en/fvm';
import fvmHa from './kr/fvm';

import contractZh from './zh/contract.js';
import contractEn from './en/contract.js';
import contractHa from './kr/contract.js';

import domainZh from './zh/domain.js';
import domainEn from './en/domain.js';
import domainHa from './kr/domain.js';

import fevmZh from './zh/fevm.js';
import fevmEn from './en/fevm.js';
import fevmKr from './kr/fevm.js';

import commonZh from './zh/common.js';
import commonEn from './en/common.js';
import commonKr from './kr/common.js';

import accountZh from './zh/account.js';
import accountEn from './en/account.js';
import accountKr from './kr/account.js';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: commonEn, account: accountEn, nav: navEn, home: homeEh, static: statisticEn, rank: rankEn, tipset: tipsetEn, detail: detailEn, fvm: fvmEn, contract: contractEn, domain: domainEn, fevm: fevmEn },
      kr: { common: commonKr, account: accountKr, nav: navHa, home: homeHa, static: statisticHa, rank: rankHa, tipset: tipsetHa, detail: detailHa, fvm: fvmHa, contract: contractHa, domain: domainHa, fevm: fevmKr },
      zh: { common: commonZh, account: accountZh, nav: navZh, home: homeZh, static: statisticZh, rank: rankZh, tipset: tipsetZh, detail: detailZh, fvm: fvm, contract: contractZh, domain: domainZh, fevm: fevmZh },
    },
    fallbackLng: 'zh',
    debug: true,
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['querystring', 'navigator', 'localStorage'],
      lookupQuerystring: 'lang',
    },
  })

export default i18n