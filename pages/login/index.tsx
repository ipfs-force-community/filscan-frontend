
import { Translation } from '@/components/hooks/Translation';
import { useHash } from '@/components/hooks/useHash';
import styles from './index.module.scss'
import User from '@/src/user'
import Link from 'next/link';
import SendCode from '@/src/account/sendCode';
import userStore from '@/store/modules/user';
import { useMemo } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { logTabs, login_list } from '@/contents/user';
import { isEmail } from '@/utils';

export default () => {
  const { tr } = Translation({ ns: 'common' });
  const { hashParams } = useHash();
  const [form] = Form.useForm();

  const type = useMemo(() => {
    if (hashParams.type) {
      return hashParams.type
    }
    return 'password';
  }, [hashParams.type])

  const onFinish = async () => {
    console.log('----e finish', form)
    const data = form.getFieldsValue();
    const payload = {
      ...data,
      mail: data.email,
    }
    userStore.loginUserInfo(payload)

    //登录
    //     const data = form.getFieldsValue();
    //     const result: any = await axiosData(proApi.login, {
    //       ...data,
    //       mail: data.email,
    //       token: token||localStorage.getItem('send_code')
    //     });
    //     if (result?.token) {
    //       localStorage.setItem('token', result.token);
    //       localStorage.setItem('expired_at', result.expired_at); //过期时间
    //       userStore.setUserInfo({
    //         last_login: result?.expired_at || '',
    //         mail: data?.email || result?.mail,
    //         name: result?.name,
    //       });
    //       localStorage.setItem('token',result?.token);
    //       messageManager.showMessage({
    //         type: 'success',
    //         content: 'login successful',
    //       });
    //       router.push('/account#overview')
    //     }
  };

  const renderChildren = (item:any) => {
    let content;
    const newRules: any = [];
    switch (item.name) {
    case 'email':
      newRules.push( newRules.push(() => ({
        async validator(_: any, value: any) {
          if (isEmail(value)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(tr('email_rules')));
        },
      })))
      content = <Input className={`custom_input ${styles.contain_input}` } prefix={item.prefix} />
      break;
    case 'password':
      content = <Input.Password
        className={`custom_input ${styles.contain_input}`}
        prefix={item.prefix}
        placeholder={tr(item.placeholder)}
      />
      break;
    }
    return <Form.Item name={item.name} key={item.name} rules={newRules} className={styles.container_main_item}>
      { content}
    </Form.Item>
  }

  return <User>
    <div className={ styles.contain}>
      <ul className={ styles.contain_header}>
        {logTabs?.map((log_item, index) => {
          return (
            <Link
              className={`${styles.contain_header_link} ${type === log_item.dataIndex ? styles.active:''}`}
              href={`/login?type=${log_item.dataIndex}`}
              key={index}
              scroll={false}
              id={log_item.dataIndex}
            >
              {tr(log_item.title)}
            </Link>
          );
        })}
      </ul>
      <Form
        form={form}
        size='large'
        validateTrigger='submit'
        className={`custom_form ${styles.container_main} `}
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        {login_list[type]?.map((item:any) => {
          return renderChildren(item)
        })}
        <Form.Item
          name='remember'
          valuePropName='checked'
        >
          <div className={ styles.remember}>
            <Checkbox className='custom_checkbox !text_color' defaultChecked={true}>{tr('remember_me')}</Checkbox>
            <Link href='/account/password'>{tr('forgot_password')}</Link>
          </div>
        </Form.Item>
        <Form.Item className={ styles.submit}>
          <Button
            htmlType='submit'
            className='!w-full primary_btn'>
            {tr('login')}
          </Button>
        </Form.Item>
      </Form>
    </div>

  </User>
}