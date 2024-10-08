import { storageService } from './async-storage.service'

const STORAGE_KEY = 'feeditem'

export const feeditemService = {
    getFeedItems,
    query,
    getById,
    save,
    remove,
    create,
}

window.cs = feeditemService

async function getFeedItems() {
    try {
        const results = await storageService.query(STORAGE_KEY)
        if (!results || !results.length) {
          const mockFeedItems = await _createMockFeeditems();
          return mockFeedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt
        }
        
        return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch {
        console.log("faild mock users")
    }
    
    // return httpService.get(`user`)
}

async function query(filterBy = { txt: '' }) {
    try {
        const results = await storageService.query(STORAGE_KEY)
        //todo: do the filter here - before saveing to store filter post.userId is in connectedUser.followingIds
        return results
    } catch {
        console.log("faild query feed items")
    }
    
    // return httpService.get(STORAGE_KEY, filterBy)
}

async function getById(feeditemId) {
    try {
        const feeditem = await storageService.get(STORAGE_KEY, feeditemId)
        return feeditem
        // return httpService.get(`feeditem/${feeditemId}`)
    } catch {
        console.log("faild getById feed item")
    }
}

async function remove(feeditemId) {
    try {
        return storageService.remove(STORAGE_KEY, feeditemId)
        // return httpService.delete(`feeditem/${feeditemId}`)
    } catch {
        console.log("faild remove feed item")
    }
}

async function create(feeditem) {
    var savedFeeditem
   
    try {
        savedFeeditem = await storageService.post(STORAGE_KEY, feeditem)
        // savedFeeditem = await httpService.post(STORAGE_KEY, feeditem)
        return savedFeeditem
    } catch {
        console.log("faild save feed item")
    }
}

async function save(feeditem) {
    var savedFeeditem
   
    try {
        // if (feeditem._id) {
        //     savedFeeditem = await storageService.put(STORAGE_KEY, feeditem)
        //     // savedFeeditem = await httpService.put(`feeditem/${feeditem._id}`, feeditem)
        // } 
        // else {
        //     savedFeeditem = await storageService.post(STORAGE_KEY, feeditem)
        //     // savedFeeditem = await httpService.post(STORAGE_KEY, feeditem)
        // }
        savedFeeditem = await storageService.post(STORAGE_KEY, feeditem)
        return savedFeeditem
    } catch {
        console.log("faild save feed item")
    }
}

async function _createMockFeeditems() {
    const mockUsers = [
        {
          fullname: "newTest",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1727287997/orynyuzism6ogoclldks.png",
          password: "fhgj",
          username: "newTest",
          _id: "mwut3",
        },
        {
          fullname: "DemoUser",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/8-Fun-Facts-About-Your-Dog-s-Ears_i3fnw8.png",
          password: "hv",
          username: "DemoUser",
          _id: "OWyfg",
        },
        {
          fullname: "testUser1",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/8-Fun-Facts-About-Your-Dog-s-Ears_i3fnw8",
          password: "password1",
          username: "testuser1",
          _id: "uid001",
        },
        {
          fullname: "testUser2",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1727288022/8-Fun-Facts-About-Your-Dog-s-Ears_i3fnw8.png",
          password: "password2",
          username: "testuser2",
          _id: "uid002",
        },
        {
          fullname: "mockUser3",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1727288022/8-Fun-Facts-About-Your-Dog-s-Ears_i3fnw8",
          password: "mock123",
          username: "mockuser3",
          _id: "uid005",
        },
        {
          fullname: "mockUser4",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1727288022/jawucsl5tovifnvr6599.png",
          password: "mock456",
          username: "mockuser4",
          _id: "uid006",
        },
        {
          fullname: "randomUser5",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1727288022/jawucsl5tovifnvr6599.png",
          password: "randompass5",
          username: "randomuser5",
          _id: "uid007",
        },
        {
          fullname: "randomUser6",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1727288022/jawucsl5tovifnvr6599.png",
          password: "randompass6",
          username: "randomuser6",
          _id: "uid008",
        },
        {
          fullname: "user7",
          imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1727288022/jawucsl5tovifnvr6599.png",
          password: "pass7",
          username: "user7",
          _id: "uid009",
        },
      ];

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    const getRandomTags = () => {
        const tags = ['nature', 'tech', 'fashion', 'travel', 'food', 'art', 'music'];
        const randomTagCount = getRandomInt(1, 4); 
        return Array.from({ length: randomTagCount }, () => tags[getRandomInt(0, tags.length)]);
      };
      
      const getRandomComments = () => {
        const commentsCount = getRandomInt(1, 10); 
        const commentTemplates = [
            "I love this! Such an amazing shot. I’ve never seen something like this before!",
            "This picture is absolutely stunning! The colors and composition are on point.",
            "Wow, what a fantastic capture! I can feel the emotion through this image.",
            "This is beautiful! It makes me want to travel and explore more.",
            "The vibe of this picture is incredible. You've truly captured something special.",
            "Such a creative and unique perspective. Keep sharing more!",
            "This is so inspiring! Definitely adding this to my list of favorite posts.",
            "I can’t stop looking at this. Everything about this photo is perfect!",
            "This shot is pure art. You have an amazing eye for detail!",
            "I absolutely adore this! Thanks for sharing such a beautiful moment."
        ];
    
        return Array.from({ length: commentsCount }, () => {
            const randomUser = mockUsers[getRandomInt(0, mockUsers.length)];
            const randomComment = commentTemplates[getRandomInt(0, commentTemplates.length)];
            return {
                userId: randomUser._id,
                comment: randomComment,
            };
        });
    };

    const getImagesForFeed = (index) => {
      if (index < 5) {
          return [
              `https://res.cloudinary.com/dz9gxtvp9/image/upload/${imgsPublicIds[Math.floor(Math.random() * imgsPublicIds.length)]}`,
              `https://res.cloudinary.com/dz9gxtvp9/image/upload/${imgsPublicIds[Math.floor(Math.random() * imgsPublicIds.length)]}`,
              `https://res.cloudinary.com/dz9gxtvp9/image/upload/${imgsPublicIds[Math.floor(Math.random() * imgsPublicIds.length)]}`
          ];
      } else {
          return [`https://res.cloudinary.com/dz9gxtvp9/image/upload/${imgsPublicIds[Math.floor(Math.random() * imgsPublicIds.length)]}`];
      }
    };

    const getRandomCaption = (user, index) => {
      const captions = [
          `Just enjoying a peaceful morning with my coffee and some good vibes ☕ #morningroutine #coffee`,
          `Had the best time exploring new recipes today! 🍽️ #FoodieLife #CookingAdventures`,
          `Nature at its finest 🌿 Couldn't resist taking a snap of this beautiful scenery. #NatureLovers`,
          `A little bit of spice and everything nice 🌶️🍜 #SpicyLife #FoodGoals`,
          `Sunset and seafood - what more can I ask for? 🌅🍤 #BeachLife #SeafoodLovers`
      ];
      return captions[index % captions.length];
    };

    const imgsPublicIds = [
      "samples/dessert-on-a-plate", 
      "cld-sample-5", 
      "cld-sample-4", 
      "samples/coffee", 
      "samples/breakfast",
      "samples/food/spices", 
      "samples/food/fish-vegetables", 
      "samples/food/dessert", 
      "samples/food/pot-mussels",
      "samples/people/kitchen-bar",
      "pexels-ella-olsson-572949-1640777_lsaat3.jpg",
      "pexels-ash-craig-122861-376464_ejvtyw.jpg",
      "pexels-robinstickel-70497_ccgxil.jpg",
      "pexels-ella-olsson-572949-1640772_wsw4xp.jpg",
      "pexels-fotios-photos-1279330_xrxqxr.jpg",
      "pexels-janetrangdoan-1099680_egivoy.jpg",
      "pexels-chanwalrus-958545_bmn70n.jpg",
      "pexels-valeriya-1199957_axxgug.jpg",
      "pexels-valeriya-842571_hjugfj.jpg",
      "pexels-ella-olsson-572949-1640774_rmiwoc.jpg",
      "pexels-xmtnguyen-699953_fa5qql.jpg",
      "pexels-janetrangdoan-1128678_emew35.jpg",
      "pexels-julieaagaard-2097090_daknfj.jpg",
      "pexels-lum3n-44775-1410235_dg0uyh.jpg",
      "pexels-dana-tentis-118658-262959_l2ag0d.jpg",
      "pexels-willpicturethis-2641886_wsgqxp.jpg",
      "pexels-chevanon-323682_myqayc.jpg",
      "pexels-janetrangdoan-1092730_vv2t5r.jpg",
    ];

    const getRandomImageUrl = () => {
      const randomIndex = Math.floor(Math.random() * imgsPublicIds.length);
      return `https://res.cloudinary.com/dz9gxtvp9/image/upload/${imgsPublicIds[randomIndex]}`;
    };

    const feedItemsResults = []
    const mockFeedItems = mockUsers.flatMap((user, userIndex) => {
      return Array.from({ length: 5 }, (_, index) => ({
          _id: `feed_${user._id}_${index}`,
          userId: user._id,
          imageUrl: getImagesForFeed(index), 
          caption: getRandomCaption(user, index), 
          tags: getRandomTags(),
          comments: getRandomComments(),
          likesCount: getRandomInt(10, 100),
          createdAt: new Date().toISOString(),
      }));
  });

    for (const item of mockFeedItems) {
        try {
            const newFeedItem = await feeditemService.create(item);
            feedItemsResults.push(newFeedItem)
            continue;
        } catch (error) {
            console.error('Error creating feeditem:', error);
            return Promise.reject(error)
        }
    }

    return  Promise.resolve(feedItemsResults)
  }






