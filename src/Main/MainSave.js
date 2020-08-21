import React, {Component} from 'react';
import './Main.scss'
import imgEmpty from './images/empty.svg'
import tableInfo from "../data";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objectArray: tableInfo,
            selectedArray: [],
            getElement: 0,
        };
    }


    useRow = () => {
        const copyArray = [...this.state.objectArray]; //copy the array
        copyArray[this.state.getElement].use = 'use';
        copyArray[this.state.getElement].priority = this.state.getElement;
        this.setState(prevState => ({
            objectArray: copyArray,
            selectedArray: [
                ...prevState.selectedArray,
                this.state.objectArray[this.state.getElement]
            ],
            getElement: prevState.getElement + 1,
        }))
        console.log(this.state.objectArray)
        console.log(this.state.selectedArray)
    }

    rowSwitch = (prevValue, newValue) => {
        let copyArray = Object.assign({}, this.state.objectArray)
        for(let key in copyArray) {
            let elem = copyArray[key];
            if (elem.name === prevValue && elem.use === 'use') {
                delete elem.use;
            }
            if (elem.name === newValue && elem.use !== 'use') {

            }
        }
        console.log(copyArray)
        console.log(prevValue)
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
                        {this.state.selectedArray.length > 0 ? this.state.selectedArray.map((item, indx) =>
                            <Row rowSwitch={this.rowSwitch} key={indx} rowOptions={this.state.objectArray} rowInfo={[item, indx]}/>) :
                            <EmptyRow />
                        }
                        </tbody>
                    </table>
                    <button type="button" className="button main-button__add" disabled={this.state.getElement === 7 || false} onClick={() => this.useRow()}>Add property</button>
                    <form>
                        {/*Show send data*/}
                        <button type="submit" className="button main-button__sort">Sort</button>
                    </form>
                </div>
            </main>
        );
    }
}

const EmptyRow = ({tableEmpty}) => (
    <tr className="table-empty">
        <td colSpan={4}>
            TABLE IS EMPTY <br/>
            <img src={imgEmpty} alt="Table empty" className="image-empty"/>
        </td>
    </tr>
);

const Row = ({rowInfo, rowOptions, rowSwitch}) => {
    const [prevVal, setPrevVal] = React.useState(rowInfo[0].name)
    const handleChange = (e) => {
        //Change prev value
        rowSwitch(prevVal, e.target.value);
        //Set new value
        setPrevVal(e.target.value)
    }
    return (
        <tr>
            <td>{rowInfo[0].priority}</td>
            <td>
                <select className="select-style" defaultValue={rowInfo[0].name} onChange={(e) => handleChange(e)}>
                    {rowOptions.map((a, indx) => <option disabled={a.use} key={indx} value={a.name}>{a.title}</option>)}
                </select>
            </td>
            <td>
                <button type="button" className={`sort sort-${rowInfo[0].orderTypeDefault.toLowerCase()}`} title={rowInfo[0].orderTypeDefault}/>
            </td>
            <td>
                <button type="button" className="delete" title="Delete item"/>
            </td>
        </tr>
    )
};

export default Main;