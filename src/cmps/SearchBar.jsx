import { useState } from 'react'

export function SearchBar() {

    const [inputValue, setInputValue] = useState();

    function onSearch({target}){
        const {value} = target
        setInputValue(value)
    }

    function handleSearchBarClick(ev) {
        ev.stopPropagation()
    }
    
    return (
        <section className="search-bar-container" onClick={handleSearchBarClick}>
            <span className='search-span'>Search</span>
            <section className="search-box">
                <input className='search-input' placeholder="Search" type="text" value={inputValue} onChange={onSearch}></input>
            </section>
        </section>
    )
}
