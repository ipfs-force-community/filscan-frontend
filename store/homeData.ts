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

export interface EvmContractData {
evm_contract_list: EvmContract[];
total: number;
update_time: number;
}
interface EvmContract {
rank: number;
actor_id: string;
actor_address: string;
contract_address: string;
contract_name: string;
transfer_count: number;
user_count: number;
actor_balance: string;
gas_cost: string;
}