import Link from 'next/link'
import Copy from '@/components/copy'
import { formatDateTime } from '@/utils'
import { getSvgIcon } from '@/svgsIcon'

export const domain_card = {
  content: [
    { dataIndex: 'resolved_address', title: 'resolved_address' },
    {
      dataIndex: 'expired_at',
      title: 'expired_at',
      render: (text: any) => formatDateTime(text),
    },
    {
      dataIndex: 'registrant',
      title: 'registrant',
      render: (text: string, record: any) => {
        if (!text) {
          return '--'
        }
        return (
          <span className="flex items-center gap-x-2">
            <Link className="link" href={`/address/${text}`}>
              {text}{' '}
            </Link>
            <Copy text={text} />
            <span className="ml-5 flex items-center gap-x-2">
              <Link href={`/name/${text}?type=registrant`}>
                <span style={{ textDecoration: 'underline' }}>
                  Lookup Names{' '}
                </span>
              </Link>
              {getSvgIcon('search')}
            </span>
          </span>
        )
      },
    },

    {
      dataIndex: 'controller',
      title: 'controller',
      render: (text: string, record: any) => {
        if (!text) {
          return '--'
        }
        return (
          <span className="flex items-center gap-x-2">
            <Link className="link" href={`/address/${text}`}>
              {text}{' '}
            </Link>
            <Copy text={text} />
            <span className="ml-5 flex items-center gap-x-2">
              <Link href={`/name/${text}?type=controller`}>
                <span style={{ textDecoration: 'underline' }}>
                  Lookup Names{' '}
                </span>
              </Link>
              {getSvgIcon('search')}
            </span>
          </span>
        )
      },
    },
  ],
}

export const domain_name_catd = {
  content: [
    {
      dataIndex: '',
      title: (tr: any) => {
        return <span className="font_16 font_weight">{tr('domain_title')}</span>
      },
      render: (text: any) => null,
    },
    { dataIndex: 'resolvedAddress', title: 'resolved_address' },
    {
      dataIndex: 'registrant',
      title: 'registrant',
      render: (text: string) => {
        return (
          <Link className="link" href={`/address/${text}`}>
            {text}{' '}
          </Link>
        )
      },
    },
  ],
}
