import { Translation } from '@/components/hooks/Translation'
import styles from './index.module.scss'
import { Button, Checkbox, Input, Modal, Space } from 'antd'
import { useEffect, useState } from 'react'
import { isEmail, isPhone } from '@/utils'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { defaultWarn } from '@/contents/account'
import { getSvgIcon } from '@/svgsIcon'
import messageManager from '@/packages/message'

interface Props {
  showModal?: boolean
  noModal?: boolean
  warnData?: Record<string, any>
  onChange: (type: string, value: any) => void
}

export default (props: Props) => {
  const { noModal = false, showModal = false, warnData, onChange } = props
  const { tr } = Translation({ ns: 'account' })
  const [warnList, setWarnList] = useState<Record<string, any>>({
    email_warn: [{ ...defaultWarn.email_warn }],
    message_warn: [{ ...defaultWarn.message_warn }],
    phone_warn: [{ ...defaultWarn.phone_warn }],
  })

  useEffect(() => {
    if (warnData && Object.keys(warnData).length > 0) {
      setWarnList(warnData)
    } else {
      setWarnList({
        email_warn: [{ ...defaultWarn.email_warn }],
        message_warn: [{ ...defaultWarn.message_warn }],
        phone_warn: [{ ...defaultWarn.phone_warn }],
      })
    }
  }, [warnData])

  const handleWarn = (
    type: string,
    warnKey: string,
    index: number,
    value?: string | boolean,
  ) => {
    const newWarn = { ...warnList }
    switch (type) {
      case 'add':
        if (newWarn[warnKey].length >= 3) {
          return messageManager.showMessage({
            type: 'error',
            content: tr('warn_more'),
          })
        }
        if (warnKey === 'email_warn') {
          newWarn[warnKey].push({ ...defaultWarn.email_warn })
        } else if (warnKey === 'phone_warn') {
          newWarn[warnKey].push({ ...defaultWarn.phone_warn })
        } else if (warnKey === 'message_warn') {
          newWarn[warnKey].push({ ...defaultWarn.message_warn })
        }
        break
      case 'delete':
        newWarn[warnKey].splice(index, 1)
        break
      case 'warning':
        if (typeof value === 'string' && value) {
          if (warnKey === 'email_warn') {
            if (!isEmail(value)) {
              newWarn[warnKey][index].warning = true
            } else {
              newWarn[warnKey][index].warning = false
            }
          } else if (warnKey !== 'email_warn') {
            if (!isPhone(value)) {
              //校验手机号
              newWarn[warnKey][index].warning = true
            } else {
              newWarn[warnKey][index].warning = false
            }
          }
        } else {
          newWarn[warnKey][index].warning = false
        }
        newWarn[warnKey][index].inputValue = value
        break
      case 'checkbox':
        newWarn[warnKey][index].checked = value
        break
    }
    if (onChange && noModal) {
      onChange('warnOk', newWarn)
    }
    setWarnList({ ...newWarn })
  }

  const warnHeader = () => {
    return (
      <div className={styles.warn_header}>
        {tr('warn_title')}
        <span className={styles.warn_header_des}>{tr('warn_title_des')}</span>
      </div>
    )
  }

  const renderChildren = () => {
    return (
      <div>
        {Object.keys(warnList).map((warnKey: string) => {
          const warnItem = warnList[warnKey]
          return (
            <div key={warnKey} className={styles.warn_content}>
              {warnItem.map((warn: any, index: number) => {
                const showIcon = index === warnItem.length - 1
                return (
                  <div
                    key={warnKey + index}
                    className={styles.warn_content_item}
                  >
                    {index === 0 && (
                      <div className={styles.warn_content_item_title}>
                        <Checkbox
                          checked={warn.checked}
                          className="custom_checkbox"
                          onChange={(e: CheckboxChangeEvent) =>
                            handleWarn(
                              'checkbox',
                              warnKey,
                              index,
                              e.target.checked,
                            )
                          }
                        />
                        {tr(warn.title)}
                      </div>
                    )}
                    <div className={styles.warn_content_item_main}>
                      {warnKey !== 'email_warn' ? (
                        <Space.Compact className={styles.warn_content_inputs}>
                          <Input style={{ width: '50px' }} value="+86" />
                          <Input
                            key={warnKey + index + warn.inputValue}
                            style={{ borderColor: warn.warning ? 'red' : '' }}
                            className={`custom_input ${styles.warn_content_item_main_input}`}
                            defaultValue={warn.inputValue}
                            placeholder={tr(warn.placeholder)}
                            onBlur={(e) =>
                              handleWarn(
                                'warning',
                                warnKey,
                                index,
                                e.target.value,
                              )
                            }
                          />
                        </Space.Compact>
                      ) : (
                        <Input
                          key={warnKey + index + warn.inputValue}
                          style={{ borderColor: warn.warning ? 'red' : '' }}
                          className={`custom_input ${styles.warn_content_item_main_input}`}
                          defaultValue={warn.inputValue}
                          placeholder={tr(warn.placeholder)}
                          onBlur={(e) =>
                            handleWarn(
                              'warning',
                              warnKey,
                              index,
                              e.target.value,
                            )
                          }
                        />
                      )}
                      {showIcon && (
                        <>
                          <div
                            className={styles.warn_content_item_main_icon}
                            onClick={() => handleWarn('add', warnKey, index)}
                          >
                            {getSvgIcon('add')}
                          </div>
                        </>
                      )}
                      {index !== 0 && (
                        <div
                          className={styles.warn_content_item_main_icon}
                          onClick={() => handleWarn('delete', warnKey, index)}
                        >
                          {getSvgIcon('cancel')}
                        </div>
                      )}
                    </div>
                    {warn.warning && (
                      <div className={styles.warn_warning}>
                        {tr(warn.warningText)}
                      </div>
                    )}
                    {warnKey === 'email_warn' && showIcon && (
                      <div className={styles.warn_des}>
                        {tr('email_warn_des')}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  if (noModal) {
    return (
      <div className={styles.warn}>
        <div className={styles.warn_header}>{warnHeader()}</div>
        {renderChildren()}
      </div>
    )
  }

  return (
    <Modal
      title={warnHeader()}
      destroyOnClose={true}
      closeIcon={false}
      wrapClassName="custom_left_modal"
      open={showModal}
      onOk={() => {
        onChange('warnOk', warnList)
      }}
      onCancel={() => onChange('cancel', false)}
      footer={[
        <Button
          className="cancel_btn"
          key="cancel_btn"
          onClick={() => onChange('cancel', false)}
        >
          {tr('cancel')}
        </Button>,
        <Button
          className="primary_btn"
          key="primary_btn"
          onClick={() => onChange('warnOk', warnList)}
        >
          {tr('confirm')}
        </Button>,
      ]}
    ></Modal>
  )
}
