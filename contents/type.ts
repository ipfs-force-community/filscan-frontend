export interface Item {
  title: string;
  title_tip?:string
  dataIndex: string;
  render?:(text:any,record?:Record<string,any>,index?:number)=>number|string|JSX.Element
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