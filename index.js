const express = require("express")
const fs = require('fs')
const path = require('path')
const app = express();
const VideoModel = require('./models/VideoModel.js')
const mongoose = require('mongoose')
const cors = require("cors")
require("dotenv").config({ path: "./config.env" })
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.use(express.static('client/build/'))
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('./models/AccountModel.js')
const multer = require('multer')
const uploadAvatar = multer({dest: 'uploads/avatars'})
const FileType = require('file-type');
const getToken = BearerToken => {
 return BearerToken.length > 0 ? BearerToken.slice(7) : false
}


const videoOrPreviewStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    const setFile = (path) => { 
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }
      cb(null, path)
    }
    if (file.mimetype.includes('image')) {
      setFile('uploads/previews')
    }
    if (file.mimetype.includes('video')) {
     setFile('uploads/videos')
    }
  },
})
const uploadVideoOrPreview = multer({storage: videoOrPreviewStorage})

const deleteUploadedFile = (fileName, folder) => {
  fs.unlink(path.join(__dirname, folder, fileName), err => console.log(err))
}


const sendAccounts = (currentUserName, docs, token) => {
  const currentUserDoc = docs.find(doc => doc.name === currentUserName)
  const subscribtions = currentUserDoc.subscribtions.map(subscribtion => {
    return subscribtion.toString()
  })
  const formattedDocs = docs.map(doc => {
    const { name, avatar, description, _id: id } = doc
    if (name === currentUserName) {
      if (token) {
        return { name, avatar, description, id, self: true, subscribed: false, token }
      }
      return { name, avatar, description, id, self: true, subscribed: false }
    }
    if (subscribtions.includes(id.toString())) {
      return { name, avatar, description, id, self: false, subscribed: true }
    }
    return { name, avatar, description, id, self: false, subscribed: false }
  })
  return formattedDocs
}

app.get('/avatar/:id', (req, res) => {
  const { id } = req.params
  const file = fs.createReadStream(path.join(__dirname, 'uploads/avatars', id), err => console.log(err))
  file.pipe(res)
})

app.get('/preview/:id', (req, res) => {
  const { id } = req.params
  const file = fs.createReadStream(path.join(__dirname, 'uploads/previews', id), err => console.log(err))
  file.pipe(res)
})



app.get('/is-login-unique/:name', async (req, res) => {
  const { name } = req.params
  const isThereAnyDocument = await UserModel.findOne({name})
  res.send(!isThereAnyDocument)
})


app.get('/accounts', (req, res) => {
  const BearerToken = req.headers.authorization
  const token = getToken(BearerToken)
  let accountInfo
  if (token) {
    accountInfo = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
  }
  UserModel.find().then(docs => {
        if (token) {
          res.send(sendAccounts(accountInfo.name, docs)) 
          return
        }
        res.send(docs.map(doc => {
          const { name, description, avatar, _id: id } = doc
          return { name, avatar, description, id, self: false, subscribed: false }
        })) 
  }).catch(e => console.log(e))
})

app.post('/create-account', uploadAvatar.fields([{ name: 'avatar', maxCount: 1}]), async (req, res) => {
  const { login: name, password, description } = req.body
  if (name.length > 25 || name.length < 4) {
    res.status(405).send('name is to long or short')
    if (req.files.avatar) {
      deleteUploadedFile(req.files.avatar[0].filename, 'uploads/avatars')
    }
    return
  }
  if (password.length > 25 || password.length < 4) {
    res.status(405).send('password is to long or short')
    if (req.files.avatar) {
      deleteUploadedFile(req.files.avatar[0].filename, 'uploads/avatars')
    }
    return
  }   
  const isThereAnyDocument = await UserModel.findOne({name})
  if (isThereAnyDocument) {
    res.status(400).json({error: `${name} is already taken`})
    return
  }
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = UserModel({name, password: hashedPassword, description: description ? description : null, avatar: req.files.avatar ?  req.files.avatar[0].filename : null})
  user.save().then(() => {
    const token = jwt.sign({name, password}, process.env.JWT_PRIVATE_KEY)
    UserModel.find().then(docs => {
      res.send(sendAccounts(name, docs, token))
    })
    
  })
})

