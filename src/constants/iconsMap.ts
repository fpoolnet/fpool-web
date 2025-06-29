import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const icons: any = {
  ArrowCircleLeftIcon,
  AccountBalanceWalletIcon
};

export const getIcon = (iconName: string) => {
  return icons[iconName];
};
