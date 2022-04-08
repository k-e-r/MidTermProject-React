import { useState, useEffect, useContext } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import SettingContext from '../store/setting-context';
import { getSingleUser, addUserBook, putUserBook } from '../lib/api';
import useHttp from '../hooks/use-http';

import classes from './Card.module.css';
import notImage from '../assets/image-not-found-scaled.jpg';
import { ReactComponent as Tag } from '../assets/bookmark.svg';

let setImage = Array(20).fill(false);

const Card = (props) => {
  const [imageState, setImageState] = useState(0);
  // const [articleFlg, setArticleFlg] = useState(false);
  const settingCtx = useContext(SettingContext);
  const { articles } = settingCtx;
  const {
    sendRequest,
    status,
    data: loadedArticles,
  } = useHttp(getSingleUser, true);
  const { sendRequest: addBook, state: addState } = useHttp(addUserBook);
  const { sendRequest: putBook, state: putState } = useHttp(putUserBook);

  useEffect(() => {
    if (status !== 'completed') return;
    // if (articleFlg === false) return;
    if (loadedArticles !== null && loadedArticles.length === 0) {
      addBook(localStorage.getItem('userId'), articles);
    } else if (loadedArticles !== null) {
      for (const key in loadedArticles) {
        putBook(
          localStorage.getItem('userId'),
          articles,
          loadedArticles[key].id
        );
      }
    }
  }, [loadedArticles, addBook, putBook]);

  useEffect(() => {
    sendRequest(localStorage.getItem('userId'));
  }, [articles, sendRequest, addState, putState]);

  useEffect(() => {
    setImageState(0);
    setImage = Array(20).fill(false);
    localStorage.setItem('userId', 'test');
    console.log(imageState);
  }, [props.country]);

  // for loading window
  let loading = [];
  for (let i = 0; i < 20; i++) {
    loading.push(
      <li className={classes.article} key={i}>
        <a href='/'>
          <div className={classes.imageContainer}>
            <Skeleton height={420} width={1000} />
          </div>
          <div className={classes.text}>
            <h3>
              <Skeleton />
            </h3>
            <p className={classes.source}>
              <Skeleton />
            </p>
            <p>
              <Skeleton count={3} />
            </p>
          </div>
        </a>
      </li>
    );
  }

  const imageLoadedHandler = (idx) => {
    setImage[idx] = true;
    setImageState(idx);
  };

  const svgClickHandler = (idx, article) => {
    const el = document.getElementById('tag--' + idx);
    console.log('el:', document.getElementById('tag--' + idx).style);
    if (window.getComputedStyle(el).fill !== 'rgb(251, 255, 0)') {
      el.style.fill = 'rgb(251, 255, 0)';
      settingCtx.addArticles(article);
    } else {
      el.style.fill = 'rgba(255, 255, 255, 0.863)';
      settingCtx.removeArticles(article);
    }
  };

  return (
    <>
      <ul className={classes.articles}>
        {props.articles &&
          props.articles.map((article, idx) => {
            // console.log(article.url.split('/'));
            const urlId = article.url.split('/');
            return (
              <li className={classes.article} key={article.title}>
                <Tag
                  id={`tag--${article.url}`}
                  className={
                    articles.findIndex(
                      (data) => article.title === data.title
                    ) === -1
                      ? `${classes.tag} tag--${article.url}`
                      : `${classes.tag} ${classes.tagColor} tag--${
                          urlId[urlId.length - 2]
                        }${urlId[urlId.length - 1]}`
                  }
                  onClick={() => svgClickHandler(`${article.url}`, article)}
                />
                <a href={article.url}>
                  <div className={classes.imageContainer}>
                    {article.urlToImage ? (
                      <>
                        {!setImage[idx] && (
                          <Skeleton height={420} width={1000} />
                        )}
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          onLoad={() => imageLoadedHandler(idx)}
                        />
                      </>
                    ) : (
                      <img src={notImage} alt={article.title} />
                    )}
                  </div>
                  <div className={classes.text}>
                    <h3>{article.title}</h3>
                    <p className={classes.source}>{article.source.name}</p>
                    <p>{article.content}</p>
                  </div>
                </a>
              </li>
            );
          })}
        {!props.articles.length && <>{loading}</>}
      </ul>
    </>
  );
};

export default Card;
