import React from 'react'
import '../../styles/components/menu/leftMenu.css'

class LeftMenu extends React.Component {

    state = {
        menuClicked: false
    }

    constructor(props) {
        super(props)
    }

    clearState = () => {
        this.setState({ menuClicked: false })
    }

    async componentDidMount() {
        await this.clearState();
        this.addClickEvent();
    }

    componentWillUnmount() {
        document.body.removeEventListener('click');
    }

    addClickEvent = () => {
        const menu = document.querySelector('#menu-left');
        const { menuClicked } = this.state
        document.body.addEventListener('click', function (event) {
            if (menu.contains(event.target)) {
                menu.style.width = "200px";
            } else {
                menu.style.width = "70px"
            }
        })
    }

    render() {
        return (
            <nav id="menu-left" className="menu-left">
                <div className="item-profile">
                    span
                </div>
            </nav>
        )
    }
}

export default LeftMenu