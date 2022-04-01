import React, { useState } from 'react';
import classes from './AddSquadButton.module.css';
import Modal from '../../../Shared/components/UI/Modal';
import Button from '../../../Shared/components/Button/Button';
import AddSquadForm from './AddSquadForm';

const AddSquadButton = props => {
    /* This button will be inside the 'SquadList' component, and will open a form that wrapped in 'Modal'
     * component, in order to display the form above the profile page.
     *
     * The component must receive the jwt token via the props in order to use him for the add squad request.*/

    // This state variable and functions will be responsible for display and remove the modal */
    const [showModal, setShowModal] = useState(false);
    const openModalHandler = () => setShowModal(true);
    const closeModalHandler = () => setShowModal(false);

    return (
        <React.Fragment>
            <Button onClick={openModalHandler}>Add Squad</Button>
            <Modal
                show={showModal}
                onCancel={closeModalHandler}
                header={"Add Squad:"}
            >

                <AddSquadForm token={props.token}></AddSquadForm>
                <div className={classes.closeButton}>
                    <Button onClick={closeModalHandler}>CLOSE</Button>
                </div>
            </Modal>

        </React.Fragment>
    );
};

export default AddSquadButton;