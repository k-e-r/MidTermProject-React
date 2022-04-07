import Card from '../components/Card';
import ArticlesFunc from '../hooks/articles-func';

const Entertainment = () => {
  const { articles, country } = ArticlesFunc('entertainment');

  return (
    <section>
      <Card articles={articles} country={country} />
    </section>
  );
};

export default Entertainment;
