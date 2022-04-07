import { useState, useEffect } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import classes from './Card.module.css';
import notImage from '../assets/image-not-found-scaled.jpg';
import { ReactComponent as Tag } from '../assets/bookmark.svg';

let setImage = Array(20).fill(false);

const Card = (props) => {
  const [imageState, setImageState] = useState(0);

  useEffect(() => {
    setImageState(0);
    setImage = Array(20).fill(false);
    localStorage.setItem('userId', 'test');
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
    console.log('tag:', document.getElementsByClassName(`tag-${idx}`));
    console.log('article:', article);

    const style = document.getElementsByClassName(`tag-${idx}`)[0].style.fill;
    if (style === '' || style === 'rgba(255, 255, 255, 0.863)') {
      document.getElementsByClassName(`tag-${idx}`)[0].style.fill = '#fbff00';
    } else
      document.getElementsByClassName(`tag-${idx}`)[0].style.fill =
        'rgba(255, 255, 255, 0.863)';
  };

  return (
    <>
      <ul className={classes.articles}>
        {props.articles &&
          props.articles.map((article, idx) => (
            <li className={classes.article} key={idx}>
              <Tag
                className={`${classes.tag} tag-${idx}`}
                onClick={() => svgClickHandler(idx, article)}
              />
              <a href={article.url}>
                <div className={classes.imageContainer}>
                  {article.urlToImage ? (
                    <>
                      {!setImage[idx] && <Skeleton height={420} width={1000} />}
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
          ))}
        {!props.articles.length && <>{loading}</>}
      </ul>
    </>
  );
};

export default Card;
