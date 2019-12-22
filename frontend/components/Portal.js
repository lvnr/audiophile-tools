import { Component } from 'react'
import ReactDOM from 'react-dom'

let portalRoot

if (typeof document !== 'undefined')
    portalRoot = document.getElementById('portal')

export default class Portal extends Component {
    constructor() {
        super()
        if (typeof document !== 'undefined')
            this.el = document.createElement('div')
    }

    componentDidMount() {   
        if (portalRoot)
            portalRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        if (portalRoot)
            portalRoot.removeChild(this.el)
    }

    render() {
        const { children } = this.props
        if (this.el)
            return ReactDOM.createPortal(children, this.el)
        else
            return <div />
    }
}