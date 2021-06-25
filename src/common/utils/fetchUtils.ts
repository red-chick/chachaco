import { ImageType } from "../firebase/type";

const get = (url: string) => {
  return fetch(url);
};

const post = (url: string, body: Object) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const patch = (url: string, body: Object) => {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const del = (url: string) => {
  return fetch(url, {
    method: "DELETE",
  });
};

export const getGame = (gid: string | string[]) => {
  return get(`/api/game/${gid}`);
};

export const getGameFromServer = (gid: string | string[]) => {
  return get(`https://www.chachaco.site/api/game/${gid}`);
};

export const postGame = (
  uid: string,
  uname: string,
  title: string,
  gid: string,
  pid: string,
  content: string,
  tags: string[],
  images: ImageType[],
  youtubeUrl: string,
  maker: string,
  source: string
) => {
  return post("/api/game", {
    uid,
    uname,
    title,
    gid,
    pid,
    content,
    tags,
    images,
    youtubeUrl,
    maker,
    source,
  });
};

export const patchGame = (
  docId: string,
  title: string,
  pid: string,
  content: string,
  tags: string[],
  youtubeUrl: string,
  images: ImageType[],
  maker: string,
  source: string
) => {
  return patch(`/api/game/${docId}`, {
    docId,
    title,
    pid,
    content,
    tags,
    youtubeUrl,
    images,
    maker,
    source,
  });
};

export const patchGameLike = (id: string, uid: string) => {
  return patch("/api/game/like", {
    id,
    uid,
  });
};

export const patchGameUnLike = (id: string, uid: string) => {
  return patch("/api/game/unlike", {
    id,
    uid,
  });
};

export const postGameComment = (
  gameId: string,
  uid: string,
  uname: string,
  comment: string
) => {
  return post("/api/comment", {
    gameId,
    uid,
    uname,
    comment,
  });
};

export const deleteGameComment = (commentId: string) => {
  return del(`/api/comment?id=${commentId}`);
};

export const deleteGame = (id: string) => {
  return del(`/api/game/${id}`);
};
