import { createContext, useContext } from "react";
import { MinerNum, groupsItem } from "../type";



interface groupsStore {
              groups: Array<groupsItem>
              setGroups:(groups:Array<groupsItem>)=>void
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