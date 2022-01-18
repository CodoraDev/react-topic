# CodoraDev - React Topic
<!-- Image Here -->
 
*A react hook to publish and subscribe to a topic from any component.*

![version](https://img.shields.io/npm/v/react-codora-topic)
![npm downloads](https://img.shields.io/npm/dm/@codora/react-topic)


[Report Bug](https://github.com/CodoraDev/react-topic/issues/new) - 
[Request Feature](https://github.com/CodoraDev/react-topic/issues/new)
 
##  ✨ Install
`npm install --save @codora/react-topic` 

## 👉 Import
`import {Topic, useTopic} from "@codora/react-topic";`

##  🚀 Demo
Coming Soon...

## 🔬 Use Topic
Add the `<Topic>` context any where in your app. Add it near the root if you want to use topics for your whole app. 
```tsx
import {Topic} from "@codora/react-topic";

const App = () => {
  return (
    <Topic>
      //...
    </Topic>
  )
}
```

You will then have access to `useTopic`. It takes one argument, which will be the topic name, and one type argument, which will be the topic type. 

`useTopic` will return two functions: `publish` and `subscribe`
```tsx
import {useTopic} from "@codora/react-topic";

type User = {
    name
}
const SomeComponent = () => {
    const {publish, subscribe} =useTopic<User>("user")

    //...
```
`publish` is quite simple. All you need to do is pass in the data. This will add the data to its topic collection and send out an event to any subscribers.

```tsx
//...

const newUser: User = buildUser();

<button onclick={()=> 
    publish(newUser) 
}>
    Add User
</button>

//...
```

`subscribe` will have to be used with in a useEffect for it to stay open and subscribed. `subscribe` will return an `unSubscribe` function which should be called when ever you do not need the subscription, else there will be a memory leak in your application. 

The first argument is an `onSubscribe` function which is the callback function that will be called on an event. `onSubscribe` as two input arguments. The first is the topic updated collection array. We pass whole topic array with each event as it feels the most natural when making web applications. The second input argument is the `event` that was sent. In this event will hold the individual topic.

```tsx
//...

  const [users, setUsers] = useState<User[]>([])
  const [event, setEvent] = useState<Event<User>>()

  useEffect(() => {
    const unSubscribe = subscribe((users, event) => {
      setUsers(users)
      setEvent(event)
    })
    return () => {
      unSubscribe()
    }
  }, []) 

//...
```

A full example is available [here](https://github.com/CodoraDev/react-topic/tree/main/example).

<!-- #3 🔥 Features
`model-repo` comes with a bundle of features already. You can do the followings with it,

## 🔢 Feature 1
 - Description.

## 🏗️ Feature 2
- Description -->

<!-- 
# 🏗️ How to Set up `model-repo` for Development?

1. Clone the repository

```bash
git clone https://github.com/atapas/model-repo.git
```

2. Change the working directory

```bash
cd model-repo
```

3. Install dependencies

```bash
npm install # or, yarn install
```

4. Create `.env` file in root and add your variables

```bash
KEY=VALUE
```

5. Run the app

```bash
npm run dev # or, yarn dev
```

That's All!!! Now open [localhost:3000](http://localhost:3000/) to see the app.

# 🍔 Built With
- [Technology 1](https://tapasadhikary.com)
- [Technology 2](https://tapasadhikary.com)
- [Technology 3](https://tapasadhikary.com)
- [Technology 4](https://tapasadhikary.com)
- [Technology 5](https://tapasadhikary.com)
- [Technology 6](https://tapasadhikary.com)
- [Technology 7](https://tapasadhikary.com) -->



## 🦄 Upcoming Features
`@codoradev/react-topic` has all the potentials to grow further. Here are some of the upcoming features planned(not in any order),

- On the first subscribe you can choose which which event to replay from
  
## 🛡️ License
This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.
<!--
- ✔️ Feature Request 1.
- ✔️ Feature Request 2.
- ✔️ Feature Request 3.
- ✔️ Feature Request 4.
- ✔️ Feature Request 5.
- ✔️ Feature Request 6.
- ✔️ Feature Request 7.
- ✔️ Feature Request 8.
- ✔️ Feature Request 9.
- ✔️ Feature Request 10.
- ✔️ Feature Request 11.

If you find something is missing, `model-repo` is listening. Please create a feature request [from here](https://github.com/atapas/model-repo/issues/new/choose).


# 🤝 Contributing to `model-repo`
Any kind of positive contribution is welcome! Please help us to grow by contributing to the project.

If you wish to contribute, you can work on any features [listed here](https://github.com/atapas/model-repo#-upcoming-features) or create one on your own. After adding your code, please send us a Pull Request.

> Please read [`CONTRIBUTING`](CONTRIBUTING.md) for details on our [`CODE OF CONDUCT`](CODE_OF_CONDUCT.md), and the process for submitting pull requests to us.
 
# 🙏 Support

We all need support and motivation. `model-repo` is not an exception. If you found the app helpful, consider supporting us with a coffee.

<a href="https://www.buymeacoffee.com/greenroots">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50px">
</a>

---

<h3 align="center">
A ⭐️ to <b>Model Repo</b> is must as a motivation booster.
</h3> -->

  

