import { useContext } from 'react'
import { OnSubscribe, Topic, TopicContext } from '..'

export const useTopic = <T,>(topic: string) => {
  const { publish: pub, subscribe: sub } = useContext(TopicContext)

  const publish = (id: string, event: string, data: T) => {
    const publishTopic: Topic<T> = {
      id: id,
      data: data,
      topic: topic
    }
    pub({ event: event, topic: publishTopic })
  }

  const subscribe = (onSubscribe: OnSubscribe<T>) => {
    return sub(onSubscribe, topic)
  }

  return { publish, subscribe }
}
