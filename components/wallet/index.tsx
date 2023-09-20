import { Button, Modal } from "antd"
import { useContext, useEffect, useState } from "react";
import Image from '@/packages/image'
import style from './index.module.scss'
import { addNetwork, connect_account, getNetWork } from "@/store/wallet";
import WalletStore from "@/store/wallet";
import { LogoutOutlined } from "@ant-design/icons";
import { isIndent } from "@/utils";

const WalletList = [
  {
    label: 'TokenPocket',
    value: 'TokenPocket',
    url: 'https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii',
    icon:'https://filscan-v2.oss-accelerate.aliyuncs.com/fvm_manage/images/TokenPocket.png'
  },
  {
    label: 'MetaMask',
    value: 'MetaMask',
    url: 'https://metamask.io/',
    icon:'https://filscan-v2.oss-accelerate.aliyuncs.com/fvm_manage/images/MetaMask.png'
  },

]

function Wallet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { wallet, setWallet } = useContext<any>(WalletStore);

  useEffect(() => {
    const objValue = JSON.parse(localStorage?.getItem("wallet") || "{}");
    const handleAccountsChanged = (accounts: any, other: any) => {
      if (
        objValue?.account !== wallet?.account
      ) {
        //退出登录
        localStorage.removeItem("wallet");
        window.location.reload();
      }
      else if (objValue?.account) {
        setWallet(objValue)
        localStorage.setItem('wallet', JSON.stringify(objValue))
      }
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    } else {
      console.log("=不支持钱包 || 未下载钱包");
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleClick = async (item: any) => {
    if (item.value === 'TokenPocket') {
      if (!window?.ethereum.isTokenPocket) {
        //dowm wallet
        window.open(item.url);
        window.location.reload()
      }
    }
    const chainId = await getNetWork();
    let account:any = ''
    if (!chainId) {
      // 切换网络
      const res = await addNetwork();
      if (res) {
        account = await connect_account()
      }
    } else {
      account = await connect_account()
    }
    const new_wallet = {
      wallet: item.value,
      account
    }
    localStorage.setItem('wallet', JSON.stringify(new_wallet))
    setWallet(new_wallet);
    setIsModalOpen(false)
  }

  const handleClickOut = () => {
    localStorage.removeItem('wallet')
    setWallet({
      wallet: '',
      account:''
    });
  }

  return <>
    {wallet.account ? <div >
      <div className="flex items-center gap-x-2 mt-4 ">
        <span className="w-fit cursor-pointer px-4 py-2 border border_color rounded-[5px]" onClick={() => {
          window.open(`${window.location.host}/address/${wallet.account}/`);
        }}>
          {`Connected - Web3 [${isIndent(wallet?.account, 4)}]`}
        </span>
        <span className="flex items-center justify-center w-9 h-9 border border_color rounded-[5px]" onClick={handleClickOut} >
          <LogoutOutlined rev={undefined} />
        </span>
      </div>

    </div>
      : <Button className="flex items-center justify-center px-4 py-2.5 mt-4 cursor-pointer !text-primary" onClick={() => setIsModalOpen(true)}>Connect Wallet</Button>}
    <Modal
      title="Connect a Wallet"
      className='custom_modal'
      width={600}
      open={isModalOpen}
      footer={ null}
      onCancel={() => setIsModalOpen(false)}>
      <div className={style.wallet_des} >
        { `Connecting wallet for read function is optional, useful if you want to call certain functions or simply use your wallet's node.`}
      </div>
      {WalletList.map((wallet_Item:any) => {
        return <div className={style.wallet_item} key={wallet_Item.value} onClick={ ()=>handleClick(wallet_Item)}>
          <Image className={ style.wallet_item_image} src={wallet_Item.icon} width={25} height={ 25} alt='' />
          <span className={ style.wallet_item_name}>{ wallet_Item.label}</span>
        </div>
      })}
    </Modal>
  </>
}

export default Wallet

