import NewsAPI from '../hooks/news-api';
import Card from '../components/Layout/Card';

const Business = () => {
  const articles = NewsAPI('us', 'business');

  return (
    <section>
      <Card articles={articles} />
    </section>
  );
};

export default Business;
