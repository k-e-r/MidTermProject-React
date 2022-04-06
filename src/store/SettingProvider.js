import { useState } from 'react';

import SettingContext from './setting-context';

const SettingProvider = (props) => {
  const [country, setCountry] = useState('us');

  const changeCountryHandler = (country) => {
    setCountry(country);
  };

  const settingContext = {
    country: country,
    setCountry: changeCountryHandler,
  };

  return (
    <SettingContext.Provider value={settingContext}>
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
