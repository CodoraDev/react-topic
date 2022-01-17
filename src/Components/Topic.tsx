import React, { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Dictionary } from '../lib/util'

export type TopicProps = {
  children: JSX.Element
  debug?: boolean
}

export const Topic = ({ children }: TopicProps) => {
  const [subscriptions, setSubscriptions] = useState<Subscriptions>({})
  //   const [events, setEvents] = useState<EventRegistry>({})
  const [topics, setTopics] = useState<TopicRegistry>({})

  const subscribe: Subscribe = <T,>(onSubscribe: OnSubscribe<T>) => {
    const id = uuid()

    setSubscriptions((stream) => {
      subscriptions[id] = onSubscribe
      return stream
    })

    const unsubscribe: UnSubScribe = () =>
      setSubscriptions((stream) => {
        delete stream[id]
        return stream
      })
    return unsubscribe
  }

  const publish: Publish = <T,>(publishEvent: PublishEvent<T>) => {
    // Add topic to topic registry.
    setTopics((topics) => {
      if (topics[publishEvent.topic.topic] == undefined) {
        topics[publishEvent.topic.topic] = {}
      }
      topics[publishEvent.topic.topic][publishEvent.topic.id] =
        publishEvent.topic
      console.log(topics)
      return topics
    })
    // setEvents((events) => {
    //   const event: Event<any> = {
    //     id: events.length,
    //     timestamp: new Date(),
    //     ...publishEvent
    //   }
    //   forEachKey(subscriptions, (subscription) => {
    //     subscription(event)
    //   })
    //   return [...events, event]
    // })
  }

  const provider = {
    subscribe: subscribe,
    publish: publish
  }
  return (
    <TopicContext.Provider value={provider}>
      <div>{children}</div>
      {/* {debug && (
        <div>
          <h2>Event Debug</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Topic</th>
                <th>Timestamp</th>
                <th>Object</th>
              </tr>
            </thead>
            <tbody>
              {events
                .sort((a, b) => b.id - a.id)
                .map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.topic}</td>
                    <td>{event.timestamp.toLocaleTimeString()}</td>
                    <td>{JSON.stringify(event.object)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )} */}
    </TopicContext.Provider>
  )
}

export type TopicRegistry = Dictionary<Dictionary<Topic<any>>>
export type EventRegistry = Dictionary<Event<any>[]>

export type Topic<T> = {
  id: string
  topic: string
  data: T
}

export type Event<T> = {
  eventId: number
  topic: Topic<T>
  timestamp: Date
}
export type PublishEvent<T> = {
  event: string
  topic: Topic<T>
}

export type Subscriptions = Dictionary<OnSubscribe<any>>

export type Subscribe = <T>(onSubscribe: OnSubscribe<T>) => UnSubScribe

export const nullSubscribe: Subscribe = () => nullUnSubscribe

export type OnSubscribe<T> = (event: Event<T>) => void
export const nullOnSubscribe = () => {}

export type UnSubScribe = () => void
export const nullUnSubscribe: UnSubScribe = () => {}

export type Publish = <T>(publishEvent: PublishEvent<T>) => void
export const nullPublish: Publish = () => {}

export const TopicContext = createContext<TopicProvider>({
  subscribe: nullSubscribe,
  publish: nullPublish
})

type TopicProvider = {
  subscribe: Subscribe
  publish: Publish
}
