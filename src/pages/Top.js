import Card from '../components/Card';
import ArticlesFunc from '../hooks/articles-func';

const Top = () => {
  const { articles, country } = ArticlesFunc();

  return (
    <section>
      <Card articles={articles} country={country} />
    </section>
  );
};

export default Top;
