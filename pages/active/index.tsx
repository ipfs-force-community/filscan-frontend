import { Translation } from '@/components/hooks/Translation'

export default () => {
  const { tr } = Translation({ ns: 'common' })

  return (
    <div className="main_contain">
      <div>{tr('active')}</div>
    </div>
  )
}
