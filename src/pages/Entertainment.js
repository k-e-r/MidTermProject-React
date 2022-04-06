import NewsAPI from '../hooks/news-api';
import Card from '../components/Layout/Card';

const Entertainment = () => {
  const articles = NewsAPI('us', 'entertainment');

  return (
    <section>
      <Card articles={articles} />
    </section>
  );
};

export default Entertainment;
