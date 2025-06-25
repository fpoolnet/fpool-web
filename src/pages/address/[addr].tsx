import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@hooks/UseNotificationHook';
import { addAddress } from '@store/app/AppReducer';
import { useDispatch } from '@store/store';
import { validateAddress } from '@utils/Utils';
import Home from '../index';

const AddressPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addr } = router.query;
  const { showError } = useNotification();

  useEffect(() => {
    if (addr && typeof addr === 'string') {
      try {
        validateAddress(addr);
        dispatch(addAddress(addr));
      } catch (err) {
        showError({
          message: t('invalidAddress'),
          options: {
            toastId: 'invalid-address'
          }
        });
      }
    }
  }, [addr]);

  return <Home />;
};

export default AddressPage;
