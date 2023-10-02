import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex=prevState.items.findIndex(item=>item.id===action.item.id)
    const existingCartItem=prevState.items[existingCartItemIndex];
    let updatedItems;
    if(existingCartItem){
      //if item is already in the cart  
      
      const updatedItem={...existingCartItem,amount:existingCartItem.amount+action.item.amount}
      updatedItems=[...prevState.items];
      updatedItems[existingCartItemIndex]=updatedItem;
    }
    else{
        updatedItems = prevState.items.concat(action.item);

    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if(action.type==='REMOVE'){
    const existingCartItemIndex= prevState.items.findIndex(item=> item.id===action.id);
    const existingCartItem=prevState.items[existingCartItemIndex];

    const updatedTotalAmount=prevState.totalAmount-existingCartItem.price;

    let updatedItems;
    if(existingCartItem.amount===1){
      updatedItems=prevState.items.filter(item=>item.id!==action.id)
    }
    else{
     const updatedItem= {...existingCartItem, amount:existingCartItem.amount-1};
     updatedItems=[...prevState.items]
     updatedItems[existingCartItemIndex]=updatedItem;
    }
    return{
      items:updatedItems ,
      totalAmount:updatedTotalAmount
    }


  }

  if(action.type==='CLEAR'){
    return{
      items:[] ,
      totalAmount:0
    }

  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };
  
  const clearCart=()=>{
    dispatchCartAction({type:'CLEAR'});
  }


  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clear:clearCart
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;