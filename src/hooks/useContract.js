import { useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

// eslint-disable-next-line no-undef
// const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

export default () => {
  const { chainId } = useWeb3React();

  const getContract = useCallback(
    async (address, abi) => {
      if (chainId) {
        await window.ethereum.enable();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        return new ethers.Contract(address, abi, signer);
      } else {
        const web3 = new Web3(
          new Web3.providers.HttpProvider(
            'https://kovan.infura.io/v3/ff21521dcf6745908bd33d52f5a66297/'
          )
        );

        const provider = new ethers.providers.Web3Provider(web3.givenProvider);
        return new ethers.Contract(address, abi, provider);
      }
    },
    [chainId]
  );

  return { getContract };
};