app.post('/login-user', (req, res) => {
  const { login: name, password } = req.body
  UserModel.findOne({name: name}).then(doc => {
    const {name, password: hashedPassword} = doc
    if (bcrypt.compareSync(password, hashedPassword)) {
      const token = jwt.sign({name, password}, process.env.JWT_PRIVATE_KEY)
      UserModel.find().then(docs => {
        res.send(sendAccounts(name, docs, token))
      })
      return
    }
    res.status(405).send('Wrong password or login')
  }).catch(error => {
    console.log(error)
    res.status(405).send('Wrong password or login')
  }) 
})


app.post('/add-video', uploadVideoOrPreview.fields([{name: 'preview', maxCount: 1}, {name: 'video', maxCount: 1}]), (req, res) => {
  if (!req.files.video) {
    res.status(404).send("Video wasn't sent")
    if (req.files.preview) {
      deleteUploadedFile(req.files.preview[0].filename, 'uploads/previews')
    }
    return
  }
  if (req.files.video[0].mimetype !== 'video/mp4') {
    deleteUploadedFile(req.files.video[0].filename, 'uploads/videos')
    res.status(406).send(`${req.files.video[0].mimetype} mimetype is not supported`)
    if (req.files.preview) {
      deleteUploadedFile(req.files.preview[0].filename, 'uploads/previews')
    }
    return
  }
  const BearerToken = req.headers.authorization
  const token = getToken(BearerToken)
  if (!token) {
    if (req.files.preview) {
      deleteUploadedFile(req.files.preview[0].filename, 'uploads/previews')
    }
    deleteUploadedFile(req.files.video[0].filename, 'uploads/videos')
    res.status(401).send('User is not authorized')
  }
  const accountInfo = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

  UserModel.findOne({name: accountInfo.name}).then(accountDoc => {
    const { title, description } = req.body
    const videoDoc = VideoModel({title,
                                 description: description ? description : null, 
                                 author: accountDoc._id, 
                                 source: req.files.video[0].filename, 
                                 preview: req.files.preview ? req.files.preview[0].filename : null
                                })
    videoDoc.save().then(() => {
      const { _id: id, title, description, author, source, preview, likes, dislikes, liked, disliked } = videoDoc
      res.send({ id, title, description, author, source, preview, likes, dislikes, liked, disliked })
    })
    
  }).catch(() => {
    res.status(401).send('User is not authorized')
  })
})


app.get('/videos', (req, res) => {
  const BearerToken = req.headers.authorization
  const token = getToken(BearerToken)
  let accountInfo
  if (token) {
    accountInfo = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
  }
  VideoModel.find().then(docs => {
        if (token) {
            const handledDocs = docs.map(doc => {
              const { _id: id,
                title,
                description,
                likes,
                dislikes,
                author,
                source,
                preview,
                comments,
                votedBy } = doc
                let liked = false, disliked = false
                const votedByUser = votedBy.find(vote => vote.voter === accountInfo.name)
                if (votedByUser) {
                  liked = votedByUser.liked
                  disliked = votedByUser.disliked
                }
                const handledComments = comments.map(comment => {
                  const { text, author, likes,  dislikes, votedBy } = comment
                  const self = comment.author === accountInfo.name
                  let liked = false, disliked = false
                  const votedByUser = votedBy.find(vote => vote.voter === accountInfo.name)
                  if (votedByUser) {
                    liked = votedByUser.liked
                    disliked = votedByUser.disliked
                  }
                  return { text, author, likes, dislikes, self, liked, disliked }
                })

                return { id, title, description, likes, dislikes, author, source, preview, liked, disliked, comments: handledComments }
            })
            res.send(handledDocs)
          return
        }
        res.send(docs.map(doc => {
          const { _id: id,
            title,
            description,
            likes,
            dislikes,
            author,
            source,
            preview,
            comments } = doc
            const handledComments = comments.map(comment => {
              const { text, author, likes,  dislikes } = comment
              return { text, author, likes, dislikes, self: false }
            })

            return { id, title, description, likes, dislikes, author, source, preview, comments: handledComments }
        })) 
  }).catch(e => console.log(e))
})


app.get('/videofile/:id', async (req, res) => {
  const { id } = req.params
  const range = req.headers.range
  if (!range) {
    res.status(400).send("Requires Range header")
  }
  const videoPath = `uploads/videos/${id}`
  const videoSize = fs.statSync(videoPath).size

  const fileType = await FileType.fromFile(videoPath)

  const CHUNK_SIZE = (10 ** 7) 
  const start = Number(range.replace(/\D/g, ""))
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": fileType.mime
  }
  res.writeHead(206, headers)
  const videoStream = fs.createReadStream(videoPath, { start, end })
  videoStream.pipe(res)
})
  

