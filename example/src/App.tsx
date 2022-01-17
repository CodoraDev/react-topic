import React, { useEffect, useState } from 'react'

import { Event, Topic, useTopic } from 'react-codora-topic'
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

const SubscribeTopic = () => {
  const { publish: publishUser, subscribe } = useTopic<User>('user')
  const [users, setUsers] = useState<User[]>([])
  const [event, setEvent] = useState<Event<User>>()
  useEffect(() => {
    const unSub = subscribe((users, event) => {
      setUsers(users)
      setEvent(event)
    })
    return () => {
      unSub()
    }
  }, [])
  return (
    <div>
      <h2>Latest User Event:</h2>
      <pre>{JSON.stringify(event, null, 2)}</pre>

      <h2>Current User Collection:</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}

const PublishTopic = () => {
  const { publish: publishUser } = useTopic<User>('user')
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
      <>
        <PublishTopic />
        <SubscribeTopic />
      </>
    </Topic>
  )
}

export default App
