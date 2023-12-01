/** @format */

import { Translation } from '@/components/hooks/Translation'
import { getSvgIcon } from '@/svgsIcon'
import Link from 'next/link'

export default ({ selectedKey }: { selectedKey: string }) => {
  const { tr } = Translation({ ns: 'account' })

  return (
    <>
      <p className="mb-5 w-full font-HarmonyOS	text-lg font-semibold	">
        {tr(selectedKey)}
      </p>
      <div
        className="mt-20 flex w-full flex-1 flex-col items-center
          justify-center gap-y-5"
      >
        <span>{getSvgIcon('no_nodes')}</span>
        <span className="flex gap-x-2">
          {tr('no_node_data')}
          <Link rel="" href={`/account#miners?type=miner_add`}>
            {tr('miners_add')}
          </Link>
        </span>
      </div>
    </>
  )
}
