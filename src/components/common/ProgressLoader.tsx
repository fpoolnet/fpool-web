import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LoaderProps extends LinearProgressProps {
  value?: number;
}

const ProgressLoader = ({ value, ...otherProps }: LoaderProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
        position: 'absolute',
        top: '30%',
        zIndex: 100,
        gap: 1
      }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: '600'
        }}>
        {t('loading')}
        {value ? Math.round(value) : null}
      </Typography>
      <LinearProgress {...otherProps} sx={{ width: '100%' }} />
    </Box>
  );
};

export default ProgressLoader;
