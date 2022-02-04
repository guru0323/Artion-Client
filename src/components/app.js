import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { ChainId } from '@sushiswap/sdk';
// import { Client } from '@bandprotocol/bandchain.js';

import ProtectedRoute from './ProtectedRoute';
import AccountModal from './AccountModal';
import WFTMModal from './WFTMModal';
import NotFound from './NotFound';
import PaintBoard from './PaintBoard';
import LandingPage from '../pages/landingpage';
import ExplorePage from '../pages/explorepage';
import AccountDetails from '../pages/AccountDetails';
import NFTItem from '../pages/NFTItem';
import CollectionCreate from '../pages/Collection/Create';
import CollectionReview from '../pages/Collection/Review';
import NotificationSetting from '../pages/NotificationSetting';
import PriceActions from 'actions/price.actions';

const App = () => {
  const dispatch = useDispatch();
  const { chainId } = useWeb3React();

  const [priceInterval, setPriceInterval] = useState(null);

  const getPrice = async () => {
    try {
      if (chainId === ChainId.MAINNET) {
        // const endpoint = 'https://rpc.bandchain.org';
        // const client = new Client(endpoint);
        // const resp = await client.getReferenceData(['FTM/USD', 'BTC/USD']);
        // console.log({ resp });
        // dispatch(PriceActions.updatePrice(resp.rate));
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const oracle = new ethers.Contract(
          '0xf4766552D15AE4d256Ad41B6cf2933482B0680dc',
          [
            {
              inputs: [],
              name: 'latestAnswer',
              outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const _price = await oracle.latestAnswer();
        const price = parseFloat(_price.toString()) / 10 ** 8;
        dispatch(PriceActions.updatePrice(price));
      } else if (chainId === ChainId.KOVAN) {
        const provider = new ethers.providers.JsonRpcProvider(
          'https://kovan.infura.io/v3/ff21521dcf6745908bd33d52f5a66297'
        );
        const aggregatorV3InterfaceABI = [
          {
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'description',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'uint80', name: '_roundId', type: 'uint80' },
            ],
            name: 'getRoundData',
            outputs: [
              { internalType: 'uint80', name: 'roundId', type: 'uint80' },
              { internalType: 'int256', name: 'answer', type: 'int256' },
              { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
              { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
              {
                internalType: 'uint80',
                name: 'answeredInRound',
                type: 'uint80',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'latestRoundData',
            outputs: [
              { internalType: 'uint80', name: 'roundId', type: 'uint80' },
              { internalType: 'int256', name: 'answer', type: 'int256' },
              { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
              { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
              {
                internalType: 'uint80',
                name: 'answeredInRound',
                type: 'uint80',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'version',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
        ];
        const addr = '0x9326BFA02ADD2366b30bacB125260Af641031331';
        const priceFeed = new ethers.Contract(
          addr,
          aggregatorV3InterfaceABI,
          provider
        );

        priceFeed.latestRoundData().then(roundData => {
          // Do something with roundData
          dispatch(PriceActions.updatePrice(roundData.answer / 10 ** 8));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (priceInterval) {
      clearInterval(priceInterval);
    }

    getPrice();
    setPriceInterval(setInterval(getPrice, 1000 * 10));
  }, [chainId]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/explore" component={ExplorePage} />
          <Route path="/explore/:addr/:id" component={NFTItem} />
          <ProtectedRoute exact path="/create" component={PaintBoard} />
          {/* <Route path="/bundle/:bundleID" component={NFTItem} /> */}
          <Route path="/account/:uid" component={AccountDetails} />
          {/* <ProtectedRoute
            path="/collection/create"
            component={() => <CollectionCreate isRegister={false} />}
          /> */}
          <ProtectedRoute
            path="/collection/register"
            component={() => <CollectionCreate isRegister={false} />}
          />
          <ProtectedRoute
            path="/collection/review"
            component={CollectionReview}
          />
          <ProtectedRoute
            path="/settings/notification"
            component={NotificationSetting}
          />
          <Route path="/404" component={NotFound} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
        <AccountModal />
        <WFTMModal />
        <Toaster position="bottom-right" reverseOrder={false} />
      </Router>
    </div>
  );
};

export default App;
