import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'


export interface avatarProps extends ImgHTMLAttributes<HTMLImageElement>{
  hasBorder?: boolean;
}

export function Avatar({hasBorder = true, ...props}:avatarProps){
  return(
    <div>
      <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
      //src={props.src}
      //alt={props.alt}
      //title={props.title}

      //mesma coisa!!
      
      {...props}/>
    </div>
  )
}