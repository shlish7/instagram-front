import { LeftSideBar } from '../cmps/LeftSideBar.jsx'
import ProfileHeader from '../cmps/profile/ProfileHeader.jsx';
import ProfileBody from '../cmps/profile/ProfileBody.jsx';
import { loadFeedItems } from '../store/feedItem.actions.js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { userService } from '../services/user.service.remote.js';

export function Profile() {
    const feedItems = useSelector(storeState => storeState.feedItemModule.feedItems)
    const navigate = useNavigate()
    const { userId } = useParams()
    const [user,setUser] = useState() 

    useEffect(() => {
      loadFeedItems()
    
    }, [])

    useEffect(() => {
      getUser()
    }, [userId])

    async function getUser(){
      const currentUser = await userService.getById(userId)
      setUser(currentUser)
    }


  function onOpenFeedItem(ev, id) {
    ev.stopPropagation()
    ev.preventDefault()
    navigate(`/p/${id}`)
  }

    return (<>
        <section className='profile-page'>
            <aside className="profie-left-side-bar">
                <LeftSideBar />
            </aside>
            <main className='profile-main-side'>
              <section className="profile-main-container">      
                {user && <ProfileHeader feedItems={feedItems} user={user}/>}
                {user && <ProfileBody feedItems={feedItems} user={user} onOpenFeedItem={onOpenFeedItem}/>}
              </section>
            </main>
        </section>


    </>



    )
}

