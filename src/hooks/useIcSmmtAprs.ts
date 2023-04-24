import { useCallback, useEffect, useState } from 'react';

import { MoneyMarketIndex } from '../constants/tokens';
import { IndexApi } from '../utils/api/indexApi';

export type IcSmmtAprRow = {
  day: string | null;
  icmm_txt: number | null;
};

export const useIcSmmtAprs = () => {
  const [aprs, setAprs] = useState<IcSmmtAprRow[]>([]);

  const fetchIcSmmtAprs = useCallback(async () => {
    try {
      const indexApi = new IndexApi();
      const aprs = await indexApi.get(`/${MoneyMarketIndex.url}/aprs`);

      setAprs(aprs);
    } catch (err) {
      console.log(`Failed to get icSMMT Aprs Over Time. ${err}`);
    }
  }, []);

  useEffect(() => {
    fetchIcSmmtAprs();
  }, [fetchIcSmmtAprs]);

  return { aprs };
};
