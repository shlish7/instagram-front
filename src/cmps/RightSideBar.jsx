import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import ImageAvatars from './ImageAvatars'
import { LoginSignup } from './LoginSignup'
import { login, logout, signup } from '../store/user.actions.js'


export function RightSideBar() {

    const user = useSelector(storeState => storeState.userModule.user)
    const [isRightBar,setIsRightBar] = useState()

    useEffect(() => {
        const handleResize = () => {
          // Check if the window width is less than 1260px
          const isSmallScreen = window.innerWidth < 1260;
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

    async function onLogout() {
        console.log('switch');
        try {
          await logout()
          showSuccessMsg(`Bye now`)
        } catch (err) {
          showErrorMsg('Cannot logout')
        }
    }
    
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

    return (
        <section className="signup-signin">
          {user &&
            <span className="user-info">
              {user.imgUrl && <ImageAvatars img={user.imgUrl} avatarWidth='44px' avatarHeight='44px' />}
              <section className='user-info-full-and-first-name'>
                <span className='user-info-full-name'>{user.fullname}</span>
                <span className='user-info-first-name'>{'first name'}</span>
              </section>

              <span className='switch-user-btn' onClick={onLogout}>Switch</span>
            </span>
          }

          {!user &&
            <div className="user-info">
              <LoginSignup onLogin={onLogin} onSignup={onSignup} />
            </div>
          }
        </section>  
    )
}

