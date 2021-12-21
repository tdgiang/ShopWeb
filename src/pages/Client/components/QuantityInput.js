import React from "react";
import "../scss/QuantityInput.scss";

function QuantityInput({ quantity, onChangeQuantity }) {
    const handleOnChangeQuantity = (value) => {
        onChangeQuantity(value <= 0 ? 1 : value);
    };

    return (
        <div className="quantity-input">
            <button
                type="button"
                className="decrease-btn"
                onClick={() => handleOnChangeQuantity(quantity - 1)}
            >
                -
            </button>
            <input
                type="number"
                name="product-quantity"
                id="product-quantity"
                value={quantity}
                onChange={(e) => handleOnChangeQuantity(e.target.value)}
            />
            <button
                type="button"
                className="increase-btn"
                onClick={() => handleOnChangeQuantity(quantity + 1)}
            >
                +
            </button>
        </div>
    );
}

export default QuantityInput;
