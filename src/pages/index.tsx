import { Box } from '@mui/material';
import PplnsTable from '@components/tables/pplns/PplnsTable';

const Home = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800
      }}>
      <PplnsTable />
    </Box>
  );
};

export default Home;
