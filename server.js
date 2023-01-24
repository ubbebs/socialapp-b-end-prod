import express from 'express'
import { auth, db } from './firebase.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT ?? 8383

const ref = db.ref();

app.use(cors())

app.use(express.json())

app.post('/createuser', (req, res) => {
    time = "0"
    const { email, password } = req.body
    auth
        .createUser({
            email,
            password}
        )
        .then(() => {
            res.send(true)
        })
        .catch(() => {
            res.status(409).send()
        });
});

app.get('/getMyFBData', (req, res) => {
    const { uid } = req.query
    auth
        .getUser(uid)
        .then((userRecord) => {
            res.send(userRecord.toJSON())
        })
        .catch((error) => {
            console.log('Error fetching user data:', error)
        });
});

app.get('/getFollowers', (req, res) => {
    const { uid } = req.query
    const followers = db.ref(`follows/${uid}/followers/`)
    followers.once('value', (snapshot) => {
        res.send(snapshot.val())
    })
});

app.get('/getFollowing', (req, res) => {
    const { uid } = req.query
    const following = db.ref(`follows/${uid}/following/`)
    following.once('value', (snapshot) => {
        res.send(snapshot.val())
    })
});

app.get('/getPosts', (req, res) => {
    const { uid } = req.query
    const posts = db.ref(`posts/${uid}`)
    posts.once('value', (snapshot) => {
        res.send(snapshot.val())
    })
})

app.get('/getPost', (req, res) => {
    const { authorid, key } = req.query
    const post = db.ref(`posts/${authorid}/${key}`)
    post.once('value', (snapshot) => {
        res.send(snapshot.val())
    })
})

app.get('/getComments', (req, res) => {
    const { authorid, key } = req.query
    const comments = db.ref(`comments/${authorid}/${key}`)
    comments.once('value', (snapshot) => {
        res.send(snapshot.val())
    })
})

app.get('/getSearchUser', (req, res) => {
    const { search } = req.query
    const users = db.ref(`personalInfo`)
    users.once('value', (snapshot) => {
        const snapVal = snapshot.val()
        const result = Object.values(snapVal).filter((user) => user.accountName.includes(search))
        res.send(result)
    })
})

app.get('/getUserData', (req, res) => {
    const { uid } = req.query
    const userdata = db.ref(`personalInfo/${uid}`)
    userdata.once('value', (snapshot) => {
        res.send(snapshot.val())
    })
})

app.get('/getPersonalInfo', (req, res) => {
    const { uid } = req.query
    const personalInfo = db.ref(`personalInfo/${uid}`)
    personalInfo.once('value', (snapshot) => {
        res.send(snapshot.val())
    })
})

app.get('/getFollowingPosts', (req, res) => {
    const { uid } = req.query
    let result = []
    let counter = 0
    const following = db.ref(`follows/${uid}/following`)
    following.once('value', (snapshot) => {
        if (snapshot.val()) {
            const followingProfiles = Object.keys(snapshot.val()).map((elem) => elem)
            followingProfiles.forEach((elem) => {
                const followerPosts = db.ref(`posts/${elem}`)
                followerPosts.once('value', (snapshot) => {
                    if (snapshot.val()) {
                        Object.values(snapshot.val()).map((elem) => result.push(elem))
                    }
                    counter += 1
                }).then(() => {
                    if (counter === followingProfiles.length) {
                        counter = 0
                        result.sort((a,b) => {
                            return b.timestamp - a.timestamp
                        })
                        res.send(result)
                    }
                })
            })
        } else {
            res.send(null)
        }      
    })
})

app.get('/getAllUsers', (req, res) => {
    const allprofiles = db.ref(`personalInfo`)
    allprofiles.once('value', (snapshot) => {
        res.send(snapshot.val())
    })
})

app.post('/setPersonalInfo', (req, res) => {
    const { accountName, displayName, description, timestamp, uid } = req.body
    const setPersonalInfo = ref.child(`personalInfo/${uid}`);
    setPersonalInfo.set({
        accountName,
        description,
        displayName,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${process.env.PROJECT_ID}.appspot.com/o/avatar%2F${uid}_${timestamp}?alt=media`,
        uid,
    })
    res.send()
});

app.post('/updateAvatar', (req, res) => {
    const { timestamp, uid } = req.body
    const updateAvatar = ref.child(`personalInfo/${uid}`);
    updateAvatar.update({
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${process.env.PROJECT_ID}.appspot.com/o/avatar%2F${uid}_${timestamp}?alt=media`,
    })
    res.send()
});

app.post('/updateDisplayName', (req, res) => {
    const { displayName, uid } = req.body
    const updateDisplayName = ref.child(`personalInfo/${uid}`);
    updateDisplayName.update({
        displayName,
    })
    res.send()
});

app.post('/updateDescription', (req, res) => {
    const { description, uid } = req.body
    const updateDescription = ref.child(`personalInfo/${uid}`);
    updateDescription.update({
        description,
    })
    res.send()
});

app.post('/addPost', (req, res) => {
    const { description, userid, time } = req.body
    const url = `https://firebasestorage.googleapis.com/v0/b/${process.env.PROJECT_ID}.appspot.com/o/posts%2F${userid}%2F${time}?alt=media`
    const addPost = ref.child(`posts/${userid}/${time}`);
    addPost.set({
        description: description,
        imageURL: url,
        timestamp: time,
        authorid: userid,
    })
    res.send()
});

app.post('/addFollow', (req, res) => {
    const { userid, myid } = req.body
    const followers = ref.child(`follows/${userid}/followers/${myid}`);
    const following = ref.child(`follows/${myid}/following/${userid}`);
    followers.set({
        follower_id: myid
    })
    following.set({
        following_id: userid
    })
    res.send()
});

app.post('/removeFollow', (req, res) => {
    const { userid, myid } = req.body
    const followers = ref.child(`follows/${userid}/followers/${myid}`);
    const following = ref.child(`follows/${myid}/following/${userid}`);
    followers.set(null)
    following.set(null)
    res.send()
});

app.post('/removePost', (req, res) => {
    const { userid, time } = req.body
    const removePost = ref.child(`posts/${userid}/${time}`)
    removePost.set(null)
    res.send()
});

app.post('/addComment', (req, res) => {
    const { authorid, postid, comment, userid, time } = req.body
    const commentPost = ref.child(`comments/${authorid}/${postid}/${time}`);
    commentPost.set({
        comment: comment,
        timestamp: time,
        authorid: userid,
    })
    res.send()
});

app.listen(port, () => console.log(`Server has started on port: ${port}`))
