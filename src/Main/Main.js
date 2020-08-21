import React, {Component} from 'react';
import './Main.scss'
import imgEmpty from './images/empty.svg'
import tableInfo from "../data";


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
        alert(number);
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
        console.log('addNewRow')
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
            console.log(RowIndex)
            delete copyArrayNew[RowIndex].use;
            copyArrayNew.splice(RowIndex, 1)
            this.setState(prevState => ({
                objectArray: copyArrayObj,
                newArray: [...copyArrayNew, copyArrayObj[number]],
                GG: [copyArrayObj[number]]
            }))
        }

        this.getNotUsedRow();
    }

    changeRow = (prevVal, newVal, RowIndex) => {
        console.log('change row');
        const copyArrayObj = [...this.state.objectArray];
        const copyArrayNew = [...this.state.newArray];

        for (let i = 0; i < copyArrayObj.length; i++) {
            if (copyArrayObj[i].name ===  newVal) {
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


    render() {
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
                    <button type="button" className="button main-button__add"
                            disabled={this.state.availibleParams.length === 0}
                            onClick={() => this.addNewRow(this.state.availibleParams[0])}>Add property
                    </button>
                    <form>
                        {/*Show send data*/}
                        <button type="submit" className="button main-button__sort">Sort</button>
                    </form>
                </div>
            </main>
        );
    }
}

const EmptyRow = () => (
    <tr className="table-empty">
        <td colSpan={4}>
            TABLE IS EMPTY <br/>
            <img src={imgEmpty} alt="Table empty" className="image-empty"/>
        </td>
    </tr>
);

const Row = ({RowIndex, RowItem, initArray, newArray, changeRow, deleteNewRow, sortMethod}) => {
    const checkIndexName = RowItem ? RowItem.name : '';
    const [prevVal, setPrevVal] = React.useState('')
    const handleChange = (e) => {
        changeRow(prevVal, e.target.value, RowIndex)
        setPrevVal(e.target.value)
    }

    return (
        <tr className={RowIndex}>
            <td>{RowItem.name}</td>
            <td>
                <select value={RowItem.name} className="select-style"
                        onChange={(e) => handleChange(e)} onClick={(e) => setPrevVal(e.target.value)}
                >
                    <option disabled={RowItem.name}
                            value={RowItem.name}
                    >
                        {RowItem.title}
                    </option>
                    {
                        initArray.filter(elemm => !elemm.use).map((a, indx) =>
                            <option key={indx} value={a.name}>{a.title}</option>
                        )
                    }
                </select>
            </td>
            <td>
                <button type="button" className={`sort sort-${RowItem.orderTypeDefault.toLowerCase()}`}
                        title={RowItem.orderTypeDefault} onClick={() => sortMethod(RowItem.priority)}/>
            </td>
            <td>
                <button type="button" className="delete" title="Delete item"
                        onClick={() => deleteNewRow(RowIndex, RowItem.priority)}/>
            </td>
        </tr>
    )
};

export default Main;