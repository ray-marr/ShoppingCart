import React, { useState, Fragment } from "react";
import "./Cart.css";
import { offerFilters, discountCodes } from "./offers";
import { formatPrice } from "./cartHelper";

const Cart = (props) => {
  const { items } = props;
  const [voucherInput, setVoucherInput] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState(false);

  const getSubTotal = (items) => {
    let subTotal = 0;
    if (items) {
      Object.keys(items).forEach((key) => {
        let { price, quantity } = items[key];
        subTotal += price * quantity;
      });
    }
    return subTotal;
  };

  const getPriceSummary = (items, subTotal) => {
    let total = subTotal;
    let offerMatched = false;
    let offers = offerFilters
      .map((offerFilter) => offerFilter(items))
      .map((offer, index) => {
        total -= offer.discount;
        if (offer.discount > 0) {
          offerMatched = true;
        }
        const offerMessage = offer.message ? (
          <tr className="offer" key={index}>
            {offer.message}
          </tr>
        ) : null;
        return offerMessage;
      });

    if (voucher) {
      total -= voucher.amount;
      total < 0 && (total = 0);
    }
    return (
      <Fragment>
        {offerMatched
          ? offers
          : !voucher && (
              <td>
                <tr>(No offers available)</tr>
              </td>
            )}
        {voucher && (
          <tr className="offer">
            <td>Voucher ({voucher.code})</td>
            <td>-{formatPrice(voucher.amount)}</td>
          </tr>
        )}
        <tr>
          <td>
            <b>Total Price</b>
          </td>
          <td className="total">
            <b>{formatPrice(total)}</b>
          </td>
        </tr>
      </Fragment>
    );
  };

  const applyVoucher = () => {
    const discountCode = discountCodes[voucherInput.toLowerCase()];
    if (discountCode) {
      setVoucherError(false);
      setVoucher(discountCode);
    } else {
      setVoucherError(true);
      setVoucher(null);
    }
  };

  let subTotal = getSubTotal(items);
  let priceSummary = getPriceSummary(items, subTotal);

  return (
    <Fragment>
      <p className="cartHeader">Shopping Cart</p>
      <table>
        {Object.keys(items).map((key) => {
          const item = items[key];
          return (
            <tr>
              <td>
                {item.name} ({item.quantity})
              </td>
              <td>{formatPrice(item.price)}</td>
            </tr>
          );
        })}
        <tr>
          <td>Sub-Total</td>
          <td className="subtotal">{formatPrice(subTotal)}</td>
        </tr>
        {priceSummary}
      </table>
      <br />
      <div className="discount">
        Apply discount code:
        <input
          className="voucher"
          placeholder="Enter Voucher (SAVE50)"
          onChange={(e) => setVoucherInput(e.currentTarget.value)}
        />
        <button className="button" onClick={applyVoucher}>
          Apply
        </button>
        {voucherError && <div className="error">Invalid voucher.</div>}
        {voucher && <div className="success">Voucher applied.</div>}
      </div>
    </Fragment>
  );
};

export default Cart;
