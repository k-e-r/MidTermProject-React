import { useState } from 'react';

import SettingContext from './setting-context';

const SettingProvider = (props) => {
  const [country, setCountry] = useState('us');

  const changeLangHandler = (lang) => {
    setCountry(lang);
  };

  const settingContext = {
    lang: country,
    setLang: changeLangHandler,
  };

  return (
    <SettingContext.Provider value={settingContext}>
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
