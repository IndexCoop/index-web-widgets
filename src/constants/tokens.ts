import { MAINNET } from './chains';

import { colors } from '../styles/colors';

export enum IndexType {
  thematic = 'thematic',
  leverage = 'leverage',
  yield = 'yield',
}

export interface Token {
  name: string;
  symbol: string;
  address: string | undefined;
  polygonAddress: string | undefined;
  optimismAddress: string | undefined;
  decimals: number;
  url: string;
  image: string;
  color?: string;
  coingeckoId: string;
  tokensetsId: string;
  fees:
    | { streamingFee: string; mintFee?: string; redeemFee?: string }
    | undefined;
  isDangerous: boolean;
  indexTypes: IndexType[];
  defaultChain?: number;
  isPerp?: boolean;
}

/**
 * Tokens
 */

export const ETH: Token = {
  name: 'Ethereum',
  symbol: 'ETH',
  image:
    'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
  address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  polygonAddress: '',
  optimismAddress: '',
  decimals: 18,
  url: '',
  coingeckoId: 'ethereum',
  tokensetsId: 'eth',
  fees: undefined,
  isDangerous: false,
  indexTypes: [],
};

export const DefiPulseIndex: Token = {
  name: 'DeFi Pulse Index',
  symbol: 'DPI',
  image: 'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg',
  color: colors.DpiPurple,
  address: '0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b',
  polygonAddress: '0x85955046DF4668e1DD369D2DE9f3AEB98DD2A369',
  optimismAddress: undefined,
  decimals: 18,
  url: 'dpi',
  coingeckoId: 'defipulse-index',
  tokensetsId: 'dpi',
  fees: {
    streamingFee: '0.95%',
  },
  isDangerous: true,
  indexTypes: [IndexType.thematic],
  defaultChain: MAINNET.chainId,
};

export const MetaverseIndex: Token = {
  name: 'Metaverse Index',
  symbol: 'MVI',
  address: '0x72e364F2ABdC788b7E918bc238B21f109Cd634D7',
  polygonAddress: '0xfe712251173A2cd5F5bE2B46Bb528328EA3565E1',
  optimismAddress: undefined,
  decimals: 18,
  url: 'mvi',
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
  color: colors.MviPink,
  coingeckoId: 'metaverse-index',
  tokensetsId: 'mvi',
  fees: {
    streamingFee: '0.95%',
  },
  isDangerous: true,
  indexTypes: [IndexType.thematic],
  defaultChain: MAINNET.chainId,
};

export const BedIndex: Token = {
  name: 'Bankless BED Index',
  symbol: 'BED',
  address: '0x2aF1dF3AB0ab157e1E2Ad8F88A7D04fbea0c7dc6',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'bed',
  image:
    'https://assets.website-files.com/60f6894ff98ed9aeca219e0e/62bdb61688a3657cf9b4ff29_BED_Logo-1.svg',
  color: colors.BedRed,
  coingeckoId: 'bankless-bed-index',
  tokensetsId: 'bed',
  fees: {
    streamingFee: '0.25%',
  },
  isDangerous: true,
  indexTypes: [IndexType.thematic],
  defaultChain: MAINNET.chainId,
};

export const ProductTokensBySymbol = {
  DPI: DefiPulseIndex,
  MVI: MetaverseIndex,
  BED: BedIndex,
};
