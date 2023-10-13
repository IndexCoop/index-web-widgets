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

export const Bitcoin2xFlexibleLeverageIndex: Token = {
  name: 'Bitcoin 2x Flexible Leverage Index',
  symbol: 'BTC2x-FLI',
  address: '0x0B498ff89709d3838a063f1dFA463091F9801c2b',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'btcfli',
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/fli_btc.svg',
  color: colors.FliPurple,
  coingeckoId: 'btc-2x-flexible-leverage-index',
  tokensetsId: 'btcfli',
  fees: {
    streamingFee: '1.95%',
  },
  isDangerous: true,
  indexTypes: [IndexType.leverage],
  defaultChain: MAINNET.chainId,
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

export const DiversifiedStakedETHIndex: Token = {
  name: 'Diversified Staked ETH Index',
  symbol: 'dsETH',
  image:
    'https://assets.website-files.com/60d237b6ea65be721ff4bbfa/637daed7345b29db5929e009_Dseth%20Logo.png',
  address: '0x341c05c0E9b33C0E38d64de76516b2Ce970bB3BE',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'dseth',
  coingeckoId: 'diversified-staked-eth',
  tokensetsId: 'dseth',
  fees: {
    streamingFee: '0.25%',
  },
  isDangerous: false,
  indexTypes: [IndexType.yield],
  defaultChain: MAINNET.chainId,
};

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

export const Ethereum2xFlexibleLeverageIndex: Token = {
  name: 'Ethereum 2x Flexible Leverage Index',
  symbol: 'ETH2x-FLI',
  address: '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'ethfli',
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/eth2x_fli.svg',
  color: colors.FliPurple,
  coingeckoId: 'eth-2x-flexible-leverage-index',
  tokensetsId: 'ethfli',
  fees: {
    streamingFee: '1.95%',
  },
  isDangerous: true,
  indexTypes: [IndexType.leverage],
  defaultChain: MAINNET.chainId,
};

export const icETHIndex: Token = {
  name: 'Interest Compounding ETH Index',
  symbol: 'icETH',
  address: '0x7C07F7aBe10CE8e33DC6C5aD68FE033085256A84',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'iceth',
  image:
    'https://assets.website-files.com/60d237b6ea65be721ff4bbfa/62388a82c46d9a1dfb3dc506_icETH-token-logo.png',
  coingeckoId: 'interest-compounding-eth-index',
  tokensetsId: 'iceth',
  fees: {
    streamingFee: '0.75%',
    mintFee: '0.0%',
    redeemFee: '0.0%',
  },
  isDangerous: true,
  indexTypes: [IndexType.yield],
  defaultChain: MAINNET.chainId,
};

export const GitcoinStakedETHIndex: Token = {
  name: 'Gitcoin Staked ETH Index',
  symbol: 'gtcETH',
  image:
    'https://assets.website-files.com/60d237b6ea65be721ff4bbfa/63f3a853c42e2e45ee6076c6_gtcETH-logo-p-500.png',
  address: '0x36c833Eed0D376f75D1ff9dFDeE260191336065e',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'gtceth',
  coingeckoId: 'gitcoin-staked-eth-index',
  tokensetsId: 'gtceth',
  fees: {
    streamingFee: '2.0%',
  },
  isDangerous: false,
  indexTypes: [IndexType.yield],
  defaultChain: MAINNET.chainId,
};

export const IndexToken: Token = {
  name: 'Index Cooperative',
  symbol: 'INDEX',
  address: '0x0954906da0Bf32d5479e25f46056d22f08464cab',
  polygonAddress: '0xfBd8A3b908e764dBcD51e27992464B4432A1132b',
  optimismAddress: undefined,
  decimals: 18,
  url: 'index',
  image:
    'https://assets.coingecko.com/coins/images/12729/small/index.png?1634894321',
  coingeckoId: 'index-cooperative',
  tokensetsId: 'index',
  fees: undefined,
  isDangerous: false,
  indexTypes: [],
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

// Not all details confirmed
export const MoneyMarketIndex: Token = {
  name: 'Money Market Index',
  symbol: 'icSMMT',
  address: '0xc30FBa978743a43E736fc32FBeEd364b8A2039cD',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'icsmmt',
  image:
    'https://assets.coingecko.com/coins/images/29752/small/MMI-token-logoStandard.png?1681117910',
  coingeckoId: 'money-market-index',
  tokensetsId: 'icsmmt',
  fees: undefined,
  isDangerous: false,
  indexTypes: [],
  defaultChain: MAINNET.chainId,
};

export const ic21Index: Token = {
  name: 'Index Coop Large Cap Index',
  symbol: 'ic21',
  image: 'https://app.indexcoop.com/assets/ic21_logo.svg',
  address: '0x1B5E16C5b20Fb5EE87C61fE9Afe735Cca3B21A65',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'ic21',
  coingeckoId: 'index-coop-large-cap',
  tokensetsId: '',
  fees: undefined,
  isDangerous: true,
  indexTypes: [IndexType.thematic],
  defaultChain: MAINNET.chainId,
};

export const CoinDeskETHTrendIndex: Token = {
  name: 'Index Coop CoinDesk ETH Trend Index',
  symbol: 'cdETI',
  image: 'https://uploads-ssl.webflow.com/62e3ff7a08cb1968bf057388/651f04818f458f918171c84d_cdETI-logo.svg',
  address: '0x55b2CFcfe99110C773f00b023560DD9ef6C8A13B',
  polygonAddress: undefined,
  optimismAddress: undefined,
  decimals: 18,
  url: 'cdeti',
  coingeckoId: 'coindesk-eth-trend-indicator',
  tokensetsId: '',
  fees: undefined,
  isDangerous: true,
  indexTypes: [],
  defaultChain: MAINNET.chainId,
};

export const ProductTokensBySymbol = {
  BED: BedIndex,
  BTCFLI: Bitcoin2xFlexibleLeverageIndex,
  CDETI: CoinDeskETHTrendIndex,
  DPI: DefiPulseIndex,
  DSETH: DiversifiedStakedETHIndex,
  ETHFLI: Ethereum2xFlexibleLeverageIndex,
  GTCETH: GitcoinStakedETHIndex,
  IC21: ic21Index,
  ICETH: icETHIndex,
  INDEX: IndexToken,
  ICSMMT: MoneyMarketIndex,
  MVI: MetaverseIndex,
};
