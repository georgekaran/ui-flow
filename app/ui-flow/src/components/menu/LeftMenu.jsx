import React from 'react'
import '../../styles/components/menu/leftMenu.css'
import ItemMenu from './ItemMenu'
import ModuleApi from '../../service/ModuleService'
import TransitionMenu from './TransitionMenu'
import { CSSTransition } from 'react-transition-group'

class LeftMenu extends React.Component {

    state = {
        modules: [],
        menuClicked: false,
        moduleClick: null
    }

    constructor(props) {
        super(props)
    }

    updateState = (updates) => {
        this.setState({ ...this.state, ...updates })
        this.updateMenuWidth(false)
    }

    async componentDidMount() {
        await this.updateState({ menuClicked: false });
        await ModuleApi.getAll().then(resp => {
            const modules = resp.data.modules
            this.setState({ ...this.state, modules })
        })
        this.addClickEvent();
    }

    componentWillUnmount() {
        document.body.removeEventListener('click');
    }

    updateMenuWidth = (isMenuClicked) => {
        const menu = document.querySelector('#menu-left');
        menu.style.width = isMenuClicked ? "320px" : "70px" ;
    }

    handleMenuClicked = (event, menuClicked) => {
        const menu = document.querySelector('#menu-left');
        if (menu.contains(event.target)) {
            if (!this.state.menuClicked) {
                this.setState({ ...this.state, menuClicked: !this.state.menuClicked })
            }
        } else {
            if (this.state.menuClicked) {
                this.setState({ ...this.state, menuClicked: !this.state.menuClicked })
            }
        }
        this.updateMenuWidth(this.state.menuClicked)
    }

    addClickEvent = () => {
        const { menuClicked } = this.state
        document.body.addEventListener('click', (event) => this.handleMenuClicked(event, menuClicked))
    }

    render() {
        return (
            <nav id="menu-left" className="menu-left">
                <div className="menu-left-modules-wrapper">
                    <img className="app-logo" src="http://127.0.0.1:5000/images/logo_teste.png"/>
                    {/* <TransitionMenu isClicked={this.state.menuClicked} />
                    <div className="flex justify-center">
                        <span>----------</span>
                    </div> */}
                    {this.state.modules.map(module => {
                        return <ItemMenu key={module._id} leftMenuState={this.state} updateState={this.updateState} module={module} />
                    })}
                </div>
            </nav>
        )
    }
}

export default LeftMenu