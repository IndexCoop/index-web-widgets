import { useCallback, useEffect, useState } from 'react';

import { MoneyMarketIndex } from '../constants/tokens';
import { IndexApi } from '../utils/api/indexApi';

export type IcMmAprRow = {
  day: string | null;
  icmm_txt: number | null;
};

export const useIcMmAprs = () => {
  const [aprs, setAprs] = useState<IcMmAprRow[]>([]);

  const fetchIcMmAprs = useCallback(async () => {
    try {
      const indexApi = new IndexApi();
      const aprs = await indexApi.get(`/${MoneyMarketIndex.url}/aprs`);

      setAprs(aprs);
    } catch (err) {
      console.log(`Failed to get icMM Aprs Over Time. ${err}`);
    }
  }, []);

  useEffect(() => {
    fetchIcMmAprs();
  }, [fetchIcMmAprs]);

  return { aprs };
};
