import React, { useRef, useState } from 'react'
import classes from './CheckOut.module.css'

const isEmpty=value=>value.trim()==='';
const hasFiveChars=value=>value.trim().length>=5;

const CheckOut = (props) => {

    const [formInputsValidity,setFormInputsValidity]=useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    })


    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalCodeInputRef=useRef();
    const cityInputRef=useRef();

    
    const confirmHandler=(event)=>{
        event.preventDefault();

        const enteredName=nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredPostalCode=postalCodeInputRef.current.value;
        const enteredCity=cityInputRef.current.value;

        const enteredNameIsValid=!isEmpty(enteredName);
        const enteredStreetIsValid=!isEmpty(enteredStreet);
        const enteredPostalCodeIsValid=hasFiveChars(enteredPostalCode);
        const enteredCityIsValid=!isEmpty(enteredCity);

        setFormInputsValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postalCode:enteredPostalCodeIsValid,
            city:enteredCityIsValid

        })

        const formIsValid=enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid

        if(!formIsValid){
            return ;
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postalCode:enteredPostalCode,
            city:enteredCity
        })

    }

    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
      }`;
      const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? '' : classes.invalid
      }`;
      const postalCodeControlClasses = `${classes.control} ${
        formInputsValidity.postalCode ? '' : classes.invalid
      }`;
      const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? '' : classes.invalid
      }`;

  return (
   <form className={classes.form} onSubmit={confirmHandler}>
    <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a Valid Name</p>}
    </div>
    <div className={streetControlClasses}>
        <label htmlFor="Street">Street</label>
        <input type="text" id='street' ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please Enter a Valid Street Name</p>}
    </div>
    <div className={postalCodeControlClasses}>
        <label htmlFor="postal code">Postal code</label>
        <input type="text" id='postal code' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 characters long)!</p>}
    </div>
    <div className={cityControlClasses}>
        <label htmlFor="City">City </label>
        <input type="text" id='City' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid City</p>}
    </div>
    
    <div className={classes.actions}>
    <button  type='button' onClick={props.onHideCart}>Close</button>
    <button  className={classes.submit}>Confirm</button>
    </div>

   </form>
  )
}

export default CheckOut
