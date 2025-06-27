import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

interface LoaderProps extends CircularProgressProps {
  value?: number;
}

const ProgressLoader = ({ value, ...otherProps }: LoaderProps) => {
  return (
    <Box
      sx={{
        zIndex: 100,
        position: 'absolute',
        top: '30%'
      }}>
      {value && <CircularProgress variant="determinate" value={value} {...otherProps} size={60} />}
      {value && (
        <Box
          sx={{
            top: '25%',
            left: '20%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '20px'
          }}>
          {`${Math.round(value)}`}
        </Box>
      )}
    </Box>
  );
};

export default ProgressLoader;
