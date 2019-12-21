import React, { Fragment } from 'react';

import './Modal.css';
import './ModalContent'
import ModalContent from './ModalContent';

const ModalTrigger = ({ text }) => <button className='c-btn'>{ text }</button>;

class Modal extends React.Component {
    render () {
        const { triggerText } = this.props; 
      return (
          <Fragment>
               <ModalTrigger text={triggerText} />
                <ModalContent />
          </Fragment>
        
      )
    }

}

export default Modal