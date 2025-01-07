import Wallet from '@/components/wallet'
import { useEffect, useMemo, useState } from 'react'
import { EnterOutlined } from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import { addNetwork, getNetWork } from '@/store/wallet'
import Web3 from 'web3'
import NoData from '@/packages/noData'
import walletStore from '@/store/modules/wallet'

import Show from './show'
import { observer } from 'mobx-react'

const web3 = new Web3(window.ethereum)
export default observer(
  ({
    verifyData,
    actorId,
    type,
  }: {
    verifyData: any
    type: string
    actorId?: string
  }) => {
    const { account } = walletStore
    const [showValue, setShowValue] = useState<Record<string, any>>({})
    const [result, setResult] = useState<Record<string, any>>({})

    useEffect(() => {
      setResult({})
      setShowValue({})
    }, [actorId])

    const abiData = useMemo(() => {
      const newData: any = []
      if (verifyData) {
        verifyData.ABI &&
          JSON.parse(verifyData.ABI).forEach((v: any) => {
            if (v.type === 'function') {
              if (type === 'view') {
                //只读
                if (
                  v?.stateMutability === 'view' ||
                  v.stateMutability === 'pure'
                ) {
                  newData.push(v)
                }
              } else {
                //读写
                if (
                  v?.stateMutability !== 'view' &&
                  v.stateMutability !== 'pure'
                ) {
                  newData.push(v)
                }
              }
            }
          })
      }
      return newData
    }, [verifyData, type])

    const contract: any = useMemo(() => {
      if (verifyData) {
        return new web3.eth.Contract(
          JSON.parse(verifyData.ABI),
          verifyData.contract_address,
        )
      }
    }, [verifyData])

    const handleQuery = async (
      name: string,
      payloadKey: { name: string; type: string }[],
    ) => {
      if (account) {
        const network = await getNetWork()
        if (!network) {
          const add_net = await addNetwork()
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

    const handleChange = async (
      abiName: string,
      payloadKey: { name: string; type: string }[],
    ) => {
      const show_payload: any[] = []
      payloadKey.forEach((payload) => {
        if (payload.type.includes('[]')) {
          const value = showValue[payload.name].split(',')
          show_payload.push(value)
        } else {
          show_payload.push(showValue[payload.name])
        }
      })

      let res: any
      if (type === 'view') {
        res = await contract.methods[abiName](...show_payload).call()
      } else {
        const res1 = await contract.methods[abiName](...show_payload).send({
          from: account,
        })
        res = !!res1
      }
      setResult({
        ...result,
        [abiName]: {
          showLabel: abiName,
          value: String(res),
        },
      })
    }
    return (
      <div>
        <Wallet />
        <ul className="mt-5 flex flex-col gap-y-2.5">
          {verifyData && abiData.length === 0 && (
            <NoData
              text={
                type === 'view'
                  ? 'Sorry, there are no available Contract ABI methods to read. Unable to read contract info.'
                  : 'Sorry, no public Write functions were found for this contract.'
              }
            />
          )}
          {abiData.map((abi: any, index: number) => {
            const payloadKey: { name: string; type: string }[] = []
            return (
              <Show key={index} title={`${index + 1}.${abi?.name}`}>
                <>
                  {abi?.inputs?.map((item_input: any, index: number) => {
                    payloadKey.push({
                      name: `${abi?.name}/${item_input.name}`,
                      type: item_input?.type,
                    })
                    const placeholder = item_input?.type.includes('[]')
                      ? `${item_input?.name} (${item_input?.type}) Please use ',' to separate`
                      : `${item_input?.name} (${item_input?.type})`
                    return (
                      <div
                        key={index}
                        className="flex w-full flex-col gap-y-2.5 "
                      >
                        <span>
                          {item_input?.name} ({item_input?.type})
                        </span>
                        <Input
                          className={'custom_input'}
                          placeholder={placeholder}
                          value={
                            showValue[`${abi?.name}/${item_input.name}`] &&
                            String(showValue[`${abi?.name}/${item_input.name}`])
                          }
                          onChange={(e: any) => {
                            const value = item_input?.type?.startsWith('uint')
                              ? Number(e.target.value)
                              : e.target.value
                            setShowValue({
                              ...showValue,
                              [`${abi?.name}/${item_input.name}`]: value,
                            })
                          }}
                        />
                      </div>
                    )
                  })}
                  <Button
                    className={`cancel_btn`}
                    style={{ marginTop: abi?.inputs?.length > 0 ? '10px' : '' }}
                    onClick={() => handleQuery(`${abi?.name}`, payloadKey)}
                  >
                    {type === 'view' ? 'Query' : 'Write'}
                  </Button>
                  {abi?.outputs?.length > 0 && type === 'view' && (
                    <div>
                      {abi.outputs.map((item_output: any, outIndex: number) => {
                        return (
                          <div
                            style={{
                              paddingTop: abi?.inputs?.length > 0 ? '0px' : '',
                            }}
                            key={outIndex}
                          >
                            {abi?.inputs?.length > 0 && <EnterOutlined />}
                            <span>
                              {item_output?.name}
                              <span> ({item_output?.type})</span>
                            </span>
                          </div>
                        )
                      })}
                      {result[abi.name] && (
                        <div>
                          <div>
                            [{result[abi.name].showLabel}] method Response
                          </div>
                          <div>{result[abi.name].value}</div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              </Show>
            )
          })}
        </ul>
      </div>
    )
  },
)
