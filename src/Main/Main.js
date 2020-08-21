import React, {Component} from 'react';
import './Main.scss'
import tableInfo from "../data";
import EmptyRow from "./MainEmptyRow";
import Row from "./MainRow";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objectArray: tableInfo,
            newArray: [],
            availibleParams: []
        };
    }

    getNotUsedRow = () => {
        let copyArray = Object.assign({}, this.state.objectArray);
        let availableItems = [];
        for (let key in copyArray) {
            let elem = copyArray[key];
            if (!elem.use) {
                availableItems.push(elem.priority)
            }
        }
        this.setState({availibleParams: availableItems})
    }

    deleteNewRow = (deleteIndex, number) => {
        const copyArrayObj = [...this.state.objectArray];
        let copyArrayNew = [...this.state.newArray];
        delete copyArrayObj[number].use;
        copyArrayNew.splice(deleteIndex, 1)

        for (let i = 0; i < copyArrayNew.length; i++) {
            copyArrayNew[i].priority = i;
        }
        for (let i = 0; i < copyArrayObj.length; i++) {
            copyArrayObj[i].priority = i;
        }

        this.setState(({
            objectArray: copyArrayObj,
            newArray: copyArrayNew,
        }))
        this.getNotUsedRow()
    }

    addNewRow = (number, change = false, RowIndex) => {
        const copyArrayObj = [...this.state.objectArray];
        const copyArrayNew = [...this.state.newArray];
        copyArrayObj[number].use = 'use';
        copyArrayObj[number].priority = Number(number);
        if (!change) {
            this.setState(prevState => ({
                objectArray: copyArrayObj,
                newArray: [
                    ...copyArrayNew,
                    copyArrayObj[number],
                ],
            }))
        } else {
            delete copyArrayNew[RowIndex].use;
            copyArrayNew.splice(RowIndex, 1)
            this.setState(prevState => ({
                objectArray: copyArrayObj,
                newArray: [copyArrayObj[number], ...copyArrayNew],
            }))
        }

        this.getNotUsedRow();
    }

    changeRow = (prevVal, newVal, RowIndex) => {
        const copyArrayObj = [...this.state.objectArray];
        const copyArrayNew = [...this.state.newArray];

        for (let i = 0; i < copyArrayObj.length; i++) {
            if (copyArrayObj[i].name === newVal) {
                this.addNewRow(i, true, RowIndex);
            }
        }
    }

    sortMethod = (index) => {
        const copyArrayObj = [...this.state.objectArray];
        const options = ['ASC', 'DESC'];
        if (copyArrayObj[index].orderTypeDefault === options[0]) {
            copyArrayObj[index].orderTypeDefault = options[1];
        } else {
            copyArrayObj[index].orderTypeDefault = options[0];
        }

        this.setState(prev => ({
            objectArray: copyArrayObj
        }))
    }

    componentDidMount() {
        const copyArrayObj = [...this.state.objectArray]
        for (let i = 0; i < copyArrayObj.length; i++) {
            copyArrayObj[i].priority = i;
        }

        this.getNotUsedRow()
    }

    sendData = (e) => {
        e.preventDefault();
        function formatingData(order, properthy, priority) {
            this.order = order;
            this.properthy = properthy;
            this.priority = priority;
        }
        alert('look in console!')

        let sendedData = JSON.parse(JSON.stringify(this.state.newArray))
        console.log(sendedData.length < 1 ? 'There are not elements to send' : 'Here your result')
        for (let i = 0; i < sendedData.length; i++) {
            sendedData[i].priority = i
            let Data = new formatingData(sendedData[i].orderTypeDefault, sendedData[i].title, sendedData[i].priority)
            console.table(Data)
        }
    }


    render() {
        const availibleAdd = this.state.availibleParams.length;
        return (
            <main className="section-main">
                <div className="container">
                    <table cellPadding="0" cellSpacing="0">
                        <thead>
                        <tr>
                            <th/>
                            <th>Properties</th>
                            <th>Order</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.newArray.length > 0 ?
                            this.state.newArray.map((item, indx) =>
                                <Row key={indx}
                                     newArray={this.state.newArray}
                                     initArray={this.state.objectArray}
                                     changeRow={this.changeRow}
                                     deleteNewRow={this.deleteNewRow}
                                     sortMethod={this.sortMethod}
                                     RowIndex={indx}
                                     RowItem={item}
                                />) :
                            <EmptyRow/>
                        }
                        </tbody>
                    </table>
                    <button type="button" className={`button main-button__add ${availibleAdd ? '' : "main-button__block"}`}
                            disabled={availibleAdd === 0}
                            onClick={() => this.addNewRow(this.state.availibleParams[0])}>
                        {availibleAdd ? 'Add new item' : 'No available items'}
                    </button>
                    <button type="submit" className="button main-button__sort" onClick={(e) => this.sendData(e)}>Sort</button>
                </div>
            </main>
        );
    }
}

export default Main;