import { Component } from 'react';
import ProfileView from '../components/ProfileView';
import { withRouter } from "next/router";
import loadFirebase from "../firebase.config";
import PetCard from "../components/PetCard";
import styles from "../styles/home.module.scss";

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            petProfile: {},
            similarPets: []
        }
    }

    /**
     * Get the query param to get the pet. Because in refresh router.query comes null, I split the asPath string.
     */
    componentWillReceiveProps () {
        let petId = this.props.router.query.petId
        if (!petId) {
            let asPath = this.props.router.asPath
            let idSplitted = asPath.split("/profile?petId=")
            petId = idSplitted[1]
        }
        this.getPetProfile(petId)
    }

    /**
     * Get specific pet to see the profile.
     * @param petProfile {String} The pet to get.
     * @returns {Promise<void>}
     */
    async getPetProfile (petProfile) {
        const firebase = await loadFirebase();
        const db = firebase.firestore();
        await db.collection('pets').doc(petProfile).get()
            .then(response => {
                this.setState({petProfile: response.data()})
                this.getPets()
            })
            .catch(error => {
                alert(`Error: ${error}`)
            });
    }

    /**
     * Get the pets list.
     * @returns {Promise<void>}
     */
    async getPets () {
        const firebase = await loadFirebase();
        const db = firebase.firestore();
        await db.collection('pets')
            .get()
            .then(snapshot => {
                let data = [];
                snapshot.forEach(doc => {
                    data.push(
                        Object.assign(
                            {
                                id: doc.id
                            },
                            doc.data()
                        )
                    );
                });
                this.setState({similarPets: data})
            })
            .catch(error => {
                alert(`Error: ${error}`)
            });
    }

    render () {
        return (
            <div>
                <ProfileView profileInformation={this.state.petProfile}></ProfileView>
                <section className={styles.cardsSection}>
                    <h2>Similar pets</h2>
                    <div className={styles.cardsContainer}>
                        {this.state.similarPets.map((pet, index) => {
                            if (pet.name !== this.state.petProfile.name) {
                                return (<PetCard
                                    key={index}
                                    id={pet.id}
                                    name={pet.name}
                                    description={pet.description}
                                    isLiked={pet.isLiked}
                                    image={pet.image}
                                    updateData={() => this.getPets()}
                                ></PetCard>)
                            }
                        })}
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Profile)