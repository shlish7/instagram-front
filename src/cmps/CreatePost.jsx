import { useEffect, useRef, useState } from "react";
import DragPhoto from "../assets/svg/drag-photos-icon.svg?react";
import CloseModal from "../assets/svg/close-modal-icon.svg?react";
// import CloseModal from '../assets/svg/close-btn-white.svg?react'
import BackIcon from "../assets/svg/back-icon.svg?react";
import { ImageUploader } from "./Imageuploader";
import { useSelector } from "react-redux";
import { addFeedItem } from "../store/feedItem.actions";
import ImageAvatars from "./ImageAvatars.jsx";
import EmojiPicker from "emoji-picker-react";
import EmojiPickerIcon from "../assets/svg/emojiIconCreatePost.svg?react";

export function CreatePost({ onCloseModal }) {
  const [imageUrl, setImageUrl] = useState()
  const [description, setDescription] = useState(false)
  const [caption, setCaption] = useState('')
  const [btnName, setBtnName] = useState("Next")
  const [showNextBtn, setShowNextBtn] = useState(false)
  const [isEmojiPicker, setIsEmojiPicker] = useState(false)
  const emojiPickerRef = useRef(null); // Ref for the emoji picker


  const feedItems = useSelector((storeState) => storeState.feedItemModule.feedItems);
  const user = useSelector((storeState) => storeState.userModule.user);

  // Close Emoji Picker on Escape or Click outside

  useEffect(() => {
    function handleKeydown(ev) {
      if (ev.key === "Escape") {
        setIsEmojiPicker(false);
      }
    }

    function handleClickOutside(ev) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(ev.target)) {
        setIsEmojiPicker(false);
      }
    }

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function onClickX(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    onCloseModal();
  }


  function onUploaded(imgUrl) {
    setImageUrl([imgUrl]);
    setShowNextBtn(true);
  }


  async function onSavePost(ev) {
    try {
      const newPost = {
        imageUrl,
        caption: caption,
        tags: [],
        comments: [],
        likes: [],
        createdAt: new Date().toISOString(),
      };


      await addFeedItem(newPost);


      ev.stopPropagation();
      ev.preventDefault();
      onCloseModal();
    } catch { }
  }


  function onMoveToWriteDescription(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    setDescription((prev) => !prev);
    if (btnName === "Next") setBtnName("Share");
    else if (btnName === "Share") {
      onSavePost(ev);
    }
  }

  function onMoveBack(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    setDescription((prev) => !prev);
    if (btnName === "Share") setBtnName("Next");
    else if (btnName === "Next") {
      setShowNextBtn(false);
      setImageUrl(null);
    }
  }

  function onAddDescription({ target }) {
    setCaption(target.value);
  }

  function onEmojiClick(emojiData) {
    setCaption((prevCaption) => (prevCaption || "") + emojiData.emoji);
    setIsEmojiPicker(prev => !prev)


    if (caption.trim() !== '' || emojiData.emoji) {
    }
  }


  function onOpenEmojiPicker() {
    setIsEmojiPicker(prev => !prev)
  }
  return (
    <>
      <section className="create-modal-container">
        <CloseModal
          className="close-modal-icon-create-post"
          onClick={onClickX}
        />

        <section className={"create-post-container"} >
          <section className="create-post-title-container">
            {showNextBtn && (
              <BackIcon className="back-icon" onClick={onMoveBack} />
            )}
            <span className="create-post-title">Create new post</span>
            {showNextBtn && (
              <button
                className="next-pic-create-post"
                onClick={onMoveToWriteDescription}
              >
                {btnName}
              </button>
            )}
          </section>
          {!imageUrl ? (
            <section className="modal-internal-container">
              <DragPhoto />
              <span className="drag-photos-span">
                Drag photos and videos here
              </span>
              <ImageUploader onUploaded={onUploaded} />
            </section>
          ) : (
            <>
              <section className="img-description">
                {/* <img src={imageUrl} alt="" className='create-post-img' /> */}
                {showNextBtn && (
                  <img
                    src={imageUrl}
                    alt=""
                    className={
                      description
                        ? "create-post-img-description"
                        : "create-post-img"
                    }
                  />
                )}
                {btnName==="Share" && <section className="create-post-avatar-and-text-area">
                  {btnName === "Share" && (
                    <section className="create-post-description">
                      <section className="create-post-avatar-and-username">
                        <ImageAvatars
                          className="create-post-image-avatars"
                          img={user?.imgUrl || null}
                          avatarHeight="28px !important"
                          avatarWidth="28px !important"
                        />
                        <span className="create-post-user-name">
                          {user.username}
                        </span>
                      </section>
                      {description && (
                        <textarea
                          value = {caption}
                          className="description-text-area"
                          onChange={onAddDescription}
                        />
                      )}
                    </section>
                  )}
                  {btnName === "Share" && <EmojiPickerIcon className="create-post-emoji-icon" onClick={onOpenEmojiPicker} />}
                  {isEmojiPicker && (


                    <div
                    ref={emojiPickerRef}
 
                    className="emoji-picker-wrapper">
                      <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                  )}

                </section>}
              </section>


              {/* <button className="save-img-to-db-btn" onClick={onSavePost}>Save Post</button> */}
            </>
          )}
        </section>
      </section>
    </>
  );
}



