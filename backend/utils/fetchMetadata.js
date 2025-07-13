const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchTitle = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $('title').text() || 'No title found';
  } catch (error) {
    console.error('Error fetching title:', error);
    return 'Untitled';
  }
};