import { useEffect, useState } from 'react'
import { userService } from '../../services/user.service'
import ImageAvatars from '../ImageAvatars';
import LikeIconComment from '../../assets/svg/like-comment-icon.svg?react'

export function CommentsList({feedItem}) {
    const [commentsWithUsers, setCommentsWithUsers] = useState([]);

    useEffect(() => {
      const fetchUsersForComments = async () => {
        const commentsWithUserData = await Promise.all(
          feedItem.comments.map(async (item) => {
            const user = await userService.getById(item.userId); 
            return { ...item, user }; 
          })
        );

        setCommentsWithUsers(commentsWithUserData);
      };
  
      fetchUsersForComments();
    }, [feedItem]);

  return (
    <section className="comments-list-section">
      <ul className="comments-list-ul-full-screen">
        {commentsWithUsers.map((item, index) => (
            <li className='comments-list-li-full-screen' key={index}>
              <ImageAvatars img={item.user.imgUrl}/>
              <p className ='comments-user-name-full-screen'>{item.user.fullname}</p>
              <p className ='comment-full-screen'>{item.comment}</p>
              <LikeIconComment/>
            </li>
          ))}
      </ul>
    </section>
  )
}

