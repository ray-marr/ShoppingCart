import './ShoppingApp.css';
import inventory from './inventory';
import Cart from './Cart';
import React from 'react';
import Item from './Item';
import Grid from '@material-ui/core/Grid';

class ShoppingApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: {}
    };
  }

  getQuantity = item => {
    const cartItem = this.state.cart[item.sku];
    return cartItem ? cartItem.quantity : 0;
  }

  setQuantity = (item, quantity) => {
    if (quantity === 0) {
      this.deleteItemFromCart(item);
      return;
    }
    this.setState({
      cart: {
        ...this.state.cart,
        [item.sku] : {...item, quantity}
      }
    });
  }

  deleteItemFromCart = item => {
    let newCart = {...this.state.cart};
    delete newCart[item.sku];
    this.setState({cart: newCart});
  }

  render() {
    const items = <Grid container className="itemsWrapper" spacing={2}>
      {
        inventory.map(item => <Item
                                key={item.sku} 
                                item={item} 
                                quantity={this.getQuantity(item)} 
                                setQuantity={this.setQuantity}
                                deleteItemFromCart={this.deleteItemFromCart}
                                />)
      }
    </Grid>;

    return (
      <div className="shoppingApp">
        <div className="leftSide">
          {items}
        </div>
        <div className="rightSide">
          <Cart items={this.state.cart}/>
        </div>
      </div>
    );
  }
}

export default ShoppingApp;