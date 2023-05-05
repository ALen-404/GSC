import type { NextPage } from "next";
import Head from "next/head";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "config/constants/wallets";
import { useContract, web3UseConnect } from "hooks/useContract";
import GSH from '../../abi/GSH.json'
import { useTranslation } from "react-i18next";
import { NetworkContextName } from "config/index";
import RecordIcon from '../../assets/index/copy.svg'
import LanguageIcon from '../../assets/index/language.svg'
import earth from '../../assets/index/earth.png'
import Image from 'next/image'

import { isMobile } from "web3modal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";

const Home: NextPage = () => {

  const { t, i18n } = useTranslation();
  console.log(i18n.language);

  const { account, chainId, error, activate } = useActiveWeb3React();
  const location = useLocation()
  const [balance, setBalance] = useState(0)
  const [holdStar, setHoldStar] = useState(0)
  const [holdEnd, setHoldEnd] = useState(0)
  const [InvitationLink, SetInvitationLink] = useState('0')


  // 实例化合约
  const contract = web3UseConnect(GSH, '0x321BEB103D2dB32BcE13B0851807D0c212aFB76D')

  // 获取邀请地址
  useEffect(() => {
   
    if (isMobile()) {
      import("amfe-flexible");
    }

    activate(injected, undefined, true).catch((error) => {
      activate(injected);
    });
    getIsBind()


  }, [account])
  const connect = () => {
    activate(injected)
  }
  const handleChangeLanguage = ()=>{
    i18n.changeLanguage(i18n.language=='en'?'zh':'en')
  }

  const getIsBind = async () => {

    if (account) {
      SetInvitationLink('http://124.71.196.42:3000/?address=' + account)
      const isBind = await contract.methods.parentUser(account).call()
      if (isBind == '0x0000000000000000000000000000000000000000' && location.search) {
        contract.methods.blind(location.search?.split('=')[1]).send({ from: account, value: 0 })
      } else {
        // http://124.71.196.42:8099/loginUsingPOST
        axios.post('http://124.71.196.42:8099/user/login', {
          address: account
        }, {
          headers: {
            language: i18n.language
          }
        }).then(res => {
          if (res.data.code == 200) {
            localStorage.setItem('token', res.data.data.authorization)
            setBalance(res.data.data.balance)
            axios.get('http://124.71.196.42:8099/bis/getHold', {
              headers: {
                language: i18n.language,
                authorization: res.data.authorization
              }
            }).then((holdRes) => {
              console.log(holdRes);
              if (holdRes.data.code == 200) {
                console.log(holdRes.data.data);

                setHoldStar(holdRes.data.data.startHold)
                setHoldEnd(holdRes.data.data.stopHold)
              } else {
                message.error(holdRes.data.msg)
              }

            })
          } else {
            message.error(res.data.msg)
          }

        })
      }
    }

  }




  return (
    (
      <div className="home">
        <div className="homeTop">
          <div className="topBtnBox">
            {
              account ? <div className="account">{account.slice(0, 4)}...{account.slice(account.length - 4, account.length)}</div> : <div onClick={connect} className="wallet">{t('connect')}</div>
            }

            <div className="changeLanguage" onClick={handleChangeLanguage}><LanguageIcon></LanguageIcon>{t('changeLanguage')}</div>
          </div>
          <div className="topCoinInfo">
            <div>
              <h3>{holdStar}-{holdEnd}</h3>
              <p>{t('bestHold')}</p>
            </div>
            <div>
              <h3>{balance}</h3>
              <p>{t('MyBalance')}</p>
            </div>

          </div>
        </div>
        <div className="homeMiddle">
          <div className="lianjie">{t('ChainWorld')}</div>
          <div className="earth">
            <Image src={earth} alt="earth"></Image>
          </div>
          <div className="quanqiu">{t('Global')}</div>
        </div>
        <div className="inviteBox">
          <p>{InvitationLink == "0" ? t('participateFirst') : InvitationLink}</p>
          <CopyToClipboard text={InvitationLink == "0" ? t('participateFirst') : InvitationLink}>
            <RecordIcon></RecordIcon>
          </CopyToClipboard>
        </div>
      </div>
    )

  );
};

export default Home;
