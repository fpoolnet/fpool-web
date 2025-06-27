import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import { SearchIconWrapper, SearchInput, StyledInputBase } from '@components/styled/SearchInput';
import { getAddress } from '@store/app/AppSelectors';
import { useDispatch, useSelector } from '@store/store';
import { PRIMARY_RED, SECONDARY_GREY_1 } from '@styles/colors';
import { getPplns as fetchPplns, stopPplns } from '@store/app/AppThunks';
import CustomTooltip from './common/CustomTooltip';
import { stopCoverage } from 'node:v8';
import { addAddress, clearAddress } from '@store/app/AppReducer';
import { validateAddress } from '@utils/Utils';

interface ConnectFormData {
  address: string;
}

const Connect = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const address = useSelector(getAddress);
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .required(t('addressRequired'))
      .matches(/^[a-zA-Z0-9]{30,}$/, t('invalidAddressFormat'))
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
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

  useEffect(() => {
    if (address) {
      setInputValue(address);
      clearErrors();
    }
  }, [address]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SearchInput>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <CustomTooltip
          title={errors.address?.message}
          placement="bottom"
          textColor={PRIMARY_RED}
          backgroundColor={SECONDARY_GREY_1}
          textBold>
          <StyledInputBase
            value={inputValue}
            placeholder={t('address')}
            inputProps={{ 'aria-label': 'search', autoComplete: 'off' }}
            {...register('address', {
              onChange: onChangeAddress
            })}
          />
        </CustomTooltip>
      </SearchInput>
    </form>
  );
};

export default Connect;
