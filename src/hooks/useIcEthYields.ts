import { useCallback, useEffect, useState } from 'react';

import { IndexApi } from '../utils/api/indexApi';

export type IcEthYieldRow = {
  'Hour': string | null;
  'Net Yield vs ETH': number | null;
  'Net Yield vs stETH': number | null;
};

export const useIcEthYields = () => {
  const [yields, setYields] = useState<IcEthYieldRow[]>([]);

  const fetchIcETHYields = useCallback(async () => {
    try {
      const indexApi = new IndexApi();
      const yields = await indexApi.get('/iceth/yields');
      setYields(yields);
    } catch (err) {
      console.log(`Failed to get icETH Yields Over Time. ${err}`);
    }
  }, []);

  useEffect(() => {
    fetchIcETHYields();
  }, [fetchIcETHYields]);

  return { yields };
};
