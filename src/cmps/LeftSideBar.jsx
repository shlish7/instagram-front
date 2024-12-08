import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import HomeIcon from '../assets/svg/home-icon.svg?react'
// import InstagramIconLogo from '../assets/svg/instagram-side-bar-logo.svg?react'
import InstagramIconLogo from '../assets/svg/InstaOr1.svg?react'
import InstagramNarrowLogo from '../assets/svg/instagram-icon-logo.svg?react'
import SearchIcon from '../assets/svg/search-icon.svg?react'
import ExploreIcon from '../assets/svg/explore-icon.svg?react'
import ReelsIcon from '../assets/svg/reels-icon.svg?react'
import MessagesIcon from '../assets/svg/messages-icon.svg?react'
import NotificationsIcon from '../assets/svg/notifications-icon.svg?react'
import CreateIcon from '../assets/svg/create-icon.svg?react'
import ThreadsIcon from '../assets/svg/threads-icon.svg?react'
import MoreIcon from '../assets/svg/more-icon.svg?react'
import ImageAvatars from './ImageAvatars.jsx'
import { CreatePost } from './CreatePost.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, signup } from '../store/user.actions.js'
import { SearchBar } from './SearchBar.jsx'
import { useNavigate } from 'react-router'

export function LeftSideBar({chat = false}) {

  const user = useSelector(storeState => storeState.userModule.user)

  const [openModal, setOpenModal] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [changeToNarrow, setChangeToNarrow] = useState(false)
  const [openSerachBar, setOpenSearchBar] = useState(false)
  const [activeOption, setActiveOption] = useState('Home')

  const searchBarRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenSearchBar(false); // Close the search bar on Esc or Enter
      }
    };

    const handleClickOutside = (event) => {
      // Close the search bar if the click is outside the search bar
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setOpenSearchBar(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the listeners
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is less than 1264px
      const isSmallScreen = window.innerWidth < 1264;
      // setIsSmallScreen(window.innerWidth < 1264)
      setChangeToNarrow(isSmallScreen || chat);  // Update the state based on the screen size
      setIsSidebarOpen(window.innerWidth >= 768); // Adjust the sidebar visibility as needed

    };


    // Initial check on component mount
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const instagramIcons = [
    {
      name: "Home",
      svg: HomeIcon
    },
    {
      name: "Search",
      svg: SearchIcon
    },
    {
      name: "Explore",
      svg: ExploreIcon
    },
    {
      name: "Reels",
      svg: ReelsIcon
    },
    {
      name: "Messages",
      svg: MessagesIcon
    },
    {
      name: "Notifications",
      svg: NotificationsIcon
    },
    {
      name: "Create",
      svg: CreateIcon
    },
    {
      name: "Profile",
      svg: null
    }

  ]

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }

  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user:${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function onOpenModal(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    const { value, name, textContext } = ev.currentTarget.dataset
   
    if (name.toLowerCase() === 'create') {
      setOpenModal(prev => !prev)
    }
    else if(name.toLowerCase() === 'home'){
      navigate('/')
    }
    else if (name.toLowerCase() === 'search') {

      if (!openSerachBar && window.innerWidth >= 1264) {
        setOpenSearchBar(true)
        setChangeToNarrow(true)
      }
      else if (openSerachBar && window.innerWidth >= 1264) {
        setOpenSearchBar(false)
        setChangeToNarrow(false)
      }
      else if (!openSerachBar && window.innerWidth < 1264) {
        setOpenSearchBar(true)
      }
      else if (openSerachBar && window.innerWidth < 1264) {
        setOpenSearchBar(false)
      }



    }
    else if(name.toLowerCase() === 'profile'){
      navigate('/'+user._id)
    }
    else if(name.toLowerCase() === 'explore'){
      navigate('/explore')
    }
    else if(name.toLowerCase() === 'messages'){
      navigate('/chat')
    }
  }

  function onCloseModal() {
    setOpenModal(prev => !prev)
  }

  return (
    <>
      <section className={!changeToNarrow ? "wide-side-bar-container" : "narrow-side-bar-container"} >
        <ul className="side-bar-ul">
          {!changeToNarrow ?
            (
              <section className='instagram-logo' >
                <InstagramIconLogo />
              </section>)
            :
            (<section className='instagram-narrow-logo' >
              <InstagramNarrowLogo />
            </section>)
          }
          {instagramIcons.map((icon, idx) => (
            <li key={idx}
              data-value={icon.name}
              data-name={icon.name}
              className={`side-bar-li ${activeOption === icon.name ? 'active-option' : ''} ${
                changeToNarrow ? "narrow-side-bar-li" : "wide-side-bar-li"
              }`}
              // className='side-bar-li'
              onClick={onOpenModal}
            >
              {openSerachBar ? <div ref={searchBarRef}><SearchBar /></div> : null}
              {icon.svg && <icon.svg />}
              {icon.name === 'Profile' && <ImageAvatars img={user?.imgUrl || null} avatarHeight='24px !important' avatarWidth='24px !important' />}
              {!changeToNarrow && icon.name}
            </li>
          ))}
        </ul>
        {openModal ? <CreatePost onCloseModal={onCloseModal} /> : null}


        {/* <section className="signup-signin">
        {user &&
            <span className="user-info">
                { user.imgUrl && <img src={user.imgUrl} /> }
                { user.fullname }
                <span className="score">{user.balance?.toLocaleString()}</span>
                <button onClick={onLogout}>Logout</button>
            </span>
        }
        {!user &&
            <div className="user-info">
                <LoginSignup onLogin={onLogin} onSignup={onSignup} />
            </div>
        }
      </section> */}

        <section className='left-side-bar-footer'>
          <section className='side-bar-botton-icons'>
            <ThreadsIcon />
            {!changeToNarrow ? <span>Threads</span> : null}
          </section>
          <section className='side-bar-botton-icons'>
            <MoreIcon />
            {!changeToNarrow ? <span>More</span> : null}
          </section>

        </section>
      </section>



    </>

  )
}