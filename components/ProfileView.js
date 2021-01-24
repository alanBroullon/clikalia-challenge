import { Component } from 'react'
import styles from '../styles/ProfileView.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faWeight, faSyringe, faPlane, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";


export default class ProfileView extends Component {
    constructor (props) {
        super(props);
        this.state = {showPanel: false}
        this.featuresInformation = [
            {
                icon: faHome,
                text: 'Domestic'
            },
            {
                icon: faWeight,
                text: '55 Kg'
            },
            {
                icon: faSyringe,
                text: 'Vaccinated'
            },
            {
                icon: faPlane,
                text: 'Can fly'
            },
        ];
    }

    togglePanel = () => {
        this.setState({showPanel: !this.state.showPanel})
    }

    render () {
        return (
            <div>
                <div className={styles.ContainerDivider}>
                    {this.state.showPanel ?
                        <div className={styles.leftPanel}>
                            <div onClick={this.togglePanel}
                                 className={styles.cross}
                            >
                                X
                            </div>
                            <h2>Contact information</h2>
                            <p>Leave us your information and will contact you as soon as possible.</p>
                            <div className={styles.nameLastNameContainer}
                            >
                                <div>
                                    <p>Full name</p>
                                    <input
                                        className={styles.inputs}
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <p>Email</p>
                                    <input
                                        type={"email"}
                                        className={styles.inputs}
                                    />
                                </div>
                            </div>


                        </div>
                        : null}
                    <div className={styles.profileInformation}>
                        <img
                            className={styles.profileImage}
                            src={this.props.profileInformation.image}
                            alt="Profile Picture"
                        />
                        <h2>{this.props.profileInformation.name}</h2>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <h2>Description</h2>
                        <div className={styles.descriptionText}>
                            {this.props.profileInformation.description}
                        </div>
                        <div className={styles.hrBar}>
                            <hr/>
                        </div>
                        <div className={styles.iconsContainer}>
                            {
                                this.featuresInformation.map((feature, index) => {
                                    return (
                                        <div className={styles.fontAwesomeIconContainer}>
                                            <FontAwesomeIcon
                                                className={styles.icon}
                                                icon={feature.icon}
                                            >
                                            </FontAwesomeIcon>
                                            <p className={styles.fontAwesomeIconText}>{feature.text}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.buttonsContainer}>

                            <button className={styles.primaryButtonHome}
                                    onClick={this.togglePanel}
                            >
                                I'm interested
                            </button>
                            <button className={styles.secondaryButton}>
                                <Link href={{pathname: '/'}}
                                >
                                    Home page
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}