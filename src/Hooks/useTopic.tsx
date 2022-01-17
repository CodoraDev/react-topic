import { useContext } from 'react'
import { Topic, TopicContext } from '..'

export const useTopic = <T,>(topic: string) => {
  const { publish: pub, subscribe } = useContext(TopicContext)

  const publish = (id: string, event: string, data: T) => {
    const publishTopic: Topic<T> = {
      id: id,
      data: data,
      topic: topic
    }
    pub({ event: event, topic: publishTopic })
  }
  return { publish, subscribe }
}
