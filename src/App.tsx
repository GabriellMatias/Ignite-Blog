import { Header } from "./components/Header";
import {Post, postProps} from "./components/Post"
import './global.css';
import styles from './app.module.css';
import { Sidebar } from "./components/SideBar";


const posts =[
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/gabriellmatias.png',
      name : 'Gabriell Matias',
      role : 'Full Stack Developer'
    },
    content:[
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'} 
    ],
    publishedAt: new Date('2022-09-09 22:22:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name : 'Mayk Brito',
      role : 'Educardor @ Rocketseat'
    },
    content:[
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'} 
    ],
    publishedAt: new Date('2022-09-10 20:10:00'),
  }
]


export function App(content:postProps) {

  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>

        <Sidebar/>
        
        <main>
            {posts.map(post =>{
              return(
                <Post
                    key={post.id}//ajeitar
                    author={post.author}
                    content={post.content}//se nao passar o type como string da erro pois aqui ele nao le apenas o link ou paragraph, e sim o conteudo inteiro
                    publishedAt={post.publishedAt}
                />
              )
            })}
        </main>
      </div>
    </div>
  )
}

