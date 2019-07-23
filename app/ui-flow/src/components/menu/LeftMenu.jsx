import React from 'react'
import '../../styles/components/menu/leftMenu.css'
import ItemMenu from './ItemMenu'
import ModuleApi from '../../service/ModuleService'
import TransitionMenu from './TransitionMenu'
import { CSSTransition } from 'react-transition-group'

class LeftMenu extends React.Component {

    state = {
        modules: [],
        isExpand: false,
        moduleClick: null
    }

    constructor(props) {
        super(props)
    }

    updateState = (updates) => {
        console.log(updates)
        this.setState({ ...this.state, ...updates })
    }

    updateMenuClicked = (isClicked) => {
        this.setState(({ ...this.state, isExpand: isClicked }))
        console.log("Menu: " + isClicked)
        this.updateMenuWidth(this.state.isExpand)
    }

    async componentDidMount() {
        await this.updateState({ isExpand: false });
        await ModuleApi.getAll().then(resp => {
            const modules = resp.data.modules
            this.setState({ ...this.state, modules })
        })
        this.addClickEvent();
    }

    componentWillUnmount() {
        document.body.removeEventListener('click');
    }

    updateMenuWidth = (isClicked) => {
        this.updateState({ isExpand: false });
    }

    handleMenuClicked = (event, isExpand) => {
        console.log("Menu is clicked")
        const menu = document.querySelector('#menu-left');
        if (menu.contains(event.target)) {
            if (!this.state.isExpand) {
                this.setState({ ...this.state, isExpand: true })
            }
        } else {
            if (this.state.isExpand) {
                this.setState({ ...this.state, isExpand: false })
            }
        }
    }

    addClickEvent = () => {
        const { isExpand } = this.state
        document.body.addEventListener('click', (event) => this.handleMenuClicked(event, isExpand))
    }

    render() {
        return (
            <nav id="menu-left" className={this.state.isExpand ? "menu-left menu-left-expand" : "menu-left"}>
                <div className="menu-left-modules-wrapper">
                    <img className="app-logo" src="http://127.0.0.1:5000/images/logo_teste.png"/>
                    {/* <TransitionMenu isClicked={this.state.menuClicked} />
                    <div className="flex justify-center">
                        <span>----------</span>
                    </div> */}
                    {this.state.modules.map(module => {
                        return <ItemMenu key={module._id} leftMenuState={this.state} 
                                         updateState={this.updateState} module={module}
                                         updateMenuClicked={this.updateMenuClicked}/>
                    })}
                    <ItemMenu leftMenuState={this.state} className={"left-menu-bottom"}
                                updateState={this.updateState} module={{ _id: 0, title: "", icon: "arrow_forward_ios"}}
                                updateMenuClicked={this.updateMenuClicked}/>
                </div>
            </nav>
        )
    }
}

export default LeftMenu