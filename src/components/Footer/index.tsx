import type { NextPage } from "next";
import Head from "next/head";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "config/constants/wallets";
import { useContract, web3UseConnect } from "hooks/useContract";
import { useTranslation } from "react-i18next";
import { NetworkContextName } from "config/index";
// import './index.css'
import Image from 'next/image'
import WalletIcon from '../../assets/footer/wallet.svg'
import HomeIcon from '../../assets/footer/home.svg'
import IncomeIcon from '../../assets/footer/income.svg'
import PerformanceIcon from '../../assets/footer/performance.svg'
import RecordIcon from '../../assets/footer/record.svg'

import { isMobile } from "web3modal";
import { Link, useLocation } from "react-router-dom";

const Footer: NextPage = () => {
  const [urlQuery,setUrlQuery] = useState('')
    
    const location = useLocation()
  const footerMap = [{
    link: '/',
    icon: <HomeIcon></HomeIcon>
  }, {
    link: '/performance',
    icon: <PerformanceIcon></PerformanceIcon>
  }, {
    link: '/record',
    icon: <RecordIcon></RecordIcon>
  }, {
    link: '/income',
    icon: <IncomeIcon></IncomeIcon>
  }, {
    link: '/rallet',
    icon: <WalletIcon></WalletIcon>
  }]
 
  return (
    (
      <div className="footer">
        {footerMap.map(item =>
          <Link to={item.link} key={item.link} className={item.link === location.pathname ? 'curr' : ''}>
            {item.icon}
          </Link>
        )}

      </div>
    )

  );
};

export default Footer;
