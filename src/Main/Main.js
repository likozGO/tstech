import React, {Component} from 'react';
import './Main.scss'
import imgEmpty from './images/empty.svg'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    render() {
        return (
            <main className="section-main">
                <div className="container">
                    <table cellPadding="0" cellSpacing="0">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Properties</th>
                            <th>Order</th>
                            <th>Delete</th>
                        </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <select className="select-style">
                                        <option value="1">Asd</option>
                                        <option value="2">Asd2</option>
                                        <option value="3">Asd3</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" className="sort sort-desc" title="DESC" />
                                </td>
                                <td>
                                    <button type="button" className="delete" title="Delete item" />
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <select className="select-style">
                                        <option value="1">Asd</option>
                                        <option value="2">Asd2</option>
                                        <option value="3">Asd3</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" className="sort sort-asc" title="ASC" />
                                </td>
                                <td>
                                    <button type="button" className="delete" title="Delete item" />
                                </td>
                            </tr>
                            <tr className="table-empty">
                                <td colSpan={4}>
                                    TABLE IS EMPTY <br />
                                    <img src={imgEmpty} alt="Table empty" className="image-empty"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" className="button main-button__add">Add property</button>
                    <form>
                        {/*Show send data*/}
                        <button type="submit" className="button main-button__sort">Sort</button>
                    </form>
                </div>
            </main>
        );
    }
}

export default Main;