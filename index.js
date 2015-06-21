var endpoint = require('./src/endpoint');

module.exports = {

  tweet: endpoint('/tweet', [
    'text',
    'url',
    'hashtags',
    'via',
    'related',
    'in_reply_to'
  ]),

  retweet: endpoint('/retweet', [
    'tweet_id',
    'related'
  ]),

  favorite: endpoint('/favorite', [
    'tweet_id',
    'related'
  ]),

  user: endpoint('/user', [
    'screen_name',
    'userid'
  ]),

  follow: endpoint('/follow', [
    'screen_name',
    'userid'
  ])
};

