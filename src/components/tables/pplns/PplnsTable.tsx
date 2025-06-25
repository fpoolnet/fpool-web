import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CustomTable from '@components/common/CustomTable';
import ProgressLoader from '@components/common/ProgressLoader';
import CenteredContentContainer from '@components/styled/CenteredContentContainer';
import { clearPplns } from '@store/app/AppReducer';
import { getAddress, getIsLoading, getPplns, getPplnsCount } from '@store/app/AppSelectors';
import { getPplns as fetchPplns } from '@store/app/AppThunks';
import { useDispatch, useSelector } from '@store/store';
import transactionsColumns from './PplnsColumns';

const PplnsTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const columns = transactionsColumns;
  const pplnsCount = useSelector(getPplnsCount);
  const isLoading = useSelector(getIsLoading);
  const pplns = useSelector(getPplns);
  const address = useSelector(getAddress);

  const [dataTable, setDataTable] = useState<any>([]);

  useEffect(() => {
    if (address) {
      dispatch(clearPplns());
      dispatch(fetchPplns(address));
    }
  }, [address]);

  useEffect(() => {
    if (pplns?.length) {
      setDataTable(pplns);
    } else {
      setDataTable([]);
    }
  }, [pplns]);

  return (
    <CenteredContentContainer>
      {isLoading && <ProgressLoader />}

      <Box
        sx={{
          width: '100%'
        }}
        // onScroll={handleScroll}
      >
        <CustomTable
          columns={columns}
          rows={dataTable}
          rowCount={pplnsCount}
          isLoading={isLoading}
          hidePagination
        />
      </Box>
    </CenteredContentContainer>
  );
};

export default PplnsTable;
