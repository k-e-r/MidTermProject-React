import { useEffect, useContext } from 'react';

import NewsAPI from '../hooks/news-api';
import Card from '../components/Layout/Card';
import SettingContext from '../store/setting-context';

const Top = () => {
  const settingCtx = useContext(SettingContext);
  const { lang } = settingCtx;
  useEffect(() => {
    console.log('language: ', lang);
  }, [settingCtx.lang]);
  const articles = NewsAPI(lang);
  // const articles = NewsAPI();
  // const articles = NewsAPI('us', 'business');

  return (
    <section>
      <Card articles={articles} />
    </section>
  );
};

export default Top;
