import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import JSONPretty from 'react-json-pretty';
import copy from 'copy-to-clipboard';
import useAxiosData from "@/store/useAxiosData";
import { apiUrl } from "@/contents/apiUrl";
import { Button, message } from "antd";

export default () => {
  const router = useRouter();
  const {axiosData } = useAxiosData()
  const [address,format]:any = useMemo(() => {
    const address_a = router.query?.address || '';
    const format_a = router.query?.format ||''
    return [address_a,format_a]
  }, [router.query])

  const [data,setData]= useState('')
  useEffect(() => {
    if (address) {
      axiosData(apiUrl.contract_verify_des, {
        input_address:address
      }).then(
        (res: any) => {
          setData(res?.compiled_file?.ABI || '');
        }
      );
    }

  }, [address])

  const handleClick = () => {
    const text = format === 'json' ? data: '"'+ data + '"'
    copy(text);
    return message.success('Clipboard Successfully');
  };

  return <div className="main_contain">
    <Button className="primary_btn" onClick={handleClick}>
       Copy
    </Button>
    <div className="m-10">
      {format === 'json' && data && <JSONPretty data={data}/>}
      {format === 'text' && data && <div>{'"'+ data + '"'}</div>}
    </div>

  </div>
}