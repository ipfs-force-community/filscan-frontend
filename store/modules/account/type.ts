export interface GroupList {
  group_info_list: GroupInfoList[];
}

export interface GroupInfoList {
  group_id: number;
  group_name: string;
  is_default: boolean;
  miners_info: MinersInfo[];
}

export interface MinersInfo {
  miner_id: string;
  miner_tag: string;
}