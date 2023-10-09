import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl";
import useAxiosData from "@/store/useAxiosData";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BrowserView, MobileView } from "@/components/device-detect";
import classNames from "classnames";
import styles from "./index.module.scss";
import { Select } from "antd";
import useWindow from "@/components/hooks/useWindown";
import TwitterIcon from '@/assets/images/twitter.svg'
import NetworkIcon from '@/assets/images/network.svg'
import { useFilscanStore } from "@/store/FilscanStore";

export default () => {
  const {theme} = useFilscanStore()
  const {isMobile} = useWindow()
  const { tr } = Translation({ ns: "fvm" });
  const { data, loading } = useAxiosData(apiUrl.fvm_category);
  const { axiosData } = useAxiosData();
  const [active, setActive] = useState("all");
  const [content, setContent] = useState([]);

  const fvmListOpt = useMemo(() => {
    let num = 0;
    let newData: Array<any> = [];
    data?.forEach((v: any) => {
      num = num + v.num;
      newData.push({...v, label: isMobile ? `${v.label}(${v.num})` : v.label , value: v.label });
    });
    return [{ label: isMobile ? `All(${num})` : 'All', value: "all", num }, ...newData];
  }, [data]);
  useEffect(() => {
    load();
  }, []);

  const load = (act?: string) => {
    const category = act || active;
    axiosData(apiUrl.fvm_items, {
      category,
    }).then((result: any) => {
      setContent(result || []);
    });
  };
  const handleClick = (item: any) => {
    setActive(item.value);
    load(item.value);
  };

  return (
    <>
      <div className={classNames("main_contain",styles.wrap)}>
        {isMobile ? <Select
          popupClassName={styles.popupWrap}
          className={styles.select}
          onChange={(e)=>{
            setActive(e);
            load(e)
          }}
          defaultValue={active}
          options={fvmListOpt}
        ></Select> : <></>}
        <BrowserView>
          <h3 className="text-lg font-DINPro-Medium mb-4">
            Explore FVM on Filscan
          </h3>
        </BrowserView>
        <div className="flex gap-x-5">
          <BrowserView>
            <ul className="w-[210px] border border_color rounded-lg card_shadow px-4 py-5">
              {fvmListOpt.map((item) => {
                return (
                  <li
                    className={`flex items-center justify-between px-5 h-10 text-sm cursor-pointer rounded-md ${
                      active === item.value
                        ? "bg-bg_hover text-primary"
                        : "text_des"
                    }`}
                    key={item.label}
                    onClick={() => {
                      handleClick(item);
                    }}
                  >
                    <span>{tr(item.label)}</span>
                    <span>{item.num}</span>
                  </li>
                );
              })}
            </ul>
          </BrowserView>
          <div className="flex-1">
            <ul
              className={classNames(
                "flex flex-wrap gap-4",
                styles["content-wrap"]
              )}
            >
              {content?.map((item: any, index: number) => {
                return (
                  <li
                    key={index}
                    className={classNames(
                      "flex justify-between items-center w-[220px] m-h-[68px] p-4 border border_color card_shadow rounded-[12px] !overflow-hidden",
                      styles["item-wrap"]
                    )}
                  >
                    <div className={classNames("flex items-center gap-x-1",styles.right)}>
                      <Image src={item.logo} alt="" width="36" height="36" className="rounded-full"/>
                      <span
                        className={classNames("flex flex-col ", styles.text)}
                      >
                        <span className="font-medium">{item?.name||''}</span>
                        <span className="text-xs text_des">
                          {item?.detail || ""}
                        </span>
                      </span>
                    </div>
                    <div className="flex gap-x-2">
                      {item.twitter && (
                        <span
                          onClick={() => {
                            if (item.twitter) {
                              window.open(item.twitter);
                            }
                          }}
                          className={classNames('border_color rounded-[5px] p-[7px] box-border cursor-pointer  hover:bg-primary',styles.twitter)}
                        >
                          <TwitterIcon/>
                        </span>
                      )}
                      {item.main_site && (
                        <span
                          onClick={() => {
                            if (item.main_site) {
                              window.open(item.main_site);
                            }
                          }}
                          className={classNames('border_color rounded-[5px] p-[7px] cursor-pointer hover:bg-primary',styles.network)}
                        >
                          <NetworkIcon/>
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
