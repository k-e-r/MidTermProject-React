import { useEffect, useContext } from 'react';

import Card from '../components/Card';
import SettingContext from '../store/setting-context';
import { getSingleUser, addUserBook, putUserBook } from '../lib/api';
import useHttp from '../hooks/use-http';

const Mypage = () => {
  const settingCtx = useContext(SettingContext);
  const { articles, country } = settingCtx;
  const {
    sendRequest,
    status,
    data: loadedArticles,
  } = useHttp(getSingleUser, true);
  const { sendRequest: addBook, state: addState } = useHttp(addUserBook);
  const { sendRequest: putBook, state: putState } = useHttp(putUserBook);

  useEffect(() => {
    if (loadedArticles !== null) {
      if (articles.length === 0 && loadedArticles.length !== 0) {
        // settingCtx.addArticles(loadedArticles[0]);
        let i = 0;
        for (const key in loadedArticles[0]) {
          if (i < Object.keys(loadedArticles[0]).length - 1) {
            settingCtx.addArticles(loadedArticles[0][key]);
          }
          i++;
        }
      }
    }
  }, []);

  useEffect(() => {
    sendRequest(localStorage.getItem('userId'));
  }, [articles, sendRequest, addState, putState]);

  return (
    <>
      <section>
        {articles.length > 0 && (
          <Card color='color' articles={articles} country={country} />
        )}
        {articles.length === 0 && <p>Please put your favorite article~ :)</p>}
      </section>
    </>
  );
};
export default Mypage;
