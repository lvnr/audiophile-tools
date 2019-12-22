import React, { Component, Fragment } from 'react'

import './Modal.css'
import './ModalContent.css'
import Portal from './Portal'

class Modal extends Component {
    render () {
        const { isOpen, onClose } = this.props

        return (
            <Fragment>
                <Portal>
                   {isOpen && (
                        <aside className="c-modal-cover" onClick={onClose} >
                            <div className="c-modal">
                                <button className="c-modal__close" onClick={onClose}>
                                    <span className="u-hide-visually">Close</span>
                                    <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
                                </button>
                                <div className="c-modal__body">
                                    {this.props.children}
                                </div>
                            </div>
                        </aside>
                   )}
                </Portal>
            </Fragment>
      )
    }
}

export default Modal