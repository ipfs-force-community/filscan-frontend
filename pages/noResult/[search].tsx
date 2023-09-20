
import Router,{ useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import style from './index.module.scss'
import { no_result } from '@/contents/home';
import Link from 'next/link';

export default () => {
  const router = useRouter();
  const { search } = router.query;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "home" });
  };
  return <div className={`main_contain ${style.wrap} !text-xl`} >
    <div className='!text-3xl font-medium'>{tr(no_result.title)}</div>
    <div className='text_des mt-4'>
      {tr(no_result.warn_text)}
      <span className={'text_color !text-2xl '}>{search }</span>
    </div>
    <div className='text_des mt-2.5'>
      { tr(no_result.warn_details)}
    </div>
    <Link className='primary_btn !px-5 !py-2.5 !mt-8 !text-base' href={'/home'}>
      { tr(no_result.go_home)}
    </Link>

  </div>
}