app.post('/vote-video/:videoId', async (req, res) => {
  const token = getToken(req.headers.authorization)
  if (!token) {
    res.status(401).send('User is not authorized')
  }
  const accountInfo = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
  const { videoId } = req.params
  const { liked, disliked, likePressed, dislikePressed } = req.body
  if (likePressed && dislikePressed) {
    res.status(405).send('Video cannot be liked and disliked at the same time')
    return
  }
  const videoDoc = await VideoModel.findById(videoId)
  if (!videoDoc) {
    res.status(410).send('Video is deleted')
    return
  }
  const voteDoc = videoDoc.votedBy.find(doc => doc.voter === accountInfo.name)
  if (voteDoc) {
    const index = videoDoc.votedBy.findIndex(doc => doc.voter === accountInfo.name)
    if (likePressed) {
      if (disliked) {
        videoDoc.dislikes--
      }
      videoDoc.likes++
    }
    if (dislikePressed) {
      if (liked) {
        videoDoc.likes--
      }
      videoDoc.dislikes++
    }
    if (!likePressed && !dislikePressed) {
      if (liked) {
        videoDoc.likes--
      }
      if (disliked) {
        videoDoc.dislikes--
      }
    }
    videoDoc.votedBy[index] = {
      voter: accountInfo.name,
      liked: likePressed,
      disliked: dislikePressed
    }
    videoDoc.save().then(() => {
      res.send('Success')
    })
  } else {
    if (likePressed) {
      videoDoc.likes++
    }
    if (dislikePressed) {
      videoDoc.dislikes++
    }
    videoDoc.votedBy.push({
      voter: accountInfo.name,
      liked: likePressed,
      disliked: dislikePressed
    })
    videoDoc.save().then(() => {
      res.send('Success')
    })
  }
})


app.post('/add-comment/:videoId', (req, res) => {
  const token = getToken(req.headers.authorization)
  if (!token) {
    res.status(401).send('User is not authorized')
  }
  const userInfo = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
  const { videoId } = req.params
  const { text } = req.body
  if (!text || text.trim() === '') {
    res.status(405).send('No text sent')
  }
  VideoModel.findById(videoId).then(doc => {
    const comment = {
      text,
      likes: 0,
      dislikes: 0,
      author: userInfo.name,
      votedBy: []
    }
    doc.comments.push(comment)
    doc.save().then(() => {
      delete comment.votedBy
      res.send({...comment, self: true, liked: false, disliked: false})
    })
  })
})


app.delete('/comment', (req, res) => {
  const token = getToken(req.headers.authorization)
  if (!token) {
    res.status(401).send('User is not authorized')
    return
  }
  const userInfo = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
  const { videoId, commentIndex } = req.body
  VideoModel.findById(videoId).then(doc => {
    const comment = doc.comments[commentIndex]
    if (!comment) {
      res.status(404).send('Comment not found')
      return
    }
    if (comment.author !== userInfo.name) {
      res.status(405).send("You're not the owner of the comment")
      return
    }
    doc.comments.splice(commentIndex, 1)
    doc.save().then(() => {
      res.send('Success')
    })
  }).catch(() => {
    res.status(410).send('Video is deleted')
    return
  }) 
})


