export interface Item {
  title: string;
  title_tip?:string
  dataIndex: string;
  api?: string,
  type?:string,
  render?:(text:any,record?:Record<string,any>,index?:number)=>number|string|JSX.Element
}

export interface Option_Item { 
  label: string,
  value: string
  options?:Array<Item>
}
export interface Menu_Info { 
    key: string;
    out_key?: string;
    children?: Array<Menu_Info>;
    preIcon?: string;
    sufIcon?: string;
    link?: string;
    outLink?: string;
    color?:string
}
 
export interface MenuItem {
    key: string,
    label: string,
    icon?: string | JSX.Element,
    href?:string,
   children?:Array<MenuItem>
}