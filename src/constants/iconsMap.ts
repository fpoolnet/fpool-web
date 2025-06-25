import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const icons: any = {
  ArrowCircleLeftIcon
};

export const getIcon = (iconName: string) => {
  return icons[iconName];
};
