import PplnsTable from '@components/tables/pplns/PplnsTable';
import { useNotification } from '@hooks/UseNotificationHook';
import { Box } from '@mui/material';
import { addAddress, clearPplns } from '@store/app/AppReducer';
import { getSettings } from '@store/app/AppSelectors';
import { changeRelay, getPplns } from '@store/app/AppThunks';
import { useDispatch, useSelector } from '@store/store';
import { validateAddress } from '@utils/Utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AddressPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addr } = router.query;
  const settings = useSelector(getSettings);
  const { showError } = useNotification();

  useEffect(() => {
    if (addr && typeof addr === 'string') {
      dispatch(clearPplns());
      const isAddrValid = validateAddress(addr, settings.network);
      if (isAddrValid) {
        dispatch(addAddress(addr));
        dispatch(getPplns(addr));
      } else {
        showError({
          message: t('invalidAddress'),
          options: {
            position: 'bottom-center',
            toastId: 'invalid-address'
          }
        });
      }
    }
  }, [addr]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        marginBottom: '40px'
      }}>
      <PplnsTable />
    </Box>
  );
};

export default AddressPage;
