import { useEffect, useState } from 'react'
import { userService } from '../../services/user.service.remote'
import ImageAvatars from '../ImageAvatars';
import LikeIconComment from '../../assets/svg/like-comment-icon.svg?react'
import { useNavigate } from 'react-router';

export function CommentsList({ feedItem }) {
  
  const [commentsWithUsers, setCommentsWithUsers] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUsersForComments = async () => {

      const commentsWithUserData = await Promise.all(
        feedItem?.comments?.map(async (item) => {
          const user = await userService.getById(item?.userId);
          return { ...item, user };
        })
      );

      setCommentsWithUsers(commentsWithUserData);
    };

    fetchUsersForComments();
  }, [feedItem]);

  function onNavigateToProfile(userId){
    navigate("/"+userId)
  }

  return (
    <section className="comments-list-section">
      <ul className="comments-list-ul-full-screen">
        {commentsWithUsers.map((item, index) => (
          <li className='comments-list-li-full-screen' key={index}>
            <section className="comment-li-avatar-and-comment" onClick={()=>{onNavigateToProfile(item.user._id)}}>
              <ImageAvatars img={item.user.imgUrl} />
              <p className='comments-user-name-full-screen'>{item.user.username}</p>
              <p className='comment-full-screen'>{item.comment}</p>
            </section>

            <LikeIconComment className="comment-likes"/>
          </li>
        ))}
      </ul>
    </section>
  )
}

