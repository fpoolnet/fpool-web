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
import { getAddress } from '@store/app/AppSelectors';
import { useDispatch, useSelector } from '@store/store';
import {
  PRIMARY_BLACK,
  PRIMARY_RED,
  PRIMARY_WHITE,
  SECONDARY_BLUE_1,
  SECONDARY_GREY_1
} from '@styles/colors';
import { getPplns as fetchPplns, stopPplns } from '@store/app/AppThunks';
import CustomTooltip from './common/CustomTooltip';
import { addAddress, clearAddress } from '@store/app/AppReducer';
import { isMobileDevice, truncateAddress, validateAddress } from '@utils/Utils';
import { Box } from '@mui/system';
import CustomButton from './common/CustomButton';
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
  const [inputValue, setInputValue] = useState<string>('');
  const [inputVisible, setInputVisible] = useState(false);
  const isMobile = isMobileDevice();

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .required(t('addressRequired'))
      .matches(/^[a-zA-Z0-9]{30,}$/, t('invalidAddressFormat'))
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<ConnectFormData>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: ConnectFormData) => {
    try {
      dispatch(clearAddress());
      validateAddress(data.address);
      router.replace(`/address/${data.address}`);
      dispatch(addAddress(data.address));
      dispatch(fetchPplns(data.address));
    } catch (err) {
      setError('address', {
        type: 'manual',
        message: t('invalidAddress')
      });
    }
  };

  const onChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    dispatch(stopPplns());
  };

  const handleDisplayInput = () => {
    setInputValue('');
    setInputVisible(true);
  };

  useEffect(() => {
    if (address) {
      setInputValue(address);
      setInputVisible(false);
      reset({ address });
    } else {
      setInputVisible(true);
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
                value={inputValue}
                placeholder={t('address')}
                {...register('address', {
                  onChange: onChangeAddress
                })}
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
            <StyledAddressButton onClick={(event) => handleDisplayInput()}>
              {isMobile ? truncateAddress(address) : address}
            </StyledAddressButton>
          </ConnectedAddressButton>
        </Box>
      )}
    </>
  );
};

export default Connect;
