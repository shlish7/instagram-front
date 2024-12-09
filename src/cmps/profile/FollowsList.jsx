import React, { useEffect, useState } from 'react'
import MagnifyingGlassIcon from '../../assets/svg/magnifying-glass.svg?react';

import CloseModalIcon from '../../assets/svg/close-btn-white.svg?react';
import RemoveSearchIcon from '../../assets/svg/remove-search-icon.svg?react';
import { userService } from '../../services/user.service.remote';
import { useSelector } from 'react-redux';
import { loadUsers } from '../../store/user.actions';
import ImageAvatars from '../ImageAvatars';


export default function FollowsList({ onCloseModal, user, followType }) {
  const [displayIcon, setDisplayIcon] = useState(true)
  const [searchTxt, setSearchTxt] = useState('')
  const [isFollowing, setIsFollowing] = useState()
  const [followers, setFollowers] = useState([])
  const [filterToEdit, setFilterToEdit ] = useState(userService.getDefaultFilter())
  const [filteredUsers, setFilteredUsers] = useState(followers)

  useEffect(() => {
    loadUsers()
    user && isFollowing ? getFollowing() : getFollowers()
  }, [user])

  useEffect(() => {
    const { username, fullname } = filterToEdit

    const newFilteredUsers = followers?.filter(user => {
        const usernameMatch = user?.username.toLowerCase().includes(username.toLowerCase())
        const fullnameMatch = user?.fullname.toLowerCase().includes(fullname.toLowerCase())
        return usernameMatch || fullnameMatch;
    });
    setFilteredUsers(newFilteredUsers);
  }, [filterToEdit, followers])



  async function getFollowers() {
    const followers = await Promise.all(
      user?.followers?.map(async (item) => {
        const follower = await userService.getById(item)
        return follower
      })
    );
    setFollowers(followers)
  }

  async function getFollowing() {
    const following = await Promise.all(
      user.following.map(async (item) => {
        const follow = await userService.getById(item)
        return follow
      })
    );
    setFollowers(following)
  }

  function onHandleChange({target}) {

    const value = target.value
    setFilterToEdit({ ...filterToEdit, username: value, fullname: value })

}

function onClearSearch() {
    setFilterToEdit({ ...filterToEdit, username: '' , fullname: ''})
}

  function onClosefollowsModal(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    onCloseModal()
  }

  function onFocus() {
    setDisplayIcon(prev => !prev)
  }
  function onBlur() {
    setDisplayIcon(prev => !prev)
  }


  return (

    <section className='follows-modal'>
      <section className='follows-modal-section'>
        <span className='follows-modal-title'>{followType}</span>
        <CloseModalIcon onClick={onClosefollowsModal} />
      </section>
      <section className="search-follows-section">
        {displayIcon && searchTxt === '' && <MagnifyingGlassIcon className='magnifying-glass-icon' />}
        <input type="text" className="input-search-follows"
          placeholder={displayIcon ? '    Search' : 'Search'}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onHandleChange}
          value={filterToEdit.fullname}
        />
        {searchTxt !== '' && <RemoveSearchIcon className='remove-search' onClick={onClearSearch} />}
      </section>
      <section className="follows-modal-body">
        <ul className='follows-ul-modal'>
          {filteredUsers.map((item, idx) => {
            return <li key={idx} className='follows-list'>
              <section className="avatar-and-user-name">
                <ImageAvatars img={item.imgUrl} />
                <section className="followers">
                  <p className='follow-list-user-name'>{item.username}</p>
                  <p className='follow-list-full-name'>{item.fullname}</p>
                </section>
              </section>
              <button className='remove-follow-btn'>Remove</button>
            </li>
          })}
        </ul>
      </section>
    </section>
  )
}