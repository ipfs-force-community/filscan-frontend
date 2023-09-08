import { createContext, useContext } from "react";
import { MinerNum, groupsItem } from "./type";

interface groupsStore {
  groups: Array<groupsItem>
  setGroups: (groups: Array<groupsItem>) => void
  setMinerNum:(value:MinerNum)=>void
}

export const GroupsStoreContext = createContext<groupsStore | null>(null);

export const useGroupsStore = (): groupsStore => {
  const context = useContext(GroupsStoreContext);
  if (!context) {
    throw new Error(
      'useFilscanStore must be used within a FilscanStoreProvider'
    );
  }
  return context;
};

interface minersStore {
  setAllNum:(value:MinerNum)=>void
}

export const MinerStoreContext = createContext<minersStore | null>(null);

export const useMinerStore = (): minersStore => {
  const minerContext = useContext(MinerStoreContext);
  if (!minerContext) {
    throw new Error(
      'useFilscanStore must be used within a FilscanStoreProvider'
    );
  }
  return minerContext;
};