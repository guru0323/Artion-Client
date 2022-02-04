import { ChainId } from '@sushiswap/sdk';

export const NETWORK_LABEL = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Fantom Testnet',
  [ChainId.MATIC]: 'Matic',
  [ChainId.MATIC_TESTNET]: 'Matic Testnet',
  [ChainId.XDAI]: 'xDai',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.MOONBASE]: 'Moonbase',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.FUJI]: 'Fuji',
  [ChainId.HECO]: 'HECO',
  [ChainId.HECO_TESTNET]: 'HECO Testnet',
  [ChainId.HARMONY]: 'Harmony',
  [ChainId.HARMONY_TESTNET]: 'Harmony Testnet',
};

export const Contracts = {
  [ChainId.MAINNET]: {
    auction: '0x951Cc69504d39b3eDb155CA99f555E47E044c2F1',
    sales: '0x88e535e5aA8C5B1258c2fBc0b29FC4FEfcCCf147',
    bundleSales: '0x56aD389A02Ea9d63f13106cB0c161342f537a92e',
    factory: '0xCC7A2eC7A8A0564518fD3D2ca0Df8B2137626144', //FantomNFTFactory
    privateFactory: '0xe5841838Dd7e522f217DfFBCEaef82F04EC649Cd', //FantomNFTFactoryPrivate
    artFactory: '0x520DaB621f93F59d3557174280AB1B6d4FB8c956', //FantomArtFactory
    privateArtFactory: '0x736Eae40AdFf88570b92378c97a0D11b44E1C953', //FantomArtFactoryPrivate
  },
  [ChainId.KOVAN]: {
    auction: '0x9185a696689D182742f9370C04bA1b05888F58fA',
    sales: '0x88e535e5aA8C5B1258c2fBc0b29FC4FEfcCCf147', //FantomMarketplace
    bundleSales: '0x2f5974637a5D429BCf036612F6Df3e4dAcb348E6', //FantomBundleMarketplace
    factory: '0xaad585ecd23AFD195Ae035C7150CBce3C341c53b', //FantomNFTFactory
    privateFactory: '0x96264d4d5922b627cf5297Ad2E4D6273A73C1CC1', //FantomNFTFactoryPrivate
    artFactory: '0xEEB4b411020d11E92e30BCf52Df5F5025c4f871E', //FantomArtFactory
    privateArtFactory: '0x0F85FAbcdb1A45110e1cA4417855dB39B3dBa5f2', //FantomArtFactoryPrivate
  },
};