app.post('/vote-comment/:videoId/:commentIndex', async (req, res) => {
  const token = getToken(req.headers.authorization)
  if (!token) {
    res.status(401).send('User is not authorized')
  }
  const accountInfo = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
  const { videoId, commentIndex } = req.params
  const { liked, disliked, likePressed, dislikePressed } = req.body
  if (likePressed && dislikePressed) {
    res.status(405).send('Video cannot be liked and disliked at the same time')
    return
  }
  const videoDoc = await VideoModel.findById(videoId)
  if (!videoDoc) {
    res.status(410).send('Video is deleted')
    return
  }
  const videoComments = [...videoDoc.comments]
  const comment = videoComments[commentIndex]
  if (!comment) {
    res.status(410).send('Comment is deleted')
    return
  }
  const voteDoc = comment.votedBy.find(doc => doc.voter === accountInfo.name)
  if (voteDoc) {
    const index = comment.votedBy.findIndex(doc => doc.voter === accountInfo.name)
    if (likePressed) {
      if (disliked) {
        comment.dislikes--
      }
      comment.likes++
    }
    if (dislikePressed) {
      if (liked) {
        comment.likes--
      }
      comment.dislikes++
    }
    if (!likePressed && !dislikePressed) {
      if (liked) {
        comment.likes--
      }
      if (disliked) {
        comment.dislikes--
      }
    }
    comment.votedBy[index] = {
      voter: accountInfo.name,
      liked: likePressed,
      disliked: dislikePressed
    }
    videoDoc.comments = videoComments
    videoDoc.markModified('comments')
    videoDoc.save().then(() => {
      res.send('Success')
    })
  } else {
    if (likePressed) {
      comment.likes++
    }
    if (dislikePressed) {
      comment.dislikes++
    }
    comment.votedBy.push({
      voter: accountInfo.name,
      liked: likePressed,
      disliked: dislikePressed
    })
    videoDoc.comments = videoComments
    videoDoc.markModified('comments')
    videoDoc.save().then(() => {
      res.send('Success')
    })
  }
})


app.post('/subscribe', (req, res) => {
  const token = getToken(req.headers.authorization)
  if (!token) {
    res.status(401).send('User is not authorized')
  }
  const { currentUserId, subscribtionAccountId } = req.body
  UserModel.findById(currentUserId).then(doc => {
    let userSubscribed
    doc.subscribtions.forEach((id) => {
      if (userSubscribed) return
      if (id.toString() === subscribtionAccountId) {
        userSubscribed = true
      }
    })
    if (userSubscribed) {
      res.status(405).send('User is alredy subscribed')
    }
    doc.subscribtions.push(subscribtionAccountId)
    doc.markModified('subscribtions')
    doc.save().then(() => res.send('Success'))
  }).catch(e => {
    console.log(e)
    res.status(410).send('Account is deleted')
  })
})

app.post('/unsubscribe', (req, res) => {
  const token = getToken(req.headers.authorization)
  if (!token) {
    res.status(401).send('User is not authorized')
  }
  const { currentUserId, subscribtionAccountId } = req.body
  UserModel.findById(currentUserId).then(doc => {
    const subscribtions = [...doc.subscribtions]
    const index = subscribtions.indexOf(subscribtionAccountId)
    if (!index) {
      res.status(405).send('User is not subscribed')
    }
    subscribtions.splice(index, 1)
    doc.subscribtions = subscribtions
    doc.save().then(() => res.send('Success'))
  }).catch(() => {
    res.status(410).send('Account is deleted')
  })
})

app.delete('/account/:id', (req, res) => {
  const token = getToken(req.headers.authorization)
  if (!token) {
    res.status(401).send('User is not authorized')
    return
  }
  const { id } = req.params
  if (!id) {
    res.status(400).send('No id provided')
    return
  }
  UserModel.findById(id).then(async doc => {
    if (doc.avatar) {
      deleteUploadedFile(doc.avatar, 'uploads/avatars')
    }
    const userVideos = await VideoModel.find({author: id})
    if (userVideos.length > 0) {
      userVideos.forEach(async video => {
        await VideoModel.findByIdAndDelete(video.id)
        if (video.preview) {
          deleteUploadedFile(video.preview, 'uploads/previews')
        }
        deleteUploadedFile(video.source, 'uploads/videos')
      })
    }
    await UserModel.findByIdAndDelete(id)
    res.send('Success')

  })
    
})

app.delete('/video/:id', (req, res) => {
  const token = getToken(req.headers.authorization)
  if (!token) {
    res.status(401).send('User is not authorized')
    return
  }
  const { id } = req.params
  if (!id) {
    res.status(400).send('No id provided')
    return
  }
  VideoModel.findById(id).then(async doc => {
    if (doc.preview) {
      deleteUploadedFile(doc.preview, 'uploads/previews')
    }
    deleteUploadedFile(doc.source, 'uploads/videos')
    await VideoModel.findByIdAndDelete(id)
    res.send('Success')

  })
    
})

app.get('*', (req, res) => {
  const htmlPath = path.join(__dirname, 'client/build/index.html')
  res.sendFile(htmlPath)
})

app.listen(port, () => {
  mongoose.connect(process.env.ATLAS_URI, { useUnifiedTopology: true, useNewUrlParser: true }).catch(err => console.log(err));
  console.log(`Server is running on port: ${port}`);
})
