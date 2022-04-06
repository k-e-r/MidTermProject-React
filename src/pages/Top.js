import { useEffect, useContext } from 'react';

import NewsAPI from '../hooks/news-api';
import Card from '../components/Layout/Card';
import SettingContext from '../store/setting-context';

const Top = () => {
  const settingCtx = useContext(SettingContext);
  const { country } = settingCtx;
  useEffect(() => {
    console.log('country: ', country);
  }, [country]);
  const articles = NewsAPI(country);

  return (
    <section>
      <Card articles={articles} />
    </section>
  );
};

export default Top;
