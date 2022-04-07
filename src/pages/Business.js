import Card from '../components/Card';
import ArticlesFunc from '../hooks/articles-func';

const Business = () => {
  const { articles, country } = ArticlesFunc('business');

  return (
    <section>
      <Card articles={articles} country={country} />
    </section>
  );
};

export default Business;
