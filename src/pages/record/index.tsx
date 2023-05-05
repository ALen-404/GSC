import { message } from "antd";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RecordIcon from '../../assets/record/time.svg'
import { time } from "utils";

const Home: NextPage = () => {
  const { t, i18n } = useTranslation();
  const [incomeRecord, setIncomeRecord] = useState<any[]>([])
  const [currSelect, setCurrSelect] = useState<string>('DynamicReturns')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('http://124.71.196.42:8099/transaction/getTransaction', {
        headers: {
          language: i18n.language,
          authorization: token
        },
        params:{
          page:1,
          pageSize:100,
          type:currSelect=='DynamicReturns'?3:2
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          console.log(res.data.data);
          const resData = res.data.data
          setIncomeRecord(resData.records)

        } else {
          message.error(res.data.msg)
        }

      })
    }
  }, [currSelect])
  return (
    (
      <div className="record">
        <div className="selectBox">
          <div onClick={() => {
            setCurrSelect('DynamicReturns')
          }} className={currSelect == 'DynamicReturns' ? 'curr' : ''}>{t('Dynamic')}</div>
          <div onClick={() => {
            setCurrSelect('staticGains')
          }} className={currSelect == 'staticGains' ? 'curr' : ''}>{t('static')}</div>
        </div>
        <div className="recordBox">
        {
          incomeRecord.map(item => (
            <div className="recordItem" key={item.id}>
              <div className="recordItemTop">
                <RecordIcon></RecordIcon>
                <p>{time(item.createTime)}</p>
              </div>
              <div className="amount">{item.tokensum}</div>
            </div>
          ))
        }
        </div>
       


      </div>
    )

  );
};

export default Home;
