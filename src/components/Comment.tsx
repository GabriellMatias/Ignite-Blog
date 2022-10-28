import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

interface commentProps{
  content: string;
  onDeleteComment: (comment :string) => void
}

export function Comment({content, onDeleteComment}:commentProps) {

  /*iniciar estado que seja do mesmo tipo que vai armazenar, string, number*/
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content);
  }

  function handleLikeComment(){
    /*permite acessar o valor mais recente */
    setLikeCount((state) => {
      return state + 1
    });
  }

  return(
    <div className={styles.comment}>
      <Avatar
      hasBorder={false}
      src="https://github.com/GabriellMatias.png"
      alt=""/>

      <div className={styles.commentBox}>
          <div className={styles.commentContent}>
            <header>
              <div className={styles.authorAndTime}>
                <strong>GabriellMatias</strong>
              <span><time title='14 de Setembro de 2001' dateTime='2001-09-14 08:20:30'>Cerca de 1h atras</time> </span>
              </div>
              <button onClick={handleDeleteComment} title='Deletar Comentario'>
                <Trash size={24}/>
              </button>
            </header>

            <p>{content}</p>
          </div>
          <footer>
            <button onClick={handleLikeComment}>
              <ThumbsUp/>
              Aplaudir <span>{likeCount}</span>
            </button>
          </footer>

      </div>
    </div>
  )
}

