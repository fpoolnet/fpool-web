import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  AddressIconWrapper,
  AddressInput,
  StyledAddressInputBase
} from '@components/styled/AddressInput';
import { getAddress, getSettings } from '@store/app/AppSelectors';
import { useDispatch, useSelector } from '@store/store';
import { getPplns as fetchPplns } from '@store/app/AppThunks';
import { addAddress, clearAddress } from '@store/app/AppReducer';
import { isMobileDevice, truncateAddress, validateAddress } from '@utils/Utils';
import { Box } from '@mui/system';
import {
  ConnectedAddressButton,
  ConnectedAddressIconWrapper,
  StyledAddressButton
} from './styled/ConnectedAddressButton';
import { useNotification } from '@hooks/UseNotificationHook';

interface ConnectFormData {
  address: string;
}

const Connect = () => {
  const { t } = useTranslation();
  const { showError } = useNotification();
  const dispatch = useDispatch();
  const router = useRouter();
  const address = useSelector(getAddress);
  const isMobile = isMobileDevice();
  const settings = useSelector(getSettings);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .required(t('addressRequired'))
      .matches(/^[a-zA-Z0-9]{30,}$/, t('invalidAddressFormat'))
      .test('is-valid-address', t('invalidAddress'), (value: any) => {
       return validateAddress(value, settings.network);
      })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm<ConnectFormData>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: ConnectFormData) => {
    dispatch(clearAddress());
    router.replace(`/address/${data.address}`);
    dispatch(addAddress(data.address));
    dispatch(fetchPplns(data.address));
  };

  const onChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDisplayInput = () => {
    setInputValue('');
    setInputVisible(true);
    setTimeout(() => {
      setFocus('address');
    }, 500);
  };

  useEffect(() => {
    if (address) {
      setInputVisible(false);
    } else {
      setInputVisible(true);
    }
  }, [address]);

  useEffect(() => {
    if (errors.address?.message) {
      if (isMobile) {
        const inputElement = document.querySelector('input[name="address"]') as HTMLInputElement;
        inputElement?.blur();
      }

      showError({
        message: errors.address?.message,
        options: {
          position: 'bottom-center',
          toastId: errors.address.type
        }
      });
    }
  }, [errors]);

  return (
    <>
      {inputVisible && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddressInput>
            <AddressIconWrapper>
              <AccountBalanceWalletIcon />
            </AddressIconWrapper>
            <StyledAddressInputBase
              value={inputValue}
              placeholder={t('address')}
              {...register('address', {
                onChange: onChangeAddress,
                onBlur: () =>{
                   if(address) {setInputVisible(false);}
                }
              })}
              inputProps={{ 'aria-label': 'search', autoComplete: 'off' }}
            />
          </AddressInput>
        </form>
      )}
      {!inputVisible && address && (
        <Box display="flex" alignItems="center">
          <ConnectedAddressButton>
            <ConnectedAddressIconWrapper>
              <AccountBalanceWalletIcon />
            </ConnectedAddressIconWrapper>
            <StyledAddressButton onClick={handleDisplayInput}>
              {isMobile ? truncateAddress(address) : address}
            </StyledAddressButton>
          </ConnectedAddressButton>
        </Box>
      )}
    </>
  );
};

export default Connect;
