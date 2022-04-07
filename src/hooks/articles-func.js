import { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import SettingContext from '../store/setting-context';
import useHttp from './use-http';
import { getSingleArticle, addArticle, putArticle, getNews } from '../lib/api';

const ArticlesFunc = (category = 'general') => {
  const [readNews, setReadNews] = useState(false);
  const [articles, setArticles] = useState([]);
  const [serverArticles, setServerArticles] = useState(null);
  const [apiArticles, setAPIArticles] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const attrData =
    location.pathname.split('/')[2] + '_' + location.pathname.split('/')[3];

  let {
    sendRequest,
    status,
    data: loadedArticles,
  } = useHttp(getSingleArticle, true);

  const settingCtx = useContext(SettingContext);
  const { country } = settingCtx;
  useEffect(() => {
    console.log('category:', category);
    history.replace(`/categories/${category}/` + country, '');
    return () => {
      setReadNews(false);
      setArticles([]);
      setServerArticles(null);
      setAPIArticles(null);
    };
  }, [history, country, category, attrData]);
  const { sendRequest: addReq } = useHttp(addArticle);
  const { sendRequest: putReq } = useHttp(putArticle);
  const { sendRequest: getNewsReq, data: loadedNewsArticles } =
    useHttp(getNews);

  useEffect(() => {
    setAPIArticles(loadedNewsArticles);
  }, [loadedNewsArticles]);

  useEffect(() => {
    if (readNews === true) {
      getNewsReq(country, category);
      setReadNews(false);
    }
  }, [readNews, getNewsReq, country, category]);

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
            location.pathname.split('/')[2] +
              '_' +
              location.pathname.split('/')[3]
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
                location.pathname.split('/')[2] +
                  '_' +
                  location.pathname.split('/')[3],
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
  }, [putReq, addReq, status, serverArticles, apiArticles]);

  useEffect(() => {
    if (!attrData.match(/undefined/)) {
      sendRequest(attrData);
    }
  }, [sendRequest, attrData]);

  useEffect(() => {
    setServerArticles(loadedArticles);
  }, [loadedArticles]);

  return {
    articles,
    country,
  };
};

export default ArticlesFunc;
