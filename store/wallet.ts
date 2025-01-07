import Web3 from 'web3'

export async function getNetWork() {
  const web3 = new Web3(window.ethereum)
  const chainId = await web3.eth.getChainId()
  return Number(chainId) === 314
}

export const addNetwork = async () => {
  if (window.ethereum) {
    try {
      const res = await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13a' }],
      })
      return true
    } catch (e: any) {
      if (e.code === 4902) {
        try {
          //添加网络
          const res = await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13a',
                chainName: 'Filecoin - Mainnet',
                nativeCurrency: {
                  name: 'Mainnet',
                  symbol: 'FIL', // 2-6 characters long
                  decimals: 18,
                },
                rpcUrls: ['https://api.node.glif.io/'],
                blockExplorerUrls: ['https://filscan.io'],
              },
            ],
          })
          return true
        } catch (addError) {
          console.error(addError)
        }
      }
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html',
    )
  }
}

export const connect_account = () => {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((res: any) => {
        if (res) {
          resolve(res[0])
        }
      })
      .catch((error: any) => {
        if (error.code === 4001) {
          console.log('Please connect to TokenPocket Extension.')
        } else {
          console.error(error)
        }
      })
  })
}

// import { createContext } from 'react'

// const WalletState: any = createContext({
//   wallet: '',
//   account: 'zh-CN',
// })

// export default WalletState
