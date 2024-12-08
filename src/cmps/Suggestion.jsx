// import React, { useEffect, useState } from 'react'
// import ImageAvatars from './ImageAvatars'
// import { useSelector } from 'react-redux';
// import { loadUser, loadUsers } from '../store/user.actions';

// export default function Suggestion() {
//     const [suggestedUsers, setSuggestedUsers] = useState([])
//     const [followBtn, setFollowBtn] = useState('Follow')

//     const users = useSelector(storeState => storeState.userModule.users)
//     const loggedinUser = useSelector(storeState => storeState.userModule.user)

//     useEffect(() => {
//         if (users.length > 0 && loggedinUser) {
//             const filteredUsers = users?.filter(user => 
//                 user._id !== loggedinUser._id && 
//                 !loggedinUser.following.includes(user._id))
//             setSuggestedUsers(filteredUsers.slice(0, 10))
//         }
//     }, [users, loggedinUser])

//     function onFollowing(){
//         followBtn === 'Follow' ? setFollowBtn('Following') : setFollowBtn('Follow')
//     }


//     return (
//         <div className='suggestion-users'>
//             <span className="suggestion-span">Suggested for you</span>
//             <ul className="suggestion-ul">
//                 {suggestedUsers.map(user => (
//                     <li key={user._id} className="suggestion-li">
//                         <section className="suggested-user-details">
//                             <ImageAvatars
//                                 img={user.imgUrl || null}
//                                 avatarHeight="30px !important"
//                                 avatarWidth="30px !important"
//                             />
//                             <span className="suggestion-username">{user.username}</span>
//                         </section>
//                         <button className="suggest-follow-btn" onClick={onFollowing}>{followBtn}</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react'
import ImageAvatars from './ImageAvatars'
import { useSelector } from 'react-redux';
import { updateUser } from '../store/user.actions';
import { cat } from '@cloudinary/url-gen/qualifiers/focusOn';

export default function Suggestion() {
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [buttonStates, setButtonStates] = useState({}) // Track button states individually

    const users = useSelector(storeState => storeState.userModule.users)
    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    console.log('loggedinUser',loggedinUser);
    console.log('users', users);
    console.log('loggedinUser',loggedinUser?.following);

    useEffect(() => {
        if (users.length > 0 && loggedinUser) {
            const filteredUsers = users.filter(user =>
                user._id !== loggedinUser._id &&
                !loggedinUser?.following?.includes(user._id)
            )
            setSuggestedUsers(filteredUsers.slice(0, 10))

            // Initialize button states for each user
            const initialStates = filteredUsers.reduce((acc, user) => {
                acc[user._id] = 'Follow'
                return acc
            }, {})
            setButtonStates(initialStates)
        }
    }, [users])

    async function onFollowing(userId) {
        try{
            setButtonStates(prevStates => ({
                ...prevStates,
                [userId]: prevStates[userId] === 'Follow' ? 'Following' : 'Follow'
            }))
    
            console.log('Clicked userId:', userId); // Log the clicked user's ID const 
            const isFollowing = loggedinUser?.following.includes(userId);
            console.log('Is logged-in user following this user?', isFollowing);
            const updatedFollowing = isFollowing ? null
                : [...loggedinUser.following, userId]; // Add userId if not following 
                console.log('userId',userId);
            console.log('updatedFollowing', updatedFollowing);
            await updateUser({ ...loggedinUser, following: updatedFollowing });
        }
        catch (err) {
            console.log('Error updating following:', err);
        }


    }

    return (
        <div className='suggestion-users'>
            <span className="suggestion-span">Suggested for you</span>
            <ul className="suggestion-ul">
                {suggestedUsers.map(user => (
                    <li key={user._id} className="suggestion-li">
                        <section className="suggested-user-details">
                            <ImageAvatars
                                img={user.imgUrl || null}
                                avatarHeight="30px !important"
                                avatarWidth="30px !important"
                            />
                            <span className="suggestion-username">{user.username}</span>
                        </section>
                        <button
                            className={`suggest-follow-btn ${buttonStates[user._id] === 'Following' ? 'following' : ''}`}
                            onClick={() => onFollowing(user._id)}
                        >
                            {buttonStates[user._id]}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

