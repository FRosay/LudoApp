import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap'
import './modal-view.css'

const ModalView = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.title}</h4>
                <p>
                    {props.text}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );    
};

ModalView.propTypes = {
    heading: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onHide: PropTypes.func,
};

ModalView.defaultProps = {
    heading: 'Error',
    title: 'Error',
    text: 'Error',
};

export default ModalView