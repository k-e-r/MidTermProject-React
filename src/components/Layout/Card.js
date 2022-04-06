import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import classes from './Card.module.css';
import notImage from '../../assets/image-not-found-scaled.jpg';

const Card = (props) => {
  // for loading window
  let loading = [];
  for (let i = 0; i < 20; i++) {
    loading.push(
      <li className={classes.article} key={i}>
        <a href='/'>
          <div className={classes.imageContainer}>
            <Skeleton height={200} width={1000} />
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

  return (
    <>
      <ul className={classes.articles}>
        {props.articles &&
          props.articles.map((article) => (
            <li className={classes.article} key={article.title}>
              <a href={article.url}>
                {article.urlToImage ? (
                  <div className={classes.imageContainer}>
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      loading='lazy'
                    />
                  </div>
                ) : (
                  <div className={classes.imageContainer}>
                    <img src={notImage} alt={article.title} />
                  </div>
                )}
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
