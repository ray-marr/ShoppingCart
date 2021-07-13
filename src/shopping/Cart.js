import React, { useState } from "react";
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
        return <div key={index}>{offer.message}</div>;
      });

    if (voucher) {
      total -= voucher.amount;
      total < 0 && (total = 0);
    }
    return (
      <div>
        {offerMatched ? offers : !voucher && <div>(No offers available)</div>}
        {voucher && (
          <div>
            Voucher ({voucher.code}): -${formatPrice(voucher.amount)}
          </div>
        )}
        <div>
          <b>Total Price: {formatPrice(total)}</b>
        </div>
      </div>
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
    <>
      <p className="cartHeader">Shopping Cart</p>
      <div>
        Sub-Total: {formatPrice(subTotal)}
        {priceSummary}
      </div>
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
    </>
  );
};

export default Cart;
