import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl";
import useAxiosData from "@/store/useAxiosData";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Image from '@/packages/image'
import Content from "@/packages/content";
import { domain_card } from "@/contents/domain";

export default () => {
  const router = useRouter();
  const { axiosData } = useAxiosData();
  const { tr } = Translation({ ns: 'domain' });

  const [data, setData] = useState<Record<string,any>>({});
  const [domain,provider] = useMemo(() => {
    const new_domain = router.query?.domain || '';
    const new_provider = router.query?.provider ||'';
    return [new_domain,new_provider]
  }, [router.query])

  useEffect(() => {
    // domain detail
    setData({})
    if (domain) {
      axiosData(apiUrl.contract_domain, {
        domain: domain,
        provider:provider
      }).then(
        (res: any) => {
          setData({...res,provider:provider});
        }
      );
    }

  }, [domain, provider])

  return <div className="main_contain">
    <div className="flex items-center gap-x-2 text-lg font-DINPro-Bold">
      <span>{tr('Result_for')}:</span>
      <Image src={data?.icon_url} width={24} height={24 } />
      <span>
        {domain}
      </span>
    </div>
    <div className="mt-5 p-5 card_shadow border border_color rounded-[12px]">
      <div className="text-base font-DINPro-Medium ml-2.5"> {tr('domain_title')}</div>
      <Content contents={domain_card.content} ns={"domain"} data={data} />
    </div>
  </div>
}