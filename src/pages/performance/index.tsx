import { message } from "antd";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Home: NextPage = () => {

  const { t, i18n } = useTranslation();
  const [tongDTO_one, setTongDTO_one] = useState({
    dynamiIncome: 0,
    dynamiIncomeAll: 0,
    staticIncome: 0,
    staticIncomeAll: 0,
    weight: 0,
  })
  const [tongDTO_two, setTongDTO_two] = useState({
    dynamiIncome: 0,
    dynamiIncomeAll: 0,
    staticIncome: 0,
    staticIncomeAll: 0,
    weight: 0,
  })
  const [tongDTO_three_ten, setTongDTO_three_ten] = useState({
    dynamiIncome: 0,
    dynamiIncomeAll: 0,
    staticIncome: 0,
    staticIncomeAll: 0,
    weight: 0,
  })



  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('http://124.71.196.42:8099/user/getTong', {
        headers: {
          language: i18n.language,
          authorization: token
        },
        
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          console.log(res.data.data);
          const resData= res.data.data
          setTongDTO_one(resData.tongDTO_one)
          setTongDTO_two(resData.tongDTO_two)
          setTongDTO_three_ten(resData.tongDTO_three_ten)

        } else {
          message.error(res.data.msg)
        }

      })
    }
  }, [])
  return (
    (
      <div className="perfomance">
        <div className="first">
          <div className="title">{t('first')}</div>
          <div>
            <h3>{tongDTO_one?.weight}</h3>
            <p>{t('weight')}</p>
          </div>
          <div>
            <h3>{tongDTO_one?.dynamiIncome}</h3>
            <p>{t('DynamicReturns')}</p>
          </div>
          <div>
            <h3>{tongDTO_one?.staticIncome}</h3>
            <p>{t('staticGains')}</p>
          </div>
          <div>
            <h3>{tongDTO_one?.staticIncomeAll}</h3>
            <p>{t('StaticTotalRevenue')}</p>
          </div>
          <div>
            <h3>{tongDTO_one?.dynamiIncomeAll}</h3>
            <p>{t('DynamicTotalRevenue')}</p>
          </div>
        </div>
        <div className="second">
          <div className="title">{t('second')}</div>
          <div>
            <h3>{tongDTO_two?.weight}</h3>
            <p>{t('weight')}</p>
          </div>
          <div>
            <h3>{tongDTO_two?.dynamiIncome}</h3>
            <p>{t('DynamicReturns')}</p>
          </div>
          <div>
            <h3>{tongDTO_two?.staticIncome}</h3>
            <p>{t('staticGains')}</p>
          </div>
          <div>
            <h3>{tongDTO_two?.staticIncomeAll}</h3>
            <p>{t('StaticTotalRevenue')}</p>
          </div>
          <div>
            <h3>{tongDTO_two?.dynamiIncomeAll}</h3>
            <p>{t('DynamicTotalRevenue')}</p>
          </div>
        </div>
        <div className="third">
          <div className="title">{t('more')}</div>
          <div>
            <h3>{tongDTO_three_ten?.weight}</h3>
            <p>{t('weight')}</p>
          </div>
          <div>
            <h3>{tongDTO_three_ten?.dynamiIncome}</h3>
            <p>{t('DynamicReturns')}</p>
          </div>
          <div>
            <h3>{tongDTO_three_ten?.staticIncome}</h3>
            <p>{t('staticGains')}</p>
          </div>
          <div>
            <h3>{tongDTO_three_ten?.staticIncomeAll}</h3>
            <p>{t('StaticTotalRevenue')}</p>
          </div>
          <div>
            <h3>{tongDTO_three_ten?.dynamiIncomeAll}</h3>
            <p>{t('DynamicTotalRevenue')}</p>
          </div>
        </div>
      </div>
    )

  );
};

export default Home;
