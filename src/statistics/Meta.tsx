import { Translation } from "@/components/hooks/Translation";
import useInterval from "@/components/hooks/useInterval";
import { apiUrl } from "@/contents/apiUrl";
import { meta_list } from "@/contents/home"
import useAxiosData from "@/store/useAxiosData";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";

export default () => {
  const { tr } = Translation({ ns: 'home' });
  const {axiosData } = useAxiosData();
  const [data, setData] = useState<any>({})

  useInterval(() => {
    load();
  }, 5*60*1000);

  const load = async () => {
    const data: any = await axiosData(apiUrl.home_meta);
    setData(data?.total_indicators || {});
  };

  return <ul className="flex flex-wrap gap-5 card_shadow py-5 px-6 border border_color rounded-[12px] mt-[46px]">
    {meta_list.map((item: any, index: number) => {
      const { title, render, dataIndex } = item;
      const value = data[dataIndex];
      let renderDom = render ? render(value, data, tr) : value;
      return <li className="flex flex-col items-center w-[210px] py-4 gap-y-2.5 border border_color rounded-[5px]" key={index }>
        <div className="text_des ">{tr(item.title)}</div>
        <div className="font-medium">{renderDom}</div>
      </li>
    })}
  </ul>
}