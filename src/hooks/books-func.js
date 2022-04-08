import { useState, useEffect, useContext } from 'react';

import SettingContext from '../store/setting-context';
import useHttp from './use-http';
import { getSingleUser, addUserBook } from '../lib/api';

const BooksFunc = () => {
  const [readUser, setReadUser] = useState(false);
  const [serverArticles, setServerArticles] = useState(null);

  const settingCtx = useContext(SettingContext);
  const { articles } = settingCtx;

  let {
    sendRequest: getReq,
    status,
    data: loadedArticles,
  } = useHttp(getSingleUser, true);
  const { sendRequest: addReq } = useHttp(addUserBook);

  useEffect(() => {
    console.log('userId', localStorage.getItem('userId'));
    // addReq(localStorage.getItem('userId'));
  }, [articles]);

  useEffect(() => {
    if (status === 'completed') {
      if (serverArticles !== null && serverArticles.length === 0) {
        setReadUser(true);
      }
    }
  }, [status, serverArticles]);

  useEffect(() => {
    setServerArticles(loadedArticles);
  }, [loadedArticles]);
};

export default BooksFunc;
