import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {Divider, Segment, Button} from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'



function CartSummary({products, handleCheckout, success}) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() =>{
    const  {cartTotal, stripeTotal} = calculateCartTotal
    (products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length ===0);
  }, [products]);
  return <>
  <Divider />
  <Segment clearing size="large">
    <strong>Sub-Total:</strong> KES {cartAmount} 
   <StripeCheckout
   name="Online Duka"
   amount={stripeAmount}
   image={products.length > 0 ? products[0].product.mediaUrl: "" }
   currency="KES"
   shippingAddress={true}
   billingAddress={true}
   zipCode={true}
   stripeKey="pk_test_2LHL7OWlLP89FEZjDXXyTV0N00uzBaenBE"
   token={handleCheckout}
   triggerEvent="onClick"
   >
   <Button icon="cart"
    disabled={isCartEmpty || success}
    color="grey"
    floated="right" 
    content="Checkout" />
   </StripeCheckout>
     </Segment>
  </>
}

export default CartSummary;
