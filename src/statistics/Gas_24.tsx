/** @format */
import Card from '@/packages/custom_card';
import { apiUrl } from '@/contants/apiUrl';
import { gas_24 } from '@/contants/statistic';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useMemo, useContext } from 'react';
import { postAxios } from '@/store/server';
import Table from '@/packages/Table';
import FilscanState from '@/store/content';

export default () => {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: 'static' });
  };

  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    postAxios(apiUrl.static_gas_24).then((res: any) => {
      setData(res?.result.items);
    });
  }, []);

  const columns: any = useMemo(() => {
    return gas_24.columns.map((item: any) => {
      return { ...item, align: 'center', title: tr(item.title) };
    });
  }, [filscanStore.filscan]);

  return (
    <Card title={gas_24.title.label} bgColor ns='static'>
      <Table
        className='custom-table'
        dataSource={data}
        columns={columns}
        rowKey={(record: any) => `${record.sum_gas_fee}_${record.method_name}`}
      />
    </Card>
  );
};
