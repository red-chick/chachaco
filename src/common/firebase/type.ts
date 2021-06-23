export type ImageType = { originName: string; url: string };

export type GameType = {
  id: string;
  createdAt: { _seconds: number };
  updatedAt: { _seconds: number };
  uid: string;
  uname: string;
  title: string;
  gid: string;
  pid: string;
  content: string;
  tags: string[];
  images: ImageType[];
  youtubeUrl: string;
  likesUids: string[];
  likesCount: number;
  maker: string;
  source: string;
};
