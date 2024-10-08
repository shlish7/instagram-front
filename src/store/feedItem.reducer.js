
import { feeditemService } from '../services/feedItem.service.js'
export const SET_FEED_ITEM = 'SET_FEED_ITEM'
export const REMOVE_FEED_ITEM = 'REMOVE_FEED_ITEM'
export const SET_FEED_ITEMS = 'SET_FEED_ITEMS'
export const ADD_FEED_ITEM = 'ADD_FEED_ITEM'
export const ADD_FEED_ITEM_MSG = 'ADD_FEED_ITEM_MSG'

const initialState = {
    count: 10,
    // feedItem: feedItemService.getLoggedinfeedItem(),
    feedItems: [],
    watchedfeedItem : null
}

export function feedItemReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        
        case SET_FEED_ITEM:
            newState = { ...state, feedItem: action.feedItem }
            break
        
        case REMOVE_FEED_ITEM:
            newState = {
                ...state,
                feedItems: state.feedItems.filter(feedItem => feedItem._id !== action.feedItemId)
            }
            break
       
        case SET_FEED_ITEMS:
            newState = { ...state, feedItems: action.feedItems }
            break
        
        case ADD_FEED_ITEM:
            newState = {
                ...state,
                feedItems: [...state.feedItems, action.feedItem]
            }
            break

        // case ADD_FEED_ITEM_MSG:
        //     newState = {
        //         ...state,
        //         feedItems: [...state.feedItems, action.feedItem]
        //     }
        //         break        

        default:
    }
    
    // For debug:
    // window.feedItemState = newState
    // console.log('State:', newState)
    return newState

}
