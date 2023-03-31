import { useCallback, useEffect, useState } from 'react';

import { ProductTokensBySymbol, Token } from '../constants/tokens';
import { IndexApi } from '../utils/api/indexApi';

export type GtcDsEthAprRow = {
  hour: string | null;
  ma_apr_7d_seth2: number | null;
  ma_apr_7d_reth: number | null;
  ma_apr_7d_wsteth: number | null;
  ma_apr_7d_txt: number | null;
};

export const useGtcDsEthAprs = (token: Token) => {
  const [aprs, setAprs] = useState<GtcDsEthAprRow[]>([]);

  const fetchIcETHAprs = useCallback(async () => {
    if (
      token !== ProductTokensBySymbol.DSETH &&
      token !== ProductTokensBySymbol.GTCETH
    ) {
      return { aprs: [] };
    }

    try {
      const indexApi = new IndexApi();
      const aprs = await indexApi.get(`/${token.url}/aprs`);
      setAprs(aprs);
    } catch (err) {
      console.log(`Failed to get ${token.symbol} Aprs Over Time. ${err}`);
    }
  }, []);

  useEffect(() => {
    fetchIcETHAprs();
  }, [fetchIcETHAprs]);

  return { aprs };
};
