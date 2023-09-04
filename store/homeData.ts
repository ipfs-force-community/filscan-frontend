export interface DefiProtocol {
    protocol: string;
    tvl: string;
    tvl_change_rate_in_24h: string;
    tvl_change_in_24h: string;
    users: number;
    icon_url: string;
    tokens: DefiToken[];
    main_site: string;
  }

export interface DefiToken {
    token_name: string;
    icon_url: string;
    rate: number;
  }