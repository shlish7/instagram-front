import { useEffect, useState } from 'react'
import MagnifyingGlassIcon from '../assets/svg/magnifying-glass.svg?react';
import RemoveSearchIcon from '../assets/svg/remove-search-icon.svg?react';
import { useSelector } from 'react-redux';
import { loadUsers } from '../store/user.actions';
import ImageAvatars from './ImageAvatars';
import { userService } from '../services/user.service.remote';


export function SearchBar() {

    const [displayIcon, setDisplayIcon] = useState(true)
    const [searchTxt, setSearchTxt] = useState('')
    const users = useSelector(storeState => storeState.userModule.users)
    const [ filterToEdit, setFilterToEdit ] = useState(userService.getDefaultFilter())
    const [filteredUsers, setFilteredUsers] = useState(users)

    useEffect(() => {
        const { username, fullname } = filterToEdit

        const newFilteredUsers = users.filter(user => {
            const usernameMatch = user.username.toLowerCase().includes(username.toLowerCase())
            const fullnameMatch = user.fullname.toLowerCase().includes(fullname.toLowerCase())
            return usernameMatch || fullnameMatch;
        })

        setFilteredUsers(newFilteredUsers);
    }, [filterToEdit]);

    function handleSearchBarClick(ev) {
        ev.stopPropagation()
    }

    function onHandleChange({target}) {

        const value = target.value
        setFilterToEdit({ ...filterToEdit, username: value, fullname: value })

    }

    function onClearSearch() {
        setFilterToEdit({ ...filterToEdit, username: '' , fullname: ''})
    }

    function onFocus() {
        setDisplayIcon(prev => !prev)
    }
    function onBlur() {
        setDisplayIcon(prev => !prev)
    }

    function onClearSearch(ev) {
        setSearchTxt('')
    }

    return (
        <section className="search-bar-container" onClick={handleSearchBarClick}>
            <span className='search-span'>Search</span>
            {/* <section className="search-box"> */}
            {/* <input className='search-input' placeholder="Search" type="text" value={inputValue} onChange={onSearch}></input> */}
            <section className="search-bar-section">
                {displayIcon && searchTxt === '' && <MagnifyingGlassIcon className='magnifying-glass-icon' />}
                <input type="text" className="input-search-follows"
                    placeholder={displayIcon ? '    Search' : 'Search'}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onHandleChange}
                    value={filterToEdit.fullname}
                />
                {searchTxt !== '' && <RemoveSearchIcon className='remove-search' onClick={onClearSearch} />}
                {/* </section> */}
            </section>
            <section className="search-bar-users-list">
                <ul className='search-bar-users-ul'>
                    {filteredUsers.map((item, idx) => {
                        return <li key={idx} className='search-bar-users-li'>
                            <section className="avatar-and-user-name">
                                <ImageAvatars img={item.imgUrl} />
                                <section className="search-bar-user-details">
                                    <p className='search-bar-user-name'>{item.username}</p>
                                    <p className='search-bar-full-name'>{item.fullname}</p>
                                </section>
                            </section>
                        </li>
                    })}
                </ul>
            </section>
        </section>
    )
}
