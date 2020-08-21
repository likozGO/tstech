import imgEmpty from "./images/empty.svg";
import React from "react";

const EmptyRow = () => (
    <tr className="table-empty">
        <td colSpan={4}>
            TABLE IS EMPTY <br/>
            <img src={imgEmpty} alt="Table empty" className="image-empty"/>
        </td>
    </tr>
);

export default EmptyRow;