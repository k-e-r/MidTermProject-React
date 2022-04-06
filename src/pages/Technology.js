import NewsAPI from '../hooks/news-api';
import Card from '../components/Layout/Card';

const Technology = () => {
  const articles = NewsAPI('us', 'technology');

  return (
    <section>
      <Card articles={articles} />
    </section>
  );
};

export default Technology;
