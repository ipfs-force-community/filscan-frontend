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
import Success from '../success';

export default () => {
  const { tr } = Translation({ ns: 'account' });
  const [loading, setLoading] = useState(false);
  const { axiosData } = useAxiosData();
  const [success, setSuccess] = useState(false);

  const userInfo = UserInfo();
  const [form] = Form.useForm();

  const handleSave = async () => {
    setLoading(true);
    const payload = form.getFieldsValue();
    const result = await axiosData(proApi.updateInfo, {
      ...payload,
    });
    if (result) { 
      const newInfo:any = await axiosData(proApi.userInfo);
      userInfo.setUserInfo({...newInfo, last_login: newInfo?.last_login_at || ''})
    }
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <p className='font-semibold text-lg	 font-PingFang'>{tr('personal')}</p>
      <div className='card_shadow mt-8 p-5 border border_color rounded-xl'>
        <div className='flex justify-between'>
          <div className='flex gap-x-2 items-center'>
            <Image src={logo} alt={'author'} width={60} height={60} />
            <div className='flex flex-col justify-start '>
              <span className='font-PingFang font-semibold text-xl '>
                {userInfo.name}
              </span>
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
        {success ? (
          <Success type='login' />
        ) : (
          <>
            <Form
              form={form}
              layout='vertical'
              className='!grid w-full grid-cols-2	 gap-x-4 mt-5'>
              {personal_setting.map((item: any) => {
                const objShow: any = {};
                if (item.dataIndex === 'name') {
                  objShow.showCount = true;
                  objShow.maxLength = max_name_length;
                }
                const newRules: any = [];
                item?.rules?.forEach((v: any) => {
                  newRules.push({ ...v, message: tr(v.message) });
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
                    name={item.dataIndex}
                    label={tr(item.title)}
                    key={item.dataIndex}>
                    {item?.dataIndex?.includes('password') ? (
                      <Input.Password className='h-12' {...objShow} />
                    ) : (
                      <Input className='h-12' {...objShow} />
                    )}
                  </Form.Item>
                );
              })}
            </Form>
            <div className='mt-5 !w-full flex gap-x-4 items-center justify-center'>
              <Button className='cancel_btn'>{tr('cancel')}</Button>
              <Button
                className='confirm_btn'
                loading={loading}
                onClick={handleSave}>
                {tr('confirm')}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
