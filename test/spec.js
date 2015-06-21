var assert = require('assert');

var intent = require('../index');

describe('twitter-intent', function () {

  describe('.tweet', function () {

    function expectQuery (queryStr) {
      return ['https://twitter.com/intent/tweet', queryStr].join('?');
    }

    it('handles simple parameters', function () {
      assert.equal(expectQuery('text=something%20inane&via=rjzaworski'), intent.tweet.url({
        text: 'something inane',
        via: 'rjzaworski'
      }));
    });

    describe('- via', function () {
      it('drops leading "@"', function () {
        assert.equal(expectQuery('text=something%20inane&via=rjzaworski'), intent.tweet.url({
          text: 'something inane',
          via: '@rjzaworski'
        }));
      });
    });

    describe('- hashtags', function () {
      it('drops leading "#"', function () {
        assert.equal(expectQuery('text=something%20inane&hashtags=foobar'), intent.tweet.url({
          text: 'something inane',
          hashtags: ['#foobar']
        }));
      });

      it('accepts a string', function () {
        assert.equal(expectQuery('text=something%20inane&hashtags=foobar'), intent.tweet.url({
          text: 'something inane',
          hashtags: '#foobar'
        }));
      });
    });

    describe('- related', function () {

      it('works for single accounts', function () {
        assert.equal(expectQuery('related=twitter'), intent.tweet.url({
          related: [
            ['twitter']
          ]
        }));
      });

      it('works for lists of accounts', function () {
        assert.equal(expectQuery('related=twitter,twitterapi'), intent.tweet.url({
          related: [
            ['twitter'],
            ['twitterapi']
          ]
        }));
      });

      it('works for lists with descriptions', function () {
        assert.equal(expectQuery('related=twitter%3ATwitter%20News,twitterapi%3ATwitter%20API%20News'), intent.tweet.url({
          related: [
            ['twitter', 'Twitter News'],
            ['twitterapi', 'Twitter API News']
          ]
        }));
      });
    });
  });
});

