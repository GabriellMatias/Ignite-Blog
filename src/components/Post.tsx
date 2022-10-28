import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
 

interface Content{
  type: string;//se colocar 'paragraph' | 'link' da erro no App.tsx
  content: string;
}

 export interface postProps{
  author:{
    name: string;
    role:string;
    avatarUrl:string;
  },
  publishedAt:Date;
  content: Content[];
}

export function Post({author, publishedAt, content}:postProps){

  const [comments, setComments] = useState([
    'post muitoo legall!',
  ])

  const [newCommentText, setNewCommentText] = useState('');/*comeca o estado desse array como vazio*/

  const publishedDateFormated = format(publishedAt, "dd 'de' LLLL 'as' HH:mm'h'", {
    locale: ptBR,
  });

  const publisheDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  function handleCreateNewComment(event: FormEvent){
    event.preventDefault();

    setComments([
      ...comments, newCommentText /*pega os comentarios que ja tem e adiciona o novo*/
    ]);
    setNewCommentText(''); /* voltando o valor do comentario para o inicial ou seja vazio*/

  }
  /*usa handle pq foi utilizado tags html, questao de formatacao de cod*/
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Campo Obrigatorio!');
  }

  function deleteComment(commentsToDelete:string){

    /*pega os comentarios que ja tem salvo, percorre e retorna apenas aqueles que nao tem 
    o conteudo igual, isso deveria ser feito com um ID para melhor perfomace,
    sendo assim retorna os comentarios que o conteudo e diferente, e 'exclui' o comentario
    que o conteudo e igual aquele comentario que foi clicado para excluir*/

    const commentsWithoutDeletedOne = comments.filter(comment =>{

      return comment !== commentsToDelete
    })
    setComments(commentsWithoutDeletedOne);
    //realiza a acao de deletar o comentario
  }

  //rules of clean code
  const isNewCommentEmpty = newCommentText.length === 0;

  return(

    <article className={styles.post}>

      <header>
        <div className={styles.author}>

        <Avatar src={author.avatarUrl}/>

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
          {publisheDateRelativeToNow}
        </time>

      </header> 

      <div className={styles.content}>
        {content.map(item =>{
          if (item.type === 'paragraph'){
            return <p key={item.content}>{item.content}</p>;
          }
          else if(item.type === 'link'){
            return <p key={item.content}><a href="">{item.content}</a></p>
          }
        })}

      </div>
       
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu Feedback</strong>

        
        <textarea onChange={handleNewCommentChange}
        name='comment' 
        placeholder='Deixe um comentario'
        value={newCommentText} 
        onInvalid={handleNewCommentInvalid}
        required/>


        <footer>
        <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
        </footer>

      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {

          return (
          <Comment 
          key={comment} 
          content={comment} 
          onDeleteComment={deleteComment}/>
          )

        })}
      </div>

    </article>
  )
}