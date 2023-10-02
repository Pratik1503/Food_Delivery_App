import React, {  useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import Loading from '../UI/Loading';
const AvailableMeals = () => {
   const [meals,setMeals]=useState([]);
   const [isLoading,setIsLoading]=useState(true);
   const [HttpError,setHttpError]=useState();
   useEffect(()=>{
     const fetchMeals=async()=>{
      setIsLoading(true);

     const response=await fetch('https://food-delivery-app-950b9-default-rtdb.firebaseio.com/meals.json');
      
      if(!response.ok){
        throw new Error('Something went wrong');
      }
        
        const responseData=await response.json();
        console.log(responseData);
        
        const loadedData=[];
        for(const key in responseData){
          loadedData.push({
            id:key,
            name:responseData[key].name,
            description:responseData[key].description,
            price:responseData[key].price
            })
          }
        setMeals(loadedData);
        setIsLoading(false);
        }
      
        // try{
        //   // since fetchMeals is async function it returns promise 
        //   fetchMeals();
        // }catch(err){
        //   return (<p>`${err}`</p>)
        // }
        fetchMeals().catch(error=>{
          setIsLoading(false);
          setHttpError(error.message);
        })

   },[])

   if(isLoading){
    return(
      <section>
            <Loading/>
      </section>
    )
   }

   if(HttpError){
    return(
      <section>
        <Card >
          <p className={classes.MealsError}>
            {HttpError}
          </p>
        </Card>
      </section>
    )
   }


    const mealsList=meals.map(meal=>(
      <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    ))
  return (
    <section className={classes.meals}>
       <Card>
       <ul>{mealsList}</ul>
       </Card>
    </section>
  )
}

export default AvailableMeals
