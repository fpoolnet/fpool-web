import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const transactionsColumns = () => {
  const { t } = useTranslation();
  return [
    {
      headerName: t('time'),
      field: 'createdAt',
      flex: 2,
      minWidth: 150,
      headerClassName: 'text-blue text-uppercase',
      cellClassName: 'text-bold',
      renderCell: (params: any) => dayjs(params.value).format('MM/DD/YYYY h:mm A')
    },
    {
      headerName: t('block'),
      field: 'blockHeight',
      flex: 1,
      minWidth: 100,
      headerClassName: 'text-blue text-uppercase',
      cellClassName: 'text-blue'
    },
    {
      headerName: t('shares'),
      field: 'shares',
      flex: 1,
      minWidth: 90,
      headerClassName: 'text-blue text-uppercase',
      cellClassName: 'text-bold'
    },
    {
      headerName: t('totalShares'),
      field: 'totalShares',
      flex: 2,
      minWidth: 140,
      headerClassName: 'text-blue text-uppercase',
      cellClassName: 'text-bold'
    },
    {
      headerName: t('profit'),
      field: 'amount',
      flex: 1,
      minWidth: 120,
      headerClassName: 'text-blue text-uppercase',
      cellClassName: 'text-blue text-bold',
      valueFormatter: (value: any) => (value / 100000000).toFixed(6)
    }
  ];
};

export default transactionsColumns;
