import { Translation } from "@/components/hooks/Translation";
import useHashScroll from "@/components/hooks/useHashScroll";
import {  logTabs, login_list } from "@/contents/account";
import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import SendCode from "@/src/account/sendCode";
import fetchData from "@/store/server";
import Success from '@/src/account/success'
import { proApi } from "@/contents/apiUrl";



export default () => { 
    const [form] = Form.useForm();
    const { tr } = Translation({ ns: 'common' });
    const [hash, setHash] = useState('login');
    const [success,setSuccess]= useState(false)
    //useHashScroll();
    const router = useRouter();
     useEffect(() => {
     const handleRouteChange = (url:string) => {
         const hash = url.split('#')[1];
         
        setHash(hash||'login')
         if (hash) {
        window.requestAnimationFrame(() => {
          const element = document.getElementById(hash);
          if (element) {
            //window.scrollTo(0, element.offsetTop);
            //element.scrollIntoView({block:'center'});
            //element.classList.add('highlight');
            }
        });
      }
    };

    if (router.asPath !== router.route) {
      handleRouteChange(router.asPath);
    }
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, []);
    
    const onFinish = async () => {
        //登录
        const data = form.getFieldsValue();
        const result:any = await fetchData(proApi.login, {
            ...data,
            mail: data.email,
        })
        if (result.token) { 
            setSuccess(true)
            localStorage.setItem('token', result.token);
            
        }

    }
    
    return <>
        <div className="bg-black w-full h-[200px]">
            Banner
        </div>
        <div className="main_contain !w-[404px] !p-0 !mt-14">
            {success ? <Success /> :
                <>
                    <ul className="flex gap-x-6 list-none">
                        {logTabs?.map((log_item, index) => {
                            return <Link
                                href={`/account${log_item.dataIndex !== 'login' ? '#' + log_item.dataIndex : ''}`}
                                as={`/account${log_item.dataIndex !== 'login' ? '#' + log_item.dataIndex : ''}`}
                                key={index}
                                id={log_item.dataIndex}
                                className={`text-lg text-font_des hover:text-font ${hash === log_item.dataIndex ? 'highlight' : ''}`}>{tr(log_item.title)}</Link>
                        })}
                    </ul>
                    <Form
                        form={form}
                        size='large'
                        className="custom_form !w-full !mt-7 !flex !flex-col gap-y-4"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        {login_list(hash).map(item => {
                            const showButton = item.name === 'code'
                            return <Form.Item
                                className="!m-0  !h-[48px]"
                                name={item.name}
                                key={item.name}
                                rules={item.rules}
                            >
                                <Input prefix={item.prefix} placeholder={tr(item.placeholder)}
                                    suffix={showButton && <SendCode mail={form.getFieldValue('email')} />}
                                />
                          
                       
                            </Form.Item>
                        })}
                        <Form.Item name="remember" valuePropName="checked" className="!m-0 !p-0">
                            <div className="!flex !justify-between"  >
                                <Checkbox>{tr('remember_me')}</Checkbox>
                                <a href="">
                                    {tr('forgot_password')}
                                </a>
                            </div>
                        </Form.Item>
                        <Form.Item className="!mt-6">
                            <Button type="primary" htmlType="submit" className="!w-full">
                                {tr('login')}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex gap-x-2"  >
                        <span>{tr('no_account')}</span>
                        <Link href={'/account/register'}>
                            {tr('go_register')}
                        </Link>
                    </div>
                </>
            }
            </div>
            
    
    </>
}