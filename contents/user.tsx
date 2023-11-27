import PowerIcon from '@/assets/images/member/memberPower.svg'
import BalanceIcon from '@/assets/images/member/memberBalance.svg'
import SectorIcon from '@/assets/images/member/memberSector.svg'
import EmailIcon from '@/assets/images/member/email.svg'
import MsgIcon from '@/assets/images/member/msg.svg'
import PhoneIcon from '@/assets/images/member/phone.svg'
import PowerWarnIcon from '@/assets/images/member/power.svg'
import BalanceWarnIcon from '@/assets/images/member/balance.svg'
import SectorWarnIcon from '@/assets/images/member/sector.svg'
import Companies from '@/assets/images/member/companies.svg'
import CompaniesPro from '@/assets/images/member/companiesPro.svg'
import CompaniesV from '@/assets/images/member/companiesV.png'
import CompaniesVPro from '@/assets/images/member/companiesVPro.png'
import Image from 'next/image'

export const logTabs = [
  {
    title: 'password_login',
    dataIndex: 'password',
  },
  {
    title: 'verification_code',
    dataIndex: 'code',
  },
]

export const login_list: Record<string, any> = {
  password: [
    {
      label: 'email',
      name: 'email',
      prefix: <i className="ri-mail-line custom_remix-icon" />,
      placeholder: 'email_placeholder',
      rules: [{ required: true, message: 'Email is required' }],
    },
    {
      label: 'password',
      name: 'password',
      placeholder: 'password_placeholder',
      prefix: <i className="ri-lock-2-line custom_remix-icon" />,
      rules: [{ required: true, message: 'Password is required' }],
    },
  ],
  code: [
    {
      label: 'email',
      name: 'email',
      prefix: <i className="ri-mail-line custom_remix-icon" />,
      placeholder: 'email_placeholder',
      rules: [{ required: true, message: 'Email is required' }],
    },
    {
      label: 'code',
      name: 'code',
      placeholder: 'code_placeholder',
      prefix: <i className="ri-shield-check-lin custom_remix-icon" />,
      rules: [{ required: true, message: 'Code is required' }],
    },
    {
      label: 'invite',
      name: 'invite',
      placeholder: 'invite_placeholder',
      prefix: <i className="ri-mail-send-line custom_remix-icon"></i>,
      rules: [{ required: true, message: 'Password is required' }],
    },
  ],
  forget: [
    {
      label: 'email',
      name: 'email',
      prefix: <i className="ri-mail-line custom_remix-icon" />,
      placeholder: 'email_placeholder',
      rules: [{ required: true, message: 'Email is required' }],
    },
    {
      label: 'code',
      name: 'code',
      placeholder: 'code_placeholder',
      prefix: <i className="ri-shield-check-line custom_remix-icon" />,
      rules: [{ required: true, message: 'Code is required' }],
    },
    {
      label: 'password',
      name: 'new_password',
      placeholder: 'new_password',
      prefix: <i className="ri-lock-2-line custom_remix-icon" />,
      rules: [{ required: true, message: 'Password is required' }],
    },
    {
      label: 'password',
      name: 'confirm_password',
      placeholder: 'confirm_password',
      prefix: <i className="ri-lock-2-line custom_remix-icon" />,
      rules: [{ required: true, message: 'Confirm assword is required' }],
    },
  ],
  register: [
    {
      label: 'email',
      name: 'email',
      prefix: <i className="ri-mail-line custom_remix-icon" />,
      placeholder: 'email_placeholder',
      rules: [{ required: true, message: 'Email is required' }],
    },
    {
      label: 'code',
      name: 'code',
      placeholder: 'code_placeholder',
      prefix: <i className="ri-shield-check-line custom_remix-icon" />,
      rules: [{ required: true, message: 'Code is required' }],
    },
    {
      label: 'password',
      name: 'new_password',
      placeholder: 'new_password',
      prefix: <i className="ri-lock-2-line custom_remix-icon" />,
      rules: [{ required: true, message: 'Password is required' }],
    },
    {
      label: 'password',
      name: 'confirm_password',
      placeholder: 'confirm_password',
      prefix: <i className="ri-lock-2-line custom_remix-icon" />,
      rules: [{ required: true, message: 'Confirm password is required' }],
    },
    {
      label: 'invite',
      name: 'invite',
      placeholder: 'invite_placeholder',
      prefix: <i className="ri-mail-send-line custom_remix-icon"></i>,
      rules: [{ required: true, message: 'Password is required' }],
    },
  ],
}

export const member_list_1 = [
  {
    icon: <PowerIcon />,
    title: 'power_title',
    value: 'power_text',
  },
  {
    icon: <BalanceIcon />,
    title: 'balance_title',
    value: 'balance_text',
  },
  {
    icon: <SectorIcon />,
    title: 'sector_title',
    value: 'sector_text',
  },
]

export const member_list_2 = [
  {
    title: [
      {
        icon: <PowerWarnIcon />,
        title: 'warn_power',
      },
      {
        icon: <BalanceWarnIcon />,
        title: 'warn_balance',
      },
      {
        icon: <SectorWarnIcon />,
        title: 'warn_sector',
      },
    ],
    content: 'data_text',
  },
  {
    title: [
      {
        icon: <EmailIcon />,
        title: 'warn_email',
      },
      {
        icon: <MsgIcon />,
        title: 'warn_msg',
      },
      {
        icon: <PhoneIcon />,
        title: 'warn_phone',
      },
    ],
    content: 'warn_text',
  },
]

export const member_main = [
  {
    title: 'companies',
    icon: <Image src={CompaniesV} alt="" width={106} />,
    list: [
      { title: 'companies_1', icon: <Companies /> },
      { title: 'companies_2', icon: <Companies /> },
      { title: 'companies_3', icon: <Companies /> },
      { title: 'companies_4', icon: <Companies /> },
      { title: 'companies_5', icon: <Companies /> },
    ],
    priceList: [
      { title: 'monthly', price: '169U' },
      {
        title: 'quarter',
        price: '439U',
        discount: 'quarter_discount',
      },
      { title: 'year', price: '1599U', discount: 'year_discount' },
    ],
  },
  {
    title: 'companiesPro',
    icon: <Image src={CompaniesVPro} alt="" width={106} />,
    list: [
      { title: 'companies_1', icon: <CompaniesPro /> },
      { title: 'companies_2', icon: <CompaniesPro /> },
      { title: 'companies_3', icon: <CompaniesPro /> },
      { title: 'companies_4', icon: <CompaniesPro /> },
      { title: 'companies_6', icon: <CompaniesPro /> },
      { title: 'companies_5', icon: <CompaniesPro /> },
    ],
    priceList: [
      { title: 'monthly', price: '169U' },
      {
        title: 'quarter',
        price: '439U',
        discount: 'quarter_discount',
      },
      { title: 'year', price: '1599U', discount: 'year_discount' },
    ],
  },
]