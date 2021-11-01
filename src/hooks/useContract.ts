import { useMemo } from 'react'
import useWeb3Provider from 'hooks/useWeb3Provider'
import {
  getBep20Contract,
  getCakeContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getMasterchefContract,
  getSouschefContract,
  getErc721Contract,
  getSouschefV2Contract,
  getPresaleContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const provider = useWeb3Provider()
  return useMemo(() => getIfoV1Contract(address, provider.getSigner()), [address, provider])
}

export const useIfoV2Contract = (address: string) => {
  const provider = useWeb3Provider()
  return useMemo(() => getIfoV2Contract(address, provider.getSigner()), [address, provider])
}

export const useERC20 = (address: string) => {
  const provider = useWeb3Provider()
  return useMemo(() => getBep20Contract(address, provider.getSigner()), [address, provider])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const provider = useWeb3Provider()
  return useMemo(() => getErc721Contract(address, provider.getSigner()), [address, provider])
}

export const useCake = () => {
  const provider = useWeb3Provider()
  return useMemo(() => getCakeContract(provider.getSigner()), [provider])
}

export const useMasterchef = () => {
  const provider = useWeb3Provider()
  return useMemo(() => getMasterchefContract(provider.getSigner()), [provider])
}

export const usePresale = () => {
  const provider = useWeb3Provider()
  return useMemo(() => getPresaleContract(provider.getSigner()), [provider])
}

export const useSousChef = (id) => {
  const provider = useWeb3Provider()
  return useMemo(() => getSouschefContract(id, provider.getSigner()), [id, provider])
}

export const useSousChefV2 = (id) => {
  const provider = useWeb3Provider()
  return useMemo(() => getSouschefV2Contract(id, provider.getSigner()), [id, provider])
}
