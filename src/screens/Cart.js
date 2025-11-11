/* global Razorpay */
import React from 'react'
import trash from '../trash_can_delete_remove_icon.png'
import { useCart,useDispatchCart } from '../components/ContextReducer'
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
      return (
        <div>
          <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
        </div>
      )
    }
 
 
  const handleCheckout = async()=>{
      let userEmail= localStorage.getItem("userEmail");
     // let orderDate = new Date().toDateString(); // Define and initialize orderDate variable

      let response = await fetch("http://localhost:5000/api/orderData",{
           method:"POST",
           headers:{
              'Content-Type':"application/json"
           },
           body:JSON.stringify({
            order_data:data, 
            email:userEmail,
            //order_date: orderDate
            order_date:new Date().toDateString()
            })
      });
      //console.log("order response",response)
      if(response.status === 200){
          dispatch({type:"DROP"})
      }

   //anything beloww this is payment related







            
  }
  let totalPrice = data.reduce((total,food)=> total + food.price, 0)
 
 

    const amount = totalPrice;
    console.log(amount)
    const currency = "INR";
    const receiptId = "qwsaq1";
  
    const paymentHandler = async () => {
      let response = await fetch("http://localhost:8000/api/order", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const order = await response.json();
      console.log(order);
     ////
     var options = {
      "key": "rzp_test_Xvtot1QHJYEMaY", // Enter the Key ID generated from the Dashboard
       amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "FOODAPP", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com", 
          "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });
      rzp1.open();
     // e.preventDefault();
  
    }
  
 
 
  ///////////////////
  //  let totalPrice = data.reduce((total,food)=> total + food.price, 0)
    return (
    <div> 
          <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className=' text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col' ></th>


                    </tr>
                </thead>
                <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><img    style={{width: "32px", height:" 32px"}} src={trash} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
            </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button  className='btn bg-success mt-5' onClick={() => { handleCheckout(); paymentHandler();}}>Check Out</button>
                </div>
          </div>
    </div>
  )
}
