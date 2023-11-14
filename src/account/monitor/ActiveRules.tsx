import { Translation } from '@/components/hooks/Translation'
import { Button, Modal, Switch } from 'antd'
import { useMemo, useState } from 'react'

export default ({
  text,
  onChange,
  title,
}: {
  title: string
  text: boolean
  onChange: () => void
}) => {
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(false)
    onChange()
  }

  const content = useMemo(() => {
    if (title === 'isActive') {
      return ['edit_status', 'edit_status_content']
    } else if (title === 'edit_delete') {
      return ['delete_rule', 'delete_rule_content']
    }
    return []
  }, [title])
  return (
    <>
      {title === 'edit_delete' && (
        <span
          className="cursor-pointer text-primary"
          onClick={() => setShow(true)}
        >
          {tr('edit_delete')}
        </span>
      )}
      {title === 'isActive' && (
        <Switch
          className="custom_switch"
          checked={!!text}
          onChange={() => {
            setShow(true)
          }}
        />
      )}
      <Modal
        title={`${tr(content[0])}`}
        destroyOnClose={true}
        width={700}
        closeIcon={false}
        wrapClassName="custom_left_modal"
        open={show}
        onOk={handleClick}
        footer={[
          <Button
            className="cancel_btn"
            key="cancel_btn"
            onClick={() => {
              setShow(false)
            }}
          >
            {tr('cancel')}
          </Button>,
          <Button
            className="primary_btn"
            key="confirm_btn"
            onClick={handleClick}
          >
            {tr('confirm')}
          </Button>,
        ]}
      >
        <div className="m-4">{tr(content[1])}</div>
      </Modal>
    </>
  )
}
