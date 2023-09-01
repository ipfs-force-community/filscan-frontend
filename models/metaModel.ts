export interface MetaModel{
  power_increase_24h:string;
  power_increase_24h_unit:string;
  power_increase_24h_increase:'increase'|'reduce'|'';
  power_increase_24h_in_count:string;

  add_power_in_32g:string;
  add_power_in_32g_unit:string;

  miner_initial_pledge:string;
  miner_initial_pledge_unit:string;

  fil_per_tera_24h:string;
  fil_per_tera_24h_unit:string;

  total_contract:string;
  total_contract_increase:'increase'|'reduce'|'';
  total_contract_in_count:string;

  contract_transaction:string;
  contract_transaction_increase:'increase'|'reduce'|'';
  contract_transaction_in_count:string;

  contract_address:string;
  contract_address_increase:'increase'|'reduce'|'';
  contract_address_in_count:string;

  gas_24:string;
  gas_24_unit:string;
}