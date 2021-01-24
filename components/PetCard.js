import { Component } from 'react'
import styles from '../styles/PetCard.module.scss'
import loadFirebase from "../firebase.config";
import Link from 'next/link'

class PetCard extends Component {
    constructor (props) {
        super(props);
    }

    /**
     *  Call router to go to profile page.
     *
     * @param petInstance {Object} The pet to be render. Can't be null.
     */
    goToProfile (petInstance) {
        this.router.push({pathname: '/profile[pet]', query: {pet: petInstance}})
    }

    /**
     * Call firebase function to update isLike element.
     *
     * @param petId {String} The id of the document to be changed. Can't be null.
     * @param isLiked {Boolean} The value of the like.Can't be null.
     * @returns {Promise<void>}
     */
    async doLike (petId, isLiked) {
        const firebase = await loadFirebase();
        const db = firebase.firestore();
        await db.collection('pets').doc(petId).update({
            isLiked: !isLiked
        }).then(snapshot => {
            this.props.updateData()
        }).catch(error => {
            alert(`Error: ${error}`)
        });
    }

    render () {
        return (
            <div className={styles.cardInformation}>
                {this.props.isLiked ?
                    <p className={styles.likeTextCard}>Liked</p>
                    : null
                }
                <img
                    className={styles.imageContainer}
                    src={this.props.image}
                    alt="Picture of the author"
                    width={400}
                    height={400}
                />
                <div className={styles.informationContainer}>
                    <button className={styles.likeText}
                            onClick={() => {this.doLike(this.props.id, this.props.isLiked)}}
                    >
                        {this.props.isLiked ? 'Unlike' : 'Like'}
                    </button>
                    <span className={styles.cardName}>{this.props.name}</span>
                    <span className={styles.descriptionContainer}>{this.props.description}</span>

                    <Link href={{
                        pathname: '/profile',
                        query: {petId: this.props.id},
                    }}
                    >
                        <a className={styles.button} target="_blank">View profile</a>
                    </Link>
                </div>
            </div>
        )
    }
}

export default PetCard