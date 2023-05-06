export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  Post = 'http://localhost:3334/api/post',
  Posts = 'http://localhost:3334/api/posts',
  Likes = 'http://localhost:3335/api/like',
  Comments = 'http://localhost:3335/api/comment'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 50000;
