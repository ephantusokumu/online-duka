import {Header, Segment, Button, Icon} from 'semantic-ui-react'


function CartItemList() {
  const user = false;
  return (
    <Segment secondary color="yellow" inverted textAlign="center" placeholder>
      <Header icon>
      <Icon name="shopping basket"/>
      No Items in your cart. Add some?
      </Header>
      <div>
        {user ?(<Button color="blue">View My Products</Button>):
        (<Button color="grey">Login to shop</Button>)}
      </div>

    </Segment>
  )
}

export default CartItemList;
