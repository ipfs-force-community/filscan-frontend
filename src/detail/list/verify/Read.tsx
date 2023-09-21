import Wallet from "@/components/wallet"
import { useContext, useEffect, useMemo, useState } from "react"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Input, message } from "antd"
import WalletStore, { addNetwork, getNetWork } from "@/store/wallet";
import Web3 from 'web3';
import NoData from '@/packages/noData';

import Show from "./show"

const web3 = new Web3(window.ethereum);
export default ({ verifyData, actorId, type }: { verifyData: any, type: string, actorId?: string }) => {
  const { wallet, setWallet } = useContext<any>(WalletStore);
  const [showValue, setShowValue] = useState<Record<string, any>>({})
  const [result, setResult] = useState<Record<string, any>>({})

  useEffect(() => {
    setResult({});
    setShowValue({})
  }, [actorId])

  const abiData = useMemo(() => {
    if (verifyData) {
      return verifyData.ABI&&JSON.parse(verifyData.ABI).filter((v: any) => {
        if (type === 'view') {
          //只读
          return v?.stateMutability === 'view' || v.stateMutability ==='pure'
        }
        //读写
        return v?.stateMutability !== 'view' && v?.stateMutability !== 'pure'&&v.type !=='constructor'
      })
    }

  }, [verifyData, type])

  const contract:any = useMemo(() => {
    if (verifyData) {
      return new web3.eth.Contract(JSON.parse(verifyData.ABI), verifyData.contract_address);
    }

  }, [verifyData])

  const handleQuery = async (name: string, payloadKey: { name: string, type: string }[]) => {
    if (wallet.account) {
      const network = await getNetWork();
      if (!network) {
        const add_net = await addNetwork();
        if (add_net) {
          handleChange(name, payloadKey)
        }
      } else {
        handleChange(name, payloadKey)
      }
    } else {
      message.warning('please connect wallet')
    }
  }

  const handleChange = async (abiName: string, payloadKey: {name:string,type:string}[]) => {
    const show_payload:any[] = [];
    payloadKey.forEach((payload) => {
      if (payload.type.includes('[]')) {
        const value = showValue[payload.name].split(',');
        show_payload.push(value)
      } else {
        show_payload.push(showValue[payload.name])
      }
    })

    let res:any;
    if (type === 'view') {
      res = await contract.methods[abiName](...show_payload).call();
    } else {
      const res1 = await contract.methods[abiName](...show_payload).send({
        from: wallet.account,
      });
      res = !!res1
    }
    setResult({
      ...result, [abiName]: {
        showLabel: abiName,
        value:String(res)
      }})
  }
  return <div>
    <Wallet />
    <ul className="flex flex-col gap-y-2.5 mt-5">
      { verifyData && abiData.length === 0 && <NoData />}
      {abiData.map((abi: any, index: number) => {
        const payloadKey: {name:string,type:string}[]=[]
        return <Show key={index} title={`${index + 1}.${abi?.name}`}>
          <>
            {abi?.inputs?.map((item_input: any, index: number) => {
              payloadKey.push({
                name: `${abi?.name}/${item_input.name}`,
                type:item_input?.type
              })
              const placeholder = item_input?.type.includes('[]') ?`${item_input?.name} (${ item_input?.type}) Please use ',' to separate`:`${item_input?.name} (${ item_input?.type})`
              return <div key={index} className="flex flex-col w-full gap-y-2.5 ">
                <span>
                  {item_input?.name} ({ item_input?.type})
                </span>
                <Input className={'custom_input'}
                  placeholder={placeholder}
                  value={showValue[`${abi?.name}/${item_input.name}`] && String(showValue[`${abi?.name}/${item_input.name}`])}
                  onChange={(e: any) => {
                    const value =item_input?.type?.startsWith('uint')? Number(e.target.value): e.target.value;
                    setShowValue({...showValue,[`${abi?.name}/${item_input.name}`]:value})
                  }} />
              </div>
            })}
            <Button className={`cancel_btn`} style={{ marginTop: abi?.inputs?.length > 0 ? '10px' : '' }}
              onClick={() => handleQuery(`${abi?.name}`, payloadKey)}>{type === 'view' ? "Query" : 'Write'}</Button>
            {abi?.outputs?.length > 0 && type === 'view' && <div>
              {abi.outputs.map((item_output:any,outIndex:number) => {
                return <div style={{ paddingTop: abi?.inputs?.length > 0 ? '0px' : '' }} key={ outIndex}>
                  {abi?.inputs?.length > 0 && <EnterOutlined />}
                  <span >
                    {item_output?.name}
                    <span > ({item_output?.type})</span>
                  </span>

                </div>
              })}
              {result[abi.name] && <div>
                <div >[{result[abi.name].showLabel}] method Response</div>
                <div >{ result[abi.name].value}</div>
              </div>}
            </div>
            }
          </>
        </Show>
      })
      }
    </ul>
  </div>
}