import { MAINNET } from '../constants/chains';
import { Token } from '../constants/tokens';

export function getAddressForToken(
  token: Token,
  chainId: number | undefined
): string | undefined {
  switch (chainId) {
    case MAINNET.chainId:
      return token.address;
    default:
      return undefined;
  }
}
