import {Divider, Segment, Button} from 'semantic-ui-react'

function CartSummary() {
  return <>
  <Divider />
  <Segment clearing size="large">
    <strong>Sub-Total:</strong> Ksh 0.00 
    <Button icon="cart"
    color="grey"
    floated="right"
    content="Checkout" />
     </Segment>
  </>
}

export default CartSummary;
