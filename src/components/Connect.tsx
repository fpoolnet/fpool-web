import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
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
import { getAddress } from '@store/app/AppSelectors';
import { useDispatch, useSelector } from '@store/store';
import { PRIMARY_RED, SECONDARY_GREY_1 } from '@styles/colors';
import { getPplns as fetchPplns, stopPplns } from '@store/app/AppThunks';
import CustomTooltip from './common/CustomTooltip';
import { addAddress, clearAddress } from '@store/app/AppReducer';
import { isMobileDevice, truncateAddress, validateAddress } from '@utils/Utils';
import { Box } from '@mui/system';
import {
  ConnectedAddressButton,
  ConnectedAddressIconWrapper,
  StyledAddressButton
} from './styled/ConnectedAddressButton';

interface ConnectFormData {
  address: string;
}

const Connect = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const address = useSelector(getAddress);
  const router = useRouter();
  const [inputVisible, setInputVisible] = useState(false);
  const isMobile = isMobileDevice();

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .required(t('addressRequired'))
      .matches(/^[a-zA-Z0-9]{30,}$/, t('invalidAddressFormat'))
      .test('is-valid-address', t('invalidAddress'), (value: any) => {
        try {
          return !!validateAddress(value);
        } catch {
          return false;
        }
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

  const handleDisplayInput = () => {
    setInputVisible(true);
    setTimeout(() => {
      setFocus('address');
    }, 500);
  };

  useEffect(() => {
    if (address) {
      setInputVisible(false);
    }
  }, [address]);

  return (
    <>
      {inputVisible && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddressInput>
            <AddressIconWrapper>
              <AccountBalanceWalletIcon />
            </AddressIconWrapper>
            <CustomTooltip
              title={errors.address?.message}
              placement="bottom"
              textColor={PRIMARY_RED}
              backgroundColor={SECONDARY_GREY_1}
              textBold>
              <StyledAddressInputBase
                placeholder={t('address')}
                {...register('address')}
                onBlur={() => setInputVisible(false)}
              />
            </CustomTooltip>
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
