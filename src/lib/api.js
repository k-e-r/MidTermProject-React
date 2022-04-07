const firebaseDomain = process.env['REACT_APP_FIREBASE_DOMAIN'];

export async function getAllArticles() {
  const response = await fetch(`${firebaseDomain}/article.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch articles.');
  }

  const transformedArticles = [];

  for (const key in data) {
    const articleObj = {
      id: key,
      ...data[key],
    };

    transformedArticles.push(articleObj);
  }

  return transformedArticles;
}

export async function getSingleArticle(attrData) {
  const response = await fetch(`${firebaseDomain}/article/${attrData}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch article.');
  }

  const transformedArticles = [];

  for (const key in data) {
    const articleObj = {
      id: key,
      ...data[key],
    };

    transformedArticles.push(articleObj);
  }

  return transformedArticles;
}

export async function addArticle(articleData, attrData) {
  console.log('attrData:', attrData);
  const response = await fetch(`${firebaseDomain}/article/${attrData}.json`, {
    method: 'POST',
    body: JSON.stringify(articleData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create article.');
  }

  return null;
}

export async function putArticle(articleData, attrData, articleId) {
  const response = await fetch(
    `${firebaseDomain}/article/${attrData}/${articleId}.json`,
    {
      method: 'PUT',
      body: JSON.stringify(articleData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not rewrite article.');
  }

  return null;
}

export async function getNews(country = 'us', category = 'general') {
  // const request = require('request');
  const apiKey = process.env['REACT_APP_KEY'];
  const endpoint = process.env['REACT_APP_ENDPOINT'];

  const response = await fetch(
    `${endpoint}?country=${country}&category=${category}&apiKey=${apiKey}`
  );
  // const response = await fetch(`tekitou`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch articles.');
  }

  console.log(data);
  return data.articles;

  // const transformedArticles = [];

  // for (const key in data) {
  //   const articleObj = {
  //     id: key,
  //     ...data[key],
  //   };

  //   transformedArticles.push(articleObj);
  // }

  // return transformedArticles;
}
