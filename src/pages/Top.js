import { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Card from '../components/Layout/Card';
import SettingContext from '../store/setting-context';
import useHttp from '../hooks/use-http';
import { getSingleArticle, addArticle, putArticle, getNews } from '../lib/api';

const Top = () => {
  const [readNews, setReadNews] = useState(false);
  const [articles, setArticles] = useState([]);
  const [serverArticles, setServerArticles] = useState(null);
  const [apiArticles, setAPIArticles] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const attrData =
    location.pathname.split('/')[2] + '_' + location.pathname.split('/')[3];

  const settingCtx = useContext(SettingContext);
  const { country } = settingCtx;
  useEffect(() => {
    history.replace('/categories/top/' + country, '');
    setServerArticles(null);
    setAPIArticles(null);
  }, [history, country]);

  const {
    sendRequest,
    status,
    data: loadedArticles,
  } = useHttp(getSingleArticle, true);
  const { sendRequest: addReq } = useHttp(addArticle);
  const { sendRequest: putReq } = useHttp(putArticle);
  const { sendRequest: getNewsReq, data: loadedNewsArticles } =
    useHttp(getNews);

  useEffect(() => {
    console.log('rewrite');
    setAPIArticles(loadedNewsArticles);
  }, [loadedNewsArticles]);

  useEffect(() => {
    if (readNews === true) {
      console.log('write');
      getNewsReq(country);
      setReadNews(false);
    }
  }, [readNews, getNewsReq, country]);

  // set data
  useEffect(() => {
    if (status === 'completed') {
      if (serverArticles !== null && serverArticles.length === 0) {
        if (apiArticles !== null) {
          addReq(
            {
              date: new Date().toLocaleString('en-US'),
              articles: apiArticles,
            },
            attrData
          );
          setArticles(apiArticles);
        } else {
          setReadNews(true);
        }
      } else {
        for (const key in serverArticles) {
          if (key === 'id') continue;
          const diff =
            (Date.parse(new Date().toLocaleString('en-US')) -
              Date.parse(serverArticles[key].date)) /
            1000 /
            60 /
            60;
          if (diff >= 6) {
            if (apiArticles !== null) {
              // PUT
              putReq(
                {
                  date: new Date().toLocaleString('en-US'),
                  articles: apiArticles,
                },
                attrData,
                serverArticles[key].id
              );
              setArticles(apiArticles);
            } else {
              setReadNews(true);
            }
          } else {
            setArticles(serverArticles[key].articles);
          }
        }
      }
    }
    if (apiArticles !== null) setArticles(apiArticles);
  }, [putReq, attrData, addReq, status, serverArticles, apiArticles]);

  useEffect(() => {
    console.log('attrData:', attrData);
    sendRequest(attrData);
  }, [sendRequest, attrData]);
  useEffect(() => {
    console.log('loadedArticles: ', loadedArticles);
    setServerArticles(loadedArticles);
  }, [loadedArticles]);

  return (
    <section>
      <Card articles={articles} country={country} />
    </section>
  );
};

export default Top;
