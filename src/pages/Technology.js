import Card from '../components/Layout/Card';
import ArticlesFunc from '../hooks/articles-func';

const Technology = () => {
  const { articles, country } = ArticlesFunc('technology');

  return (
    <section>
      <Card articles={articles} country={country} />
    </section>
  );
};

export default Technology;
