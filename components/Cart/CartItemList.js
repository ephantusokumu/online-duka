import {Header, Segment, Button, Icon, Item} from 'semantic-ui-react'
import {useRouter} from 'next/router'


function CartItemList({products, user}) {
  const router = useRouter()

  function mapCartProductsToItems(products){
    return products.map(p =>({
      childKey: p.product._id,
      header: (
        <Item.Header as="a" onClick={() => router.push(`
        /product?_id = ${p.product._id}` )}>
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x Ksh${p.product.price}`,
      fluid: "true",
      extra: (
        <Button 
        basic
        icon="remove"
        floated="left"
        onClick={() => console.log(p.product._id)}
        />
      )
    }))
  }

if(products.length === 0){
  return (
    <Segment secondary color="yellow" inverted textAlign="center" placeholder>
      <Header icon>
      <Icon name="shopping basket"/>
      No Items in your cart. Add some?
      </Header>
      <div>
        {user ?(<Button color="blue" onClick={() =>router.push('/')}>View My Products</Button>):
        (<Button color="grey"onClick={() =>router.push('/login')}>Login to shop</Button>)}
      </div>

    </Segment>
  );
}
return <Item.Group divided items={mapCartProductsToItems(products)} />
}

export default CartItemList;
