/** @format */

import { Translation } from '@/components/hooks/Translation'
import accountStore from '@/store/modules/account'
import { Modal, Input, Button } from 'antd'
import { useState } from 'react'

export default ({
  show,
  onChange,
}: {
  show: boolean
  onChange: (value: boolean) => void
}) => {
  const { tr } = Translation({ ns: 'account' })
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    //添加分组
    if (value.length > 0) {
      setLoading(true)
      await accountStore.saveGroups({ group_name: value })
      setLoading(false)
      onChange(false)
    }
  }

  return (
    <Modal
      width={400}
      title={tr('create_group')}
      open={show}
      destroyOnClose={true}
      closeIcon={false}
      footer={
        <span className="mt-5 flex justify-center gap-x-4">
          <Button
            className="cancel_btn"
            onClick={() => {
              onChange(false)
            }}
          >
            {tr('cancel')}
          </Button>
          <Button
            className="confirm_btn"
            loading={loading}
            onClick={handleClick}
          >
            {tr('confirm')}
          </Button>
        </span>
      }
    >
      <Input
        className="custom_input mt-5 h-12"
        showCount
        placeholder={tr('create_group_holder')}
        maxLength={10}
        onChange={(e: any) => {
          setValue(e.target.value)
        }}
      />
    </Modal>
  )
}
