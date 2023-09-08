import Image from '@/packages/image';
import Tp from '@/assets/images/TokenPocket.png';
import Tooltip from '@/packages/tooltip';
import Web3 from "web3";
import { useTranslation } from 'react-i18next';

export default ({ data }: { data: Record<string, any> }) => {
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "fevm" });
    }
    return t(label, { ns: "fevm" });
  };

  async function getNetWork() {
    const web3 = new Web3(window.ethereum);
    const chainId = await web3.eth.getChainId()
    return Number(chainId) === 314

  }

  const addNetwork = async () => {
    if (window.ethereum) {
      try {
        const res= await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13a' }],
        });
        return true
      } catch (e: any) {
        if (e.code === 4902) {
          try {
            const res= await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13a',
                  chainName: 'Filecoin - Mainnet',
                  nativeCurrency: {
                    name: 'Mainnet',
                    symbol: 'FIL', // 2-6 characters long
                    decimals: 18
                  },
                  rpcUrls: ['https://api.node.glif.io/'],
                  blockExplorerUrls: ['https://filscan.io'],
                },
              ],
            });
            return true
          } catch (addError) {
            console.error(addError);
          }
        }
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }

  }

  const handleClick = async() => {
    if (!window?.ethereum.isTokenPocket) {
      //dowm wallet
      window.open(`https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii?hl=en`);
      window.location.reload()
    } else {
      const chainId = await getNetWork();
      if (!chainId) {
        // 切换网络
        const res = await addNetwork();
        if (res) {
          return connect_account()
        }
      }
      return connect_account()
    }
    ;
  }

  const connect_account = () => {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then((res:any) => {
      addToken(res[0]);
    })
      .catch((error:any) => {
        if (error.code === 4001) {
          console.log('Please connect to TokenPocket Extension.');
        } else {
          console.error(error);
        }
      })
  }

  const addToken = async (address:string) => {
    const tokenAddress = data.contract_id;
    const tokenSymbol = data?.tokenName;
    const tokenDecimals = 18;
    const tokenImage = data?.token_image;
    try {
      // wasAdded is a boolean. Like any RPC method, an error can be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params:  {
          type: 'ERC20', // Initially only supports ERC-20 tokens, but eventually more!
          options: {
            address: tokenAddress, // The address of the token.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
            decimals: tokenDecimals, // The number of decimals in the token.
            image: tokenImage, // A string URL of the token logo.
          },
        }
      });
      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return <Tooltip context={tr('tp_token')} icon={false}>
    <Image onClick={ handleClick} src={Tp} width={18} alt='tp wallet' className='margin-6' style={{display:'block',cursor:'pointer',borderRadius:'50%'}} />
  </Tooltip>
}