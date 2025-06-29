import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CustomTable from '@components/common/CustomTable';
import ProgressLoader from '@components/common/ProgressLoader';
import CenteredContentContainer from '@components/styled/CenteredContentContainer';
import { getAddress, getIsLoading, getPplns, getPplnsCount } from '@store/app/AppSelectors';
import { useSelector } from '@store/store';
import transactionsColumns from './PplnsColumns';

const PplnsTable = () => {
  const columns = transactionsColumns;
  const pplnsCount = useSelector(getPplnsCount);
  const isLoading = useSelector(getIsLoading);
  const pplns = useSelector(getPplns);
  const address = useSelector(getAddress);

  const [dataTable, setDataTable] = useState<any>([]);

  useEffect(() => {
    if (pplns?.length && !isLoading) {
      setDataTable(pplns);
    } else {
      setDataTable([]);
    }
  }, [pplns, isLoading]);

  return (
    <CenteredContentContainer>
      {isLoading && address && <ProgressLoader value={pplns.length} />}
      {!isLoading && address && (
        <Box
          sx={{
            width: '100%'
          }}>
          <CustomTable
            columns={columns}
            rows={dataTable}
            rowCount={pplnsCount}
            isLoading={isLoading}
            hidePagination
          />
        </Box>
      )}
    </CenteredContentContainer>
  );
};

export default PplnsTable;
