import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from '@store/store';
import { getAddress } from '@store/app/AppSelectors';

const Home = () => {
  const router = useRouter();
  const address = useSelector(getAddress);

  useEffect(() => {
    if (address) {
      router.replace(`/address/${address}`);
    } else {
      router.push('/404');
    }
  }, [address]);

  return null;
};

export default Home;
