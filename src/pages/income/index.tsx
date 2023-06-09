import { message } from "antd";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RecordIcon from '../../assets/record/record.svg'

const Home: NextPage = () => {

  const { t, i18n } = useTranslation();
  const [incomeRecord, setIncomeRecord] = useState<any[]>([])
  const [dynamiIncomeAll, setDynamiIncomeAll] = useState<string | null>('0')
  const [staticIncomeAll, setStaticIncomeAll] = useState<string | null>('0')



  useEffect(() => {
    const dynamiIncome = localStorage.getItem('dynamiIncomeAll')
    setDynamiIncomeAll(dynamiIncome)
    const staticIncome = localStorage.getItem('staticIncomeAll')
    setStaticIncomeAll(staticIncome)
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('http://45.136.15.41:8099/user/getUserSon', {
        headers: {
          language: i18n.language,
          authorization: token
        },
        params:{
          page:1,
          pageSize:100,
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
  }, [])
  return (
    (
      <div className="income">
        <div className="title">{t('MyBenefits')}</div>
        <div className="total"><p>{t("DynamicTotalRevenue")}:</p><p>{dynamiIncomeAll}</p></div>
        <div className="total"><p>{t("StaticTotalRevenue")}:</p><p>{staticIncomeAll}</p></div>
        {/* {
          incomeRecord.map(item => (
            <div className="incomeItem" key={item.id}>
              <div className="incomeItemTop">
                <RecordIcon></RecordIcon>
                <p>{item?.address.slice(0,4)}...{item?.address.slice(item?.address.length-4,item?.address.length)}</p>
              </div>
              <div className="incomeItemBot">
                <div>
                  <p>{t('Dynamic')}：</p>
                  <span>{item?.dynamiIncome}</span>
                </div>
                <div>
                  <p>{t('static')}：</p>
                  <span>{item?.staticIncome}</span>
                </div>
              </div>
            </div>
          ))
        } */}


      </div>
    )

  );
};

export default Home;
