import React from 'react'
import '../../styles/components/menu/leftMenu.css'
import ItemMenu from './ItemMenu'
import ModuleApi from '../../service/ModuleService'

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
            this.setState({ ...this.state, modules: resp.data.modules })
            console.log(resp.data)
        })
        this.addClickEvent();
    }

    componentWillUnmount() {
        document.body.removeEventListener('click');
    }

    handleMenuClicked = (event, { menuClicked, menu }) => {
        if (menu.contains(event.target)) {
            this.setState({ ...this.state, menuClicked: !menuClicked })
            menu.style.width = "200px";
        } else {
            this.setState({ ...this.state, menuClicked: !menuClicked })
            menu.style.width = "70px"
        }
    }

    addClickEvent = () => {
        const menu = document.querySelector('#menu-left');
        const { menuClicked } = this.state
        document.body.addEventListener('click', (event) => this.handleMenuClicked(event, { menu, menuClicked }))
    }

    render() {
        return (
            <nav id="menu-left" className="menu-left">
                <div>
                    <div className="item-profile">
                        span
                    </div>
                    {this.state.modules.length && this.state.modules.map(module => {
                        return <ItemMenu label={module.title} menuClicked={this.state.menuClicked} subItems={module.modules} />
                    })}
                    {/* <ItemMenu label="Configurações" menuClicked={this.state.menuClicked} subItems={[]} />
                    <ItemMenu label="Projetos" menuClicked={this.state.menuClicked} />
                    <ItemMenu label="Outros" menuClicked={this.state.menuClicked} /> */}
                </div>
            </nav>
        )
    }
}

export default LeftMenu