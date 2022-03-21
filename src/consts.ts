export const DAO_CONTRACT_ADDRESS =
  (process.env.REACT_APP_CONTRACT_DAO as `0x${string}`) || '';
export const ERC20_CONTRACT_ADDRESS =
  (process.env.REACT_APP_CONTRACT_ERC as `0x${string}`) || '';
export const REGISTRY_TYPES = process.env.REACT_APP_REGISTRY_TYPES || '';
export const REACT_APP_NETWORK =
  process.env.REACT_APP_NETWORK || 'ws://localhost:9944';

export enum LOCAL_STORAGE {
  ACCOUNT = 'account',
}
