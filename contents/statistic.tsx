/** @format */

export const gas = {
  title: 'trend_24', //基础手续费
  list: [
    {
      label: '24h',
      value: '24h',
    },
    {
      label: '7d',
      value: '7d',
    },
    {
      label: '30d',
      value: '1m',
    },
    {
      label: '1year',
      value: '1year',
    },
  ],
};

//算力走势图
export const power_trend = {
  title: 'power',
  list: [
    {
      title: 'total_quality_adj_power',
      dataIndex: 'total_quality_adj_power',
      yIndex: 0,
      type: 'line',
      color: '#FFC53D',
    }, //有效算力
    {
      title: 'total_raw_byte_power',
      dataIndex: 'total_raw_byte_power',
      yIndex: 0,
      type: 'line',
      color: '#4ACAB4',
    }, //原值算力
    {
      dataIndex: 'change_quality_adj_power',
      title: 'change_quality_adj_power',
      yIndex: 1,
      color: '#1C6AFD',
      type: 'bar',
    }, //算力增长，环比有效算力
    {
      title: 'base_line_power',
      dataIndex: 'base_line_power',
      yIndex: 1,
      color: '#D4D8DD',
      type: 'bar',
    }, //基线算力
  ],
};
