import { Fragment } from "react";
import { SKU } from "./inventory";
import { formatPrice } from "./cartHelper";

export const offerFilters = [
  //10% off apples
  (items) => {
    let message = null;
    let discount = 0;

    let itemInBasket = items[SKU.apples];
    if (itemInBasket) {
      const { quantity, price } = itemInBasket;
      discount = price * quantity * 0.1;
      message = (
        <Fragment>
          <td>Apples 10% off ({quantity})</td>
          <td>-{formatPrice(discount)}</td>
        </Fragment>
      );
    }
    return {
      message,
      discount
    };
  },
  //For every 2 tins of soup, get 50% off a bread
  (items) => {
    let message = null;
    let discount = 0;

    let soupInBasket = items[SKU.soup];
    if (soupInBasket) {
      let numPairsOfSoup = Math.floor(soupInBasket.quantity / 2);
      let breadInBasket = items[SKU.bread];
      if (breadInBasket && numPairsOfSoup > 0) {
        let numberOfDiscounts = Math.min(
          numPairsOfSoup,
          breadInBasket.quantity
        );
        discount = breadInBasket.price * numberOfDiscounts * 0.5;
        message = (
          <Fragment>
            <td>Bread 50% Off ({numberOfDiscounts})</td>
            <td>-{formatPrice(discount)}</td>
          </Fragment>
        );
      }
    }
    return {
      message,
      discount
    };
  }
];

export const discountCodes = {
  save50: {
    code: "SAVE50",
    amount: 0.5
  }
};
