import { useHash } from '@/components/hooks/useHash'
import First from '@/src/contract/verify/first'
import Verify from '@/src/contract/verify'
//验证合约
export default () => {
  const { hashParams } = useHash()
  //验证合约
  return (
    <div className="main_contain">
      {hashParams?.contractAddress ? <Verify /> : <First />}
    </div>
  )
}
