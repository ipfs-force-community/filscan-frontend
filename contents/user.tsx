import { LockOutlined, MailOutlined } from '@ant-design/icons'

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
