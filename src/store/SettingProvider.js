import { useState, useReducer } from 'react';

import SettingContext from './setting-context';

const defaultState = {
  articles: [],
  country: 'us',
};

const articlesReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingArticleIndex = state.articles.findIndex(
      (article) => article.title === action.articles.title
    );
    console.log('state:', state.articles);
    console.log('action:', action.articles);
    if (existingArticleIndex !== -1) {
      return {
        articles: state.articles,
        country: state.country,
      };
    }
    let updatedArticles;
    if (state.articles.length !== 0) {
      updatedArticles = state.articles.concat([action.articles]);
    } else {
      updatedArticles = [action.articles];
    }

    return {
      articles: updatedArticles,
      country: state.country,
    };
  }
  if (action.type === 'REMOVE') {
    let updatedArticles;

    updatedArticles = state.articles.filter(
      (article) => article.title !== action.articles.title
    );

    return {
      articles: updatedArticles,
      country: state.country,
    };
  }

  if (action.type === 'CLEAR') {
    return defaultState;
  }

  return defaultState;
};

const SettingProvider = (props) => {
  const [state, dispatchAction] = useReducer(articlesReducer, defaultState);
  const [country, setCountry] = useState('us');

  const addArticlesHandler = (articles) => {
    dispatchAction({ type: 'ADD', articles: articles });
  };

  const removeArticlesHandler = (articles) => {
    dispatchAction({ type: 'REMOVE', articles: articles });
  };

  const changeCountryHandler = (country) => {
    setCountry(country);
  };

  const settingContext = {
    articles: state.articles,
    addArticles: addArticlesHandler,
    removeArticles: removeArticlesHandler,
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
