import React from "react";

const Row = ({RowIndex, RowItem, initArray, newArray, changeRow, deleteNewRow, sortMethod}) => {
    const checkIndexName = RowItem ? RowItem.name : '';
    const [prevVal, setPrevVal] = React.useState('')
    const handleChange = (e) => {
        changeRow(prevVal, e.target.value, RowIndex)
        setPrevVal(e.target.value)
    }

    return (
        <tr className={RowIndex}>
            <td>{RowIndex}</td>
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

export default Row;