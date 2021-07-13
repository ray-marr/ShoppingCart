import "./Item.css";
import { Grid, Paper } from "@material-ui/core";
import { Add, Remove, Delete } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const Item = (props) => {
  const { item, quantity, setQuantity, deleteItemFromCart } = props;

  return (
    <Grid key={item.sku} item>
      <Paper className="item">
        <div>
          <div>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>
              {item.price.toLocaleString("en-gb", {
                style: "currency",
                currency: "GBP"
              })}
            </p>
            <IconButton
              disabled={!quantity}
              onClick={() => setQuantity(item, quantity - 1)}
            >
              <Remove />
            </IconButton>
            {quantity}
            <IconButton
              disabled={quantity >= 99}
              onClick={() => setQuantity(item, quantity + 1)}
            >
              <Add />
            </IconButton>
          </div>
          <div>
            <IconButton
              disabled={!quantity}
              onClick={() => deleteItemFromCart(item)}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default Item;
