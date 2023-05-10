export const DEFAULT_COMMENT_COUNT_LIMIT=50;

export const enum CommentValidate {
  MinCommentLength = 10,
  MaxCommentLength = 300,
}

export const enum PassValidate {
  MinPassLength = 6,
  MaxPassLength = 12,
}

export const enum TagValidate {
  MinTagLength = 3,
  MaxTagLength = 10,
  MaxTagsCount = 8
}
