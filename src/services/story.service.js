
import { httpService } from './http.service'
import { utilService } from './util.service'


const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    addStoryMsg
}
window.cs = storyService


async function query(filterBy = { txt: '', price: 0 }) {
    //todo: do the filter here - before saveing to store filter post.userId is in connectedUser.followingIds
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedstory
    if (story._id) {
        savedstory = await httpService.put(`story/${story._id}`, story)

    } else {
        savedstory = await httpService.post('story', story)
    }
    return savedstory
}

async function addStoryMsg(storyId, txt) {
    const savedMsg = await httpService.post(`story/${storyId}/msg`, {txt})
    return savedMsg
}


function getEmptyStory() {
    return {
        vendor: 'Susita-' + utilService.makeId(),
        price: utilService.getRandomIntInclusive(1000, 9000),
        msgs: []
    }
}





