import { Option_Item } from "@/contents/type";

export interface Group extends Option_Item {
  group_name: string;
  group_id: number | string;
  miners_info: Array<any>;
}

export interface MinerNum {
  miners_count: number | string,
  max_miners_count:number | string
}