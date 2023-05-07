import { Button, InputNumber, message } from "antd";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RecordIcon from '../../assets/index/copy.svg'
import { time } from "utils";
import CopyToClipboard from "react-copy-to-clipboard";

const Home: NextPage = () => {
  const { t, i18n } = useTranslation();
  const [recharge, setRecharge] = useState<any>()
  const [currSelect, setCurrSelect] = useState<string>('DynamicReturns')
  const [withdrawNum, setWithdrawNum] = useState<number>(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      if (currSelect == 'DynamicReturns') {
        axios.get('http://124.71.196.42:8099/rechwith/getRech', {
          headers: {
            language: i18n.language,
            authorization: token
          },
        }).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            console.log(res.data.data);
            setRecharge(res.data.data)
          } else {
            message.error(res.data.msg)
          }
        })
      }
    }
  }, [currSelect])
  const onChange = (res: any) => {
    setWithdrawNum(res)

  }
  const confirm = () => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.post('http://124.71.196.42:8099/rechwith/with', {
        amount: withdrawNum,
        paymentPwd: withdrawNum
      }, {
        headers: {
          language: i18n.language,
          authorization: token
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          message.error(res.data.msg)
        } else {
          message.error(res.data.msg)
        }
      })
    }
  }
  return (
    (
      <div className="rallet">
        <div className="selectBox">
          <div onClick={() => {
            setCurrSelect('DynamicReturns')
          }} className={currSelect == 'DynamicReturns' ? 'curr' : ''}>{t('recharge')}</div>
          <div onClick={() => {
            setCurrSelect('staticGains')
          }} className={currSelect == 'staticGains' ? 'curr' : ''}>{t('witndraw')}</div>
        </div>
        {
          currSelect == 'DynamicReturns' ? <div className="rechargeBox">
            <div className="erweima">
              <img src={'data:image/png;base64,' + recharge?.rechargeAddrCode} alt="" srcSet="" />
            </div>
            <div className="addressBox">
              <p>{t('rechargeAddress')}</p>
              <div><p>{recharge?.rechargeAddr}</p>
                <CopyToClipboard onCopy={()=>{message.success(t('copySucceed'))}} text={recharge?.rechargeAddr ? recharge?.rechargeAddr : t('participateFirst') }>
                  <RecordIcon></RecordIcon>
                </CopyToClipboard></div>
            </div>
          </div> : <div className="withdrawBox">
            <div className="addressBox">
              <p className="witndrawInputText">{t('witndrawAmount')}</p>
              <div className="witndrawInput"><InputNumber defaultValue={withdrawNum} onChange={onChange} /></div>
              <Button className="witndrawBtn" onClick={confirm}>{t('confirm')}</Button>
            </div>

          </div>
        }




      </div>
    )

  );
};

export default Home;
