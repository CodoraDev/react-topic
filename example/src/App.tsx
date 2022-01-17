import React, { useEffect } from 'react'

import { Topic, useTopic } from 'react-codora-topic'
import 'react-codora-topic/dist/index.css'
const faker = require('@faker-js/faker')

type User = {
  id: string
  name: string
  email: string
}

type Post = {
  id: string
  post: string
}

const PublishTopic = () => {
  const { publish: publishUser, subscribe } = useTopic<User>('user')
  const { publish: publishPost } = useTopic<Post>('post')

  const handleAddUser = () => {
    const rngId = faker.datatype.uuid()
    const rngName = faker.name.firstName()

    const rngUser: User = {
      id: rngId,
      name: rngName,
      email: faker.internet.email(rngName)
    }
    publishUser(rngId, 'created', rngUser)
  }

  const handleAddPost = () => {
    const rngId = faker.datatype.uuid()

    const rngPost: Post = {
      id: rngId,
      post: faker.hacker.phrase()
    }
    publishPost(rngId, 'created', rngPost)
  }

  useEffect(() => {
    const unSub = subscribe((event) => {
      console.log(event)
    }, 'user')
    return () => {
      unSub()
    }
  }, [])
  return (
    <div>
      <button onClick={handleAddUser}>Add random User</button>
      <button onClick={handleAddPost}>Add random Post</button>
    </div>
  )
}
const App = () => {
  return (
    <Topic>
      <PublishTopic />
    </Topic>
  )
}

export default App
