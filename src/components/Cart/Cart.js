import React, {  useContext, useState } from 'react'
import Modal from '../UI/Modal'
import CheckOut from './CheckOut'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Loading from '../UI/Loading'
import classes from './Cart.module.css'

const Cart = (props) => {

  const [isCheckOut,setIsCheckOut]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);

  const cartCtx = useContext(CartContext);
  
  const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems=cartCtx.items.length>0;

  const addCartHandler=item=>{
    cartCtx.addItem({...item,amount:1});  
  }

  const removeCartHandler=id=>{
    cartCtx.removeItem(id)
  }

  const orderHandler=()=>{
    setIsCheckOut(true);
  }
  
  const submitHandler=(userData)=>{
    setIsSubmitting(true);
    fetch('https://food-delivery-app-950b9-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        orderedItems:cartCtx.items
      })
    }).then(() => {
      // Reset totalAmount and clear cartCtx.items when the submission is successful
      cartCtx.clear(); // You need to define a clearCart method in your CartContext
  
      // Update the local state
      setIsSubmitting(false);
      setDidSubmit(true);
    })
    
    setIsSubmitting(false);
    setDidSubmit(true);
    console.log(cartCtx);
  }

  const cartItems = (<ul className={classes['cart-items']}>{cartCtx.items.map((item) => (
    <CartItem key={item.id} item={item} onAdd={addCartHandler.bind(null,item)} onRemove={removeCartHandler.bind(null,item.id) } />
  ))}</ul>)

  const ModalActions=
  <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>

  const cartModalContent=<React.Fragment>
    {cartItems}
      <div className={classes.total} >
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      { isCheckOut  &&  <CheckOut onConfirm={submitHandler} />}
     {!isCheckOut && ModalActions}
  </React.Fragment>

  const submitModalContent=
  <React.Fragment>
    <p>Successfully sent the Data</p>
    <div className={classes.actions}>
     <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
    </div>  
  </React.Fragment>

  return (
    <Modal onHideCart={props.onHideCart} >
      {!didSubmit  && !isSubmitting && cartModalContent}
      {didSubmit && !isSubmitting && submitModalContent}
      {isSubmitting && <Loading/>}
    </Modal>
  
  )
}

export default Cart
