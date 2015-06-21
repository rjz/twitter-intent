function partial (fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function identity (x) {
  return x;
}

function stripOptionalPrefix (prefix, str) {
  return (str.indexOf(prefix) === 0) ? str.slice(1) : str;
}

var formatUsername = partial(stripOptionalPrefix, '@');

var FORMATTERS = {
  'text': encodeURIComponent,
  'url': encodeURIComponent,
  'userid': identity,
  'hashtags': function (hashtags) {
    if (!(hashtags instanceof Array)) {
      return FORMATTERS.hashtags([hashtags]);
    }
    return hashtags.map(partial(stripOptionalPrefix, '#')).join(',');
  },
  'via': formatUsername,
  'screenname': formatUsername,
  'related': function (related) {
    if (!(related instanceof Array)) {
      return FORMATTERS.related([related]);
    }
    return related.map(function (r) {
      if (r instanceof Array) {
        return [formatUsername(r[0])].concat(r.slice(1)).join(':');
      }
      return formatUsername(r); // string
    }).map(encodeURIComponent).join(',');
  },
  'in_reply_to': identity,
  'tweet_id': identity
};

function qsFactory (ALLOWED_PARAMS, params) {
  var formatted = [];
  Object.keys(params).forEach(function (k) {
    if (ALLOWED_PARAMS.indexOf(k) > -1) {
      formatted.push(k + '=' + FORMATTERS[k](params[k]));
    }
  });
  return formatted.join('&');
};

module.exports = function endpoint (path, validParams) {
  var url = 'https://twitter.com/intent' + path;
  return {
    qs: partial(qsFactory, validParams),
    url: function (params) {
      return [url, this.qs(params)].join('?');
    }
  };
};

