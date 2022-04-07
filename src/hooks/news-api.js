import { useState, useEffect } from 'react';

let request = require('request');
let apiKey = process.env['REACT_APP_KEY'];
let endpoint = process.env['REACT_APP_ENDPOINT'];

const NewsAPI = (country = 'us', category = '') => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Construct parameters
    const request_params = {
      method: 'GET',
      uri: endpoint,
      headers: {
        'X-Api-Key': apiKey,
      },
      qs: {
        country: country,
        category: category,
      },
      json: true,
    };

    // request(request_params, function (error, response, body) {
    //   // console.error('error:', error);
    //   console.log('statusCode:', response && response.statusCode);
    //   console.log('response:', response.request.path);
    //   console.log(body.articles);
    //   setArticles(body.articles);
    // });
  }, [country, category]);

  return articles;
};

export default NewsAPI;
