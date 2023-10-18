// src/global.d.ts

import { AnyNsRecord } from "dns"

declare global {
    interface window {
        ethereum: any,
        web3: any,
        gtag:any
    }
}
interface Window {
    ethereum: any,
    web3: any,
    gtag:any
};

declare module 'rc-bullets';

