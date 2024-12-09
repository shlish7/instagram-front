import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EmojiPicker from 'emoji-picker-react'
import { loadFeedItem, updateFeedItem } from '../../store/feedItem.actions';

import EmojiPickerIconFullScreen from '../../assets/svg/emoji-icon-full-screen.svg?react';
import EmojiPickerIcon from '../../assets/svg/emoji-picker.svg?react';
import LikeCommentIcon from '../../assets/svg/like-comment-icon.svg?react';
import UnLikeCommentIcon from '../../assets/svg/red-like-comment-icon.svg?react';

export function NewComment({ handleCommentSubmit, fullScreen }) {
  
  const user = useSelector(storeState => storeState.userModule.user)
  const feedItem = useSelector(storeState => storeState.feedItemModule.feedItem)

  const [comment, setComment] = useState('')
  const [newComment, setNewComment] = useState()
  const [newCommentTxt, setNewCommentTxt] = useState()
  const [hidePostBtn, setHidePostBtn] = useState(fullScreen)

  const [postCommentBtn, setPostCommentBtn] = useState(false)
  const [isEmojiPickerFullScreen, setIsEmojiPickerFullScreen] = useState(false)
  const [isEmojiPicker, setIsEmojiPicker] = useState(false)
  const [isLikedComment, setIsLikedComment] = useState(false)

  function getBtnStyle(){
    if(fullScreen){
      return comment.trim()!=='' ? 'post-comment-btn' :'post-comment-btn post-comment-btn-opacity'
    }
    else{
      return comment.trim()!=='' ? 'post-comment-btn' :'post-comment-btn-hidden'
    }
  }
  
  function onLikeComment() {
    setIsLikedComment(prev => !prev)
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isEmojiPicker) {
        setIsEmojiPicker(false);
        setIsEmojiPickerFullScreen(false)
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        setIsEmojiPicker(false)
        setIsEmojiPickerFullScreen(false)      
      }
    }
    

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEmojiPicker]);

  async function onUpdateComment({ target }) {
    const { value } = target

    const userId = user._id
    // const updatedComments = [...feedItem.comments, { userId, comment: value.trim() }];

    // const savedFeedItem = await updateFeedItem({ ...feedItem, comments: updatedComments });
    
    setComment(value)
    if (value.trim() !== '') {
      setHidePostBtn(false)
      setPostCommentBtn(true)
    } else {
      setHidePostBtn(true)
      setPostCommentBtn(false)

    }
  }

  function onOpenEmojiPickerFullScreen() {
    setIsEmojiPickerFullScreen(prev => !prev)
  }
  function onOpenEmojiPicker() {
    setIsEmojiPicker(prev => !prev)
  }

    async function onHandleCommentSubmit(){
    if (comment.trim() !== '') {
      setNewCommentTxt(comment.trim())
      fullScreen ? null : setNewComment(prev => !prev)
      const userId = user._id
      const updatedComments = [...feedItem?.comments, { userId, comment: comment.trim() }];
      console.log('updated comments', updatedComments);
      const savedFeedItem = await updateFeedItem({ ...feedItem, comments: updatedComments });
      console.log('saved item',savedFeedItem);
      
      setPostCommentBtn(false)
      setComment(''); 

      handleCommentSubmit && handleCommentSubmit(comment.trim())
    }
  };

  function onEmojiClick(emojiData) {
    setComment(prevComment => prevComment + emojiData.emoji)
    setIsEmojiPicker(prev => !prev)

    if (comment.trim() !== '' || emojiData.emoji) {
      setPostCommentBtn(true)
    }
  }

  return (
    <>
      {newComment &&
        <section className="new-comment-container">
          <section className='new-comment-details'>
            <span className="new-comment-user-name">{user.fullname}</span>
            <span className="new-comment">{newCommentTxt}</span>
          </section>
          {
            !isLikedComment 
            ? <LikeCommentIcon className='like-comment-icon' onClick={onLikeComment} /> 
            : <UnLikeCommentIcon onClick={onLikeComment} />
          }
        </section>
      }

      <section className="add-comment-and-emoji">
        <div className="emoji-picker-container">
          {fullScreen && <EmojiPickerIconFullScreen className='emoji-picker' onClick={onOpenEmojiPickerFullScreen} />}
          {isEmojiPickerFullScreen && (
            <div className="emoji-picker-wrapper">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <textarea
          type="text"
          // className={fullScreen ? "home-add-comment": "home-add-comment"}
          className={`home-add-comment ${fullScreen ? 'home-add-comment-full-screen' : ''}`}

          placeholder="Add a comment…"
          aria-label="Add a comment…"
          value={comment}
          onChange={onUpdateComment}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onHandleCommentSubmit();
            }
          }}
        />

        <button
          className={getBtnStyle()}
          onClick={onHandleCommentSubmit}>
          Post
        </button>

        {!fullScreen && <EmojiPickerIcon className='emoji-picker' onClick={onOpenEmojiPicker}/>}
        {isEmojiPicker && (
            <div className="emoji-picker-wrapper">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
      </section>
    </>
  )
}

