import { Component } from 'react'
import styles from '../styles/PrincipalCover.module.scss'

const scrollTo = () => {
    window.scroll({top: 500, behavior: 'smooth'})
}

const PrincipalCover = () => (
    <div className={styles.coverContainer}>
        <img className={styles.coverImage}
             src="https://media.giphy.com/media/C7Gj216EwEi4/giphy.gif"
             alt="Cover image"
        />
        <div className={styles.coverInformationContainer}>
            <h1 className={styles.coverTitle}> Pets are waiting
                <span className={styles.coverTitleColor}
                      onClick={scrollTo}
                >
                they need you ⌄
            </span>
            </h1>
        </div>
    </div>
)

export default PrincipalCover