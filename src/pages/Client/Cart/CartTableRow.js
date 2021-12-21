import React from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "utils";
import QuantityInput from "../components/QuantityInput";
import { PRODUCTS_PATH } from "constant/route";

function CartTableRow({ data, quantity, changeQuantity, deleteCart }) {
    const handleChangeQuantity = (quantity) => {
        changeQuantity(data.id, quantity);
    };

    const handleOnDelete = (productId) => {
        deleteCart(productId);
    };

    return (
        <tr key={data.id}>
            <td className="product-info">
                <div>
                    <img src={data?.productImage} alt={data.productName} />
                    <Link to={`${PRODUCTS_PATH}/${data.id}`} className="info-title">
                        {data.productName}
                    </Link>
                </div>
            </td>
            <td className="product-price">
                <span>{formatMoney(data.price)} đ</span>
            </td>
            <td className="product-quantity">
                <div>
                    <QuantityInput
                        quantity={quantity}
                        onChangeQuantity={handleChangeQuantity}
                    ></QuantityInput>
                </div>
            </td>
            <td className="product-total-price">
                <span>{formatMoney(data.price * quantity)} đ</span>
            </td>
            <td className="product-delete">
                <i class="bx bxs-trash" onClick={(e) => handleOnDelete(data.id)}></i>
            </td>
        </tr>
    );
}

export default CartTableRow;
