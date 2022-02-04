import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import { NetworkConnector } from './NetworkConnector';

import ARTION_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
      [ChainId.MAINNET]:
        'https://mainnet.infura.io/v3/ff21521dcf6745908bd33d52f5a66297',
    }
  : {
      [ChainId.KOVAN]:
        'https://kovan.infura.io/v3/ff21521dcf6745908bd33d52f5a66297',
    };

export const network = new NetworkConnector({
  defaultChainId: ChainId.MAINNET,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: isMainnet
    ? [
        1, // mainnet
      ]
    : [
        42, // ropsten testnet
      ],
});

export const walletlink = new WalletLinkConnector({
  url: 'https://kovan.infura.io/v3/ff21521dcf6745908bd33d52f5a66297',
  appName: 'Artion',
  appLogoUrl: ARTION_LOGO_URL,
});
