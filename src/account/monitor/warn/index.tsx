import { Translation } from "@/components/hooks/Translation";
import styles from './index.module.scss'
import { Button, Checkbox, Input, Modal } from "antd"
import { useState } from "react";

interface Props { 
showModal?: boolean;
noModal?: boolean;
onChange:(type:string,value:any)=>void;
}
//告警方式

                        
 const default_email = { title: 'email_warn', value: 'email' };
 const default_message = { title: 'message_warn', value: 'message' };
 const default_phone =  {title: 'phone_warn',value: 'phone'}


export default (props: Props) => {
const { noModal = false, showModal = false, onChange } = props
              const { tr } = Translation({ ns: 'account' });      
              const [warnList, setWarnList] = useState<Record<string,any>>({
                            'email_warn': [{ ...default_email }],
                            'message_warn': [{ ...default_message }],
                            'phone_warn': [{ ...default_phone }]
              })              
const handleChange = (type: string) => { };

              const handleAdd = (type: string, warnKey: string) => { 
              console.log('----4',type,warnKey);
              const newWarn = {...warnList}
              if (type === 'add') { 
              if (warnKey === 'email_warn') {
              newWarn[warnKey].push({ ...default_email })
              } else if (warnKey === 'phone_warn') {
              newWarn[warnKey].push({ ...default_phone })
              } else if (warnKey === 'message_warn') { 
              newWarn[warnKey].push({ ...default_message })
              }
              }
                            
}
              

 const warnHeader = () => { 
 return <div className={ styles.warn_header}>
              {tr('warn_title')}
              <span className={styles.warn_header_des }>{ tr('warn_title_des')}</span>
              </div>
 }
              
const renderChildren = () => { 
              return <div>
              {Object.keys(warnList).map((warnKey:string) => { 
              const warnItem = warnList[warnKey];
              return <div key={warnKey } className={styles.warn_content}>
                            {warnItem.map((warn: any, index: number) => { 
                                          const showIcon = index === warnItem.length - 1;
                            return <div key={index} className={styles.warn_content_item}>
                                          <div className={styles.warn_content_item_title}>
                                          <Checkbox />
                                          {tr(warn.title)}
                                          </div>
                                          <div className={styles.warn_content_item_main}>
                                                        <Input className={`custom_input ${styles.warn_content_item_main_input}`} />
                                                        {showIcon && <>
                                                        <div className={styles.warn_content_item_main_icon} onClick={()=>handleAdd('add',warnKey)}>+</div>
                                                        </>}
                                                       <div className={styles.warn_content_item_main_icon}>-</div>
                                          </div>
                                          </div>
                            })}
               </div>
              })}
 </div>
}
              
if (noModal) { 
              return <div className={styles.warn}>
              <div className={styles.warn_header}>
              {warnHeader()}    
              </div>
              {renderChildren() }    
              </div>          

}            
            
return <Modal
    title={warnHeader()}
    destroyOnClose={true}
    closeIcon={false}
    wrapClassName="custom_left_modal"
    open={showModal}
    onOk={() => { handleChange('ok') }}
    onCancel={() => onChange('cancel', false)}
    footer={[
      <Button className="cancel_btn" onClick={()=>onChange('cancel',false) }>{ tr('cancel')}</Button>,
      <Button className="primary_btn" onClick={()=>handleChange('ok') }>{ tr('confirm')}</Button>
]}>
              
  </Modal>
}