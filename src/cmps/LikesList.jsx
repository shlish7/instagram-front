import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service.remote.js';
import ImageAvatars from './ImageAvatars.jsx'
import CloseModal from '../assets/svg/close-btn-white.svg?react';
import { useNavigate } from 'react-router';

export default function LikesList({ feedItem, onCloseModal }) {

  const [likesWithUsers, setLikesWithUsers] = useState([]);
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.user)

  useEffect(() => {
    const fetchUsersForLikes = async () => {
      const likesWithUserData = await Promise.all(
        feedItem?.likes?.map(async (item) => {
          const user = await userService.getById(item.userId);
          return { ...item, user };
        })
      );

  
      setLikesWithUsers(likesWithUserData);
    };

    fetchUsersForLikes();
  }, [feedItem]);

  function onCloseLikesModal(ev){
    ev.stopPropagation()
    ev.preventDefault()
    onCloseModal()
  }
  function onNavigateToProfile(userId){
    navigate("/"+userId)
  }

  return (

    <section className='likes-modal'>
      <section className='likes-modal-section'>
        <span className='likes-modal-title'>Likes</span>
        <CloseModal onClick={onCloseLikesModal}/>
      </section>
      <section className="likes-modal-body">
        <ul className='likes-ul-modal'>
          {likesWithUsers?.map((item, idx) =>
            <li key={idx} className='likes-list'>
              <section className="likes-list-avatar-user" onClick={()=>{onNavigateToProfile(item.user._id)}}>
              <ImageAvatars img={item.user.imgUrl}/>
              {item.user.username}
              </section>
             
              {item.user._id !== user._id && <button className='like-list-modal-button'>Follow</button>}
            </li>
          )}
        </ul>

      </section>

    </section>
  )
}
