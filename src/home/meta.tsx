/** @format */

import { EvmContractSummary, apiUrl } from "@/contents/apiUrl";
import { Translation } from "@/components/hooks/Translation";
import { home_meta } from "@/contents/home";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import useAxiosData from "@/store/useAxiosData";
import Skeleton from "@/packages/skeleton";
import Tooltip from "@/packages/tooltip";
import useInterval from "@/components/hooks/useInterval";
import Link from "next/link";
import { BrowserView, MobileView } from "@/components/device-detect";
import GoIcon from "@/assets/images/black_go.svg";
import GoMobileIcon from "@/assets/images/icon-right-white.svg";

type ElementType<
  T extends readonly any[]
> = T extends readonly (infer ElementType)[] ? ElementType : never;
type DataIndex = ElementType<typeof home_meta>["dataIndex"];

type Item = ElementType<typeof home_meta>;

function Meta() {
  const { tr } = Translation({ ns: "home" });
  const { axiosData,loading } = useAxiosData();

  const [data, setData] = useState<
    Record<DataIndex, number | undefined> & {
      [key: string]: number | undefined;
    }
  >();
  const [contractData, setContractData] = useState<Record<string, any>>();

  useInterval(() => {
    load();
  }, 5 * 60 * 1000);

  const load = async () => {
    const data: any = await axiosData(apiUrl.home_meta);
    setData(data?.total_indicators || {});
    const result: any = await axiosData(EvmContractSummary);
    setContractData(result || {});
  };

  return (
    <>
      <div
        //ref={ref}
        style={{ overflow: "hidden" }} //safari 不生效
        className={classNames(
          styles.meta,
          `relative border card_shadow flex-1 items-center h-[270px] inline-grid grid-cols-4 gap-2 pl-10 pr-6  py-10 rounded-xl border_color overflow-hidden`
        )}
      >
        <Link
          href={`/statistics/charts#networks`}
          className="absolute right-2 top-5"
        >
          <MobileView>
            <GoMobileIcon width={28} height={28} />
          </MobileView>
          <BrowserView>
            <GoIcon className="cursor-pointer mr-2.5" width={18} height={18} />
          </BrowserView>
        </Link>
        {home_meta.map((item: Item | any, index: number) => {
          const { render, dataIndex, title } = item;
          const dataSource = { ...data, ...contractData };
          const value = (dataSource && dataSource[dataIndex]) || "";
          let renderDom = value;
          let tipContent;
          if (item.tipContent && Array.isArray(item.tipContent)) {
            tipContent = (
              <ul className="px-2 pt-2 w-fit">
                {item.tipContent.map((tipItem: any) => {
                  let tipValue = dataSource[tipItem.dataIndex];
                  if (tipItem.render) {
                    tipValue = tipItem.render(tipValue, dataSource);
                  }
                  return (
                    <li key={tipItem.dataIndex} className="mb-2.5">
                      <span className="min-w-[80px] w-fit">
                        {tr(tipItem.title)}:
                      </span>
                      <span className="w-fit ml-1">{tipValue}</span>
                    </li>
                  );
                })}
              </ul>
            );
          }
          if (data) {
            renderDom = render && render(value, { ...data, ...contractData });
          }
          if (item.tipContent) {
            return (
              <div
                className={`${styles["meta-item"]} cursor-pointer relative`}
                key={item.dataIndex}
              >
                <Tooltip context={tipContent} icon={false}>
                  <div
                    className={classNames(
                      "text_clip DINPro-Bold font-bold	 text-xl",
                      styles["solid-text"]
                    )}
                  >
                    {loading && <Skeleton />}
                    {!loading&&renderDom}
                  </div>
                </Tooltip>

                <div
                  className={classNames(
                    "flex items-center gap-x-1 text-xs text_des mt-1 font-PingFang",
                    styles.title
                  )}
                >
                  {tr(title)}
                  {item.tip && <Tooltip context={tr(item.tip)} icon={true} />}
                </div>
              </div>
            );
          }
          return (
            <div className={styles["meta-item"]} key={item.dataIndex}>
              <div
                className={classNames(
                  "text_clip DINPro-Bold font-bold	 text-xl",
                  styles["solid-text"]
                )}
              >
                {loading && <Skeleton />}
                {!loading&&renderDom}
              </div>
              <div
                className={classNames(
                  "flex items-center gap-x-1 text-xs text_des mt-1 font-PingFang",
                  styles.title
                )}
              >
                {tr(title)}
                {item.tip && <Tooltip context={tr(item.tip)} icon={true} />}
              </div>
            </div>
          );
        })}
      </div>
      <MobileView>
        <div className={classNames(styles["see-wrap"])}>
          <Link
            href={`/statistics/charts#networks`}
          >
            <div className={classNames(styles["see-more"])}>{tr("see_more")}</div>
          </Link>
        </div>
      </MobileView>
    </>
  );
}

export default Meta;
