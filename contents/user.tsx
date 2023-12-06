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
import UserIcon from '@/assets/images/user.svg'
import Vip from '@/assets/images/member/vip.svg'

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
      prefix: <i className="ri-shield-check-line custom_remix-icon" />,
      rules: [{ required: true, message: 'Code is required' }],
    },
    {
      label: 'invite',
      name: 'invite',
      placeholder: 'invite_placeholder',
      prefix: <i className="ri-p2p-line custom_remix-icon"></i>,
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
      prefix: <i className="ri-p2p-line custom_remix-icon"></i>,
      rules: [{ required: true, message: 'Password is required' }],
    },
  ],
}
export const personal_list = [
  {
    title: 'personal_1',
    key: 'member',
    icon: <Vip />,

    // title_des: 'personal_1_des',
  },
  {
    title: 'personal_2',
    key: 'mail',
    // title_des: 'personal_1_des',
  },
  {
    title: 'personal_3',
    key: 'password',
    // title_des: 'personal_1_des',
  },
]

export const personal_setting = [
  // {
  //   title: 'personal_name',
  //   dataIndex: 'name',
  //   placeholder: 'personal_name_holder',
  // },
  {
    title: 'old_password',
    placeholder: 'old_placeholder',
    dataIndex: 'old_password',
    rules: [{ required: true, message: 'old_placeholder is required' }],
  },
  {
    title: 'new_password',
    placeholder: 'new_placeholder',
    dataIndex: 'new_password',
    rules: [{ required: true, message: '${new_password} is required' }],
  },
  {
    title: 'confirm_password',
    dataIndex: 'confirm_password',
    placeholder: 'confirm_password',
    rules: [{ required: true, message: '${confirm_password} is required' }],
  },
]
