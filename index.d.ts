export type TweetParams = {
  text?: string,
  url?: string,
  via?: string,
  related?: string | string[],
  in_reply_to?: string,
  hashtags?: string | string[],
}

export type EngagementParams = {
  tweet_id?: string
  related?: string | string[],
}

export type UserParams = {
  screen_name?: string
  userid?: string
}

export namespace tweet {
  function url(params: TweetParams): string
}

export namespace favorite {
  function url(params: EngagementParams): string
}

export namespace retweet {
  function url(params: EngagementParams): string
}

export namespace user {
  function url(params: UserParams): string
}

export namespace follow {
  function url(params: UserParams): string
}
