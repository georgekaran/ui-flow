import React from 'react'
import '../../styles/components/menu/leftMenu.css'
import ItemMenu from './ItemMenu'
import ModuleApi from '../../service/ModuleService'
import TransitionMenu from './TransitionMenu'
import { CSSTransition } from 'react-transition-group'

class LeftMenu extends React.Component {

    state = {
        modules: [],
        menuClicked: false
    }

    constructor(props) {
        super(props)
    }

    clearState = () => {
        this.setState({ ...this.state, menuClicked: false })
    }

    async componentDidMount() {
        await this.clearState();
        await ModuleApi.getAll().then(resp => {
            const modules = resp.data.modules
            this.setState({ ...this.state, modules })
        })
        this.addClickEvent();
    }

    componentWillUnmount() {
        document.body.removeEventListener('click');
    }

    handleMenuClicked = (event, menuClicked) => {
        const menu = document.querySelector('#menu-left');
        if (menu.contains(event.target)) {
            if (!this.state.menuClicked) {
                this.setState({ ...this.state, menuClicked: !this.state.menuClicked })
            }
            menu.style.width = "200px";
        } else {
            if (this.state.menuClicked) {
                this.setState({ ...this.state, menuClicked: !this.state.menuClicked })
            }
            menu.style.width = "70px"
        }
    }

    addClickEvent = () => {

        const { menuClicked } = this.state
        document.body.addEventListener('click', (event) => this.handleMenuClicked(event, menuClicked))
    }

    render() {
        return (
            <nav id="menu-left" className="menu-left">
                <div className="menu-left-modules-wrapper">
                    <TransitionMenu isClicked={this.state.menuClicked} />
                    <div className="flex justify-center">
                        <span>----------</span>
                    </div>
                    {this.state.modules.map(module => {
                        return <ItemMenu key={module._id} label={module.title} menuClicked={this.state.menuClicked} subItems={module.modules} />
                    })}
                </div>
            </nav>
        )
    }
}

export default LeftMenu