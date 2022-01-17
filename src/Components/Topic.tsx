import React, { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Dictionary, forEachKey, mapEachKey } from '../lib/util'

export type TopicProps = {
  children: JSX.Element
  debug?: boolean
}

export const Topic = ({ children }: TopicProps) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRegistry>({})
  const [events, setEvents] = useState<EventRegistry>({})
  const [topics, setTopics] = useState<TopicRegistry>({})

  const subscribe: Subscribe = <T,>(
    onSubscribe: OnSubscribe<T>,
    topic: string
  ) => {
    const subscription: Subscription<T> = {
      id: uuid(),
      topic: topic,
      head: events[topic] ? events[topic].length : 0,
      onSubscribe: onSubscribe
    }

    setSubscriptions((subscriptions) => {
      if (subscriptions[topic] == undefined) {
        subscriptions[topic] = {}
      }
      subscriptions[topic][subscription.id] = subscription
      return subscriptions
    })

    const unsubscribe: UnSubScribe = () =>
      setSubscriptions((stream) => {
        delete stream[subscription.id]
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

      setEvents((events) => {
        if (events[publishEvent.topic.topic] == undefined) {
          events[publishEvent.topic.topic] = []
        }

        const event: Event<T> = {
          eventId: events[publishEvent.topic.topic].length,
          topic: publishEvent.topic,
          timestamp: new Date()
        }
        events[publishEvent.topic.topic] = [
          ...events[publishEvent.topic.topic],
          event
        ]

        if (subscriptions[publishEvent.topic.topic] == undefined) {
          subscriptions[publishEvent.topic.topic] = {}
        }
        forEachKey(
          subscriptions[publishEvent.topic.topic],
          (subscription: Subscription<T>) => {
            const collection: T[] = mapEachKey(
              topics[publishEvent.topic.topic],
              (item: Topic<T>) => item.data
            )
            subscription.onSubscribe(collection, event)
            subscription.head = events[publishEvent.topic.topic].length
            setSubscriptions((subscriptions) => {
              subscriptions[publishEvent.topic.topic][subscription.id] =
                subscription
              return subscriptions
            })
          }
        )

        return events
      })

      return topics
    })
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
              {mapEachKey(events, (event) => event)
                .sort((a, b) => b. - a.id)
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
export type SubscriptionRegistry = Dictionary<Dictionary<Subscription<any>>>

export type Subscription<T> = {
  id: string
  topic: string
  head: number
  onSubscribe: OnSubscribe<T>
}

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

export type Subscribe = <T>(
  onSubscribe: OnSubscribe<T>,
  topic: string
) => UnSubScribe

export const nullSubscribe: Subscribe = () => nullUnSubscribe

export type OnSubscribe<T> = (collection: T[], event: Event<T>) => void
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
