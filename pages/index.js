import { Component } from 'react';
import Head from 'next/head'
import PetCard from '../components/PetCard';
import PrincipalCover from '../components/principalCover';
import styles from '../styles/home.module.scss'
import loadFirebase from '../firebase.config';

class Index extends Component {
    constructor () {
        super();
        this.state = {
            pets: [],
            filteredPets: [],
            filterValue: ''
        }
    }

    componentDidMount () {
        this.getPets()
    }

    /**
     * Setting the value of the search input.
     * @param event
     */
    onChange (event) {
        const filterValue = event.target.value.toLowerCase();
        this.setState({filterValue}, () => this.filterList());
    }

    /**
     * Filter the pets list based on the value of the search input.
     */
    filterList () {
        let pets = this.state.pets;
        let filterValue = this.state.filterValue;

        pets = pets.filter(function (pets) {
            return pets.name.toLowerCase().indexOf(filterValue) != -1;
        });
        this.setState({filteredPets: pets});
    }

    /**
     * Return tag with no data text in case
     * @returns {JSX.Element}
     */
    returnNoDataTag () {
        return (
            <div className={styles.petsNotFound}>
                <h2>Oops! No pet found</h2>
            </div>
        )
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
                this.setState({pets: data, filteredPets: data})
            })
            .catch(error => {
                alert(`Error: ${error}`)
            });
    }

    render () {
        return (
            <div>
                <Head>
                    <title>Pets challenge</title>
                </Head>

                <section className={styles.sectionCover}>
                    <PrincipalCover></PrincipalCover>
                </section>

                <section className={styles.cardsSection}>
                    <h2 className={styles.sectionTitle}>Our pets</h2>

                    <div className={styles.searchBarContainer}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search by name"
                            value={this.state.filterValue}
                            onChange={(e) => this.onChange(e)}
                        />
                    </div>
                    <div className={styles.cardsContainer}>
                        {this.state.filteredPets.length > 0 ? this.state.filteredPets.map((pet, index) => {
                            return (
                                <div><PetCard
                                    key={index}
                                    id={pet.id}
                                    name={pet.name}
                                    description={pet.description}
                                    isLiked={pet.isLiked}
                                    image={pet.image}
                                    updateData={() => this.getPets()}
                                ></PetCard>
                                </div>
                            )
                        }) : this.returnNoDataTag()}
                    </div>
                </section>
            </div>
        );
    }
}

export default Index;

