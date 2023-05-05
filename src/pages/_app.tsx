import "styles/globals.css";
import type { AppProps } from "next/app";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Web3ReactManager from "components/Web3ReactManager/index";
import dynamic from "next/dynamic";
import "../react-i18next/i18n";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './home/index'
import Income from './income/index'
import Performance from './performance/index'
import Rallet from './rallet/index'
import Record from './record/index'
import Footer from "components/Footer";
import '../components/Footer/index.css'
import './home/index.css'
import './performance/index.css'
import './income/index.css'
import './record/index.css'
import './rallet/index.css'
import 'antd/dist/reset.css';

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

const Web3ProviderNetwork = dynamic(() => import("../components/Web3ProviderNetwork/index"), { ssr: false });
{/* <script src=""></script> */ }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>
          <Fragment>
            <BrowserRouter>
              <div>
                <Routes>
                  <Route path='/' Component={Home} />
                  <Route path='/income' Component={Income} />
                  <Route path='/performance' Component={Performance} />
                  <Route path='/rallet' Component={Rallet} />
                  <Route path='/record' Component={Record} />
                </Routes>
              </div>
              <Footer />
            </BrowserRouter>
          </Fragment>
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}

export default MyApp;
