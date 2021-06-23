import { ChangeEvent, useState } from "react";

import { useUserContext } from "../contexts/UserContext";
import { GameType, ImageType } from "../firebase/type";
import { uploadImageToFirebaseStorage } from "../utils/file";
import { replaceBrTagWithLineBreak } from "../utils/game";

const useGameForm = () => {
  const {
    state: { user },
  } = useUserContext();

  const [title, setTitle] = useState("");
  const [gid, setGid] = useState("");
  const [pid, setPid] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<ImageType[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [maker, setMaker] = useState("");
  const [source, setSource] = useState("");

  // 수정용 State
  const [docId, setDocId] = useState("");
  const [uid, setUid] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);

  const setGameForm = (game: GameType) => {
    setTitle(game.title);
    setGid(game.gid);
    setPid(game.pid || "");
    setContent(replaceBrTagWithLineBreak(game.content));
    setTags((game.tags || []).join(" "));
    setImages(game.images || []);
    setYoutubeUrl(game.youtubeUrl || "");
    setMaker(game.maker || "");
    setSource(game.source || "");

    setDocId(game.id);
    setUid(game.uid || "");
  };

  const uploadImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files.length > 0) {
      setUploadingImage(true);
      try {
        const promises = [...files].map(async (file) => {
          const url = await uploadImageToFirebaseStorage(user.uid, file);
          setImages((images) => [...images, { originName: file.name, url }]);
        });
        await Promise.all(promises);
      } catch (error) {
        alert("이미지 업로드 도중 에러가 발생했어요!");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const moveImageUp = (index: number) => {
    setImages((images) => {
      const newImage = [...images];
      [newImage[index], newImage[index - 1]] = [
        newImage[index - 1],
        newImage[index],
      ];
      return newImage;
    });
  };

  const moveImageDown = (index: number) => {
    setImages((images) => {
      const newImage = [...images];
      [newImage[index], newImage[index + 1]] = [
        newImage[index + 1],
        newImage[index],
      ];
      return newImage;
    });
  };

  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => index !== i));
  };

  return {
    title,
    setTitle,
    gid,
    setGid,
    pid,
    setPid,
    content,
    setContent,
    tags,
    setTags,
    images,
    setImages,
    youtubeUrl,
    setYoutubeUrl,
    maker,
    setMaker,
    source,
    setSource,
    docId,
    setDocId,
    uid,
    setUid,
    setGameForm,
    uploadingImage,
    setUploadingImage,
    uploadImages,
    moveImageUp,
    moveImageDown,
    removeImage,
  };
};

export default useGameForm;
