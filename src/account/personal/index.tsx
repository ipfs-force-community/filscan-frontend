/** @format */

import { Translation } from '@/components/hooks/Translation';
import { UserInfo } from '@/store/UserStore';
import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import user from '@/assets/images/user.svg';
import { formatDateTime, max_name_length, validatePassword } from '@/utils';
import { personal_setting } from '@/contents/account';
import { Button, Form, Input } from 'antd';
import useAxiosData from '@/store/useAxiosData';
import { proApi } from '@/contents/apiUrl';
import { useState } from 'react';
import { useRouter } from 'next/router';
import messageManager from '@/packages/message';
import { getSvgIcon } from '@/svgsIcon';

export default () => {
  const { tr } = Translation({ ns: 'account' });
  const [loading, setLoading] = useState(false);
  const { axiosData } = useAxiosData();
  const router = useRouter();
  const userInfo = UserInfo();
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [name,setName]= useState('')

  const handleSaveName = async () => {
    setEdit(false)
    const result = await axiosData(proApi.updateInfo, {
      name,
    });
    if (result) {
      messageManager.showMessage({
        type: 'success',
        content: 'Update successful',
      });
    }

  }

  const handleSave = async () => {
    setLoading(true);
    const payload = form.getFieldsValue();
    const result = await axiosData(proApi.updateInfo, {
      ...payload,
    });
    if (result) {
      const newInfo:any = await axiosData(proApi.userInfo);
      messageManager.showMessage({
        type: 'success',
        content: 'Update successful',
      });
      localStorage.removeItem('token');
      userInfo.setUserInfo({ })
      router.push('/account/login')
    }
    setLoading(false);
  };

  return (
    <>
      <p className='font-semibold text-lg	 font-PingFang'>{tr('personal')}</p>
      <div className='card_shadow mt-8 p-5 border border_color rounded-xl'>
        <div className='flex justify-between'>
          <div className='flex gap-x-2 items-center'>
            <Image src={logo} alt={'author'} width={60} height={60} />
            <div className='flex flex-col justify-start '>
              <div className='flex items-center gap-x-2'>
                {edit ? <Input defaultValue={userInfo.name}
                  showCount={true}
                  maxLength={10}
                  onChange={(e:any)=>setName(e.target.value)}
                  onPressEnter={handleSaveName}
                  onBlur={handleSaveName} /> :
                  <span className='font-PingFang font-semibold text-xl '>
                    {name||userInfo.name}
                  </span>
                }
                <span className='cursor-pointer' onClick={ ()=>setEdit(true)}>{getSvgIcon('editIcon')}</span>
              </div>
              <span className='text_des text-xs'>{userInfo.mail}</span>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <span className='des_bg_color flex gap-x-2 px-[6px] w-fit py-1 rounded-[5px]'>
              <Image src={user} width={20} height={20} alt='' />
              <span>{tr('default_user')}</span>
            </span>
            <span className='mt-2 text_des text-xs '>
              <span className='mr-2'>{tr('last_login')}:</span>
              {formatDateTime(userInfo.last_login)}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-5 card_shadow p-5 border border_color rounded-xl'>
        <p className='font-semibold text-lg	 font-PingFang'>
          {tr('personal_setting')}
        </p>

        <>
          <Form
            initialValues={{
              old_password: '',
              name: userInfo?.name||'' }}
            form={form}
            onFinish={handleSave}
            layout='vertical'
            className='w-3/5 min-w-[300px] mt-5'
          >
            {personal_setting.map((item: any) => {
              const objShow: any = {};
              if (item.dataIndex === 'name') {
                objShow.showCount = true;
                objShow.maxLength = max_name_length;
              }
              const newRules: any = [];
              item?.rules?.forEach((v: any) => {
                newRules.push({ ...v, message: tr(v.message) });
                if (item.name === 'name') {
                  newRules.push(() => ({
                    validator(_: any, value: any) {
                      if (
                        !value|| value.length < max_name_length
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(tr('name_length')));
                    },
                  }));
                }
                if (item.name === 'new_password') {
                  newRules.push(() => ({
                    validator(_: any, value: any) {
                      if (
                        !value ||
                          validatePassword(
                            value,
                            form.getFieldValue('old_password')
                          )
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(tr('password_rules')));
                    },
                  }));
                } else if (item.name === 'confirm_password') {
                  newRules.push(
                    ({ getFieldValue }: { getFieldValue: Function }) => ({
                      validator(_: any, value: any) {
                        if (
                          !value ||
                            getFieldValue('new_password') === value
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(tr('confirm_password_rules'))
                        );
                      },
                    })
                  );
                }
              });
              return (
                <Form.Item
                  rules={item.rules}
                  name={item.dataIndex}
                  label={tr(item.title)}
                  key={item.dataIndex}>
                  {item?.dataIndex?.includes('password') ? (
                    <Input.Password className='h-12 custom_input' {...objShow} defaultValue={''} placeholder={ tr(item.placeholder)} />
                  ) : (
                    <Input className='h-12 custom_input' defaultValue={''} {...objShow} placeholder={ tr(item.placeholder)}/>
                  )}
                </Form.Item>
              );
            })}
            <Form.Item className='mt-5 !w-full flex-1 flex gap-x-4 items-center justify-center'>
              <Button className='cancel_btn border border_color' onClick={() => {
                form.resetFields(['old_password','name','new_password','old_password'])
              }}
              >{tr('cancel')}</Button>
              <Button
                htmlType='submit'
                className='confirm_btn ml-5'
                loading={loading}
              >
                {tr('confirm')}
              </Button>
            </Form.Item>
          </Form>

        </>

      </div>
    </>
  );
};
