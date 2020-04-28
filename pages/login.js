import React from 'react'
import {Button, Message, Form, Icon, Segment} from 'semantic-ui-react'
import Link from 'next/link';
import catchErrors from '../utils/catchErrors'

const INITIAL_USER = {
  email: "", 
  password:""
}

function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  //disable button
  React.useEffect(()=>{
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user])

  function handleChange(event) {
    const {name, value} = event.target
    setUser(prevState =>({...prevState, [name]: value}))
  }
 async function handleSubmit(event){
   event.preventDefault()
   try {
     setLoading(true)
     setError('')
     console.log(user)
   } catch (error) {
     catchErrors(error, setError)
     
   }finally{
    setLoading(false)

   }
 }

  return (<>
  <Message 
  attached
  icon="privacy"
  header="Welcome"
  content="Login here using Email and Password"
  color="grey"
  />
  <Form error={Boolean(error)} loading ={loading} onSubmit={handleSubmit}> 
    <Message 
    error
    header="Oops!"
    content={error}
    />
    <Segment>
       <Form.Input 
      fluid
      icon="envelope"
      iconPosition="left"
      label="Email"
      placeholder="Email"
      type="email"
      name="email"
      value={user.email}
      onChange={handleChange}/>
       <Form.Input 
      fluid
      icon="lock"
      iconPosition="left"
      label="Password"
      placeholder="Password"
      name="password"
      type="password"
      value={user.password}
      onChange={handleChange}/>
      <Button 
      disabled={disabled || loading }
      icon="sign in"
      type="submit"
      color="orange"
      content="Log me in"/>
    </Segment>
  </Form>
  <Message attached="botton" warning>
    <Icon name="help" />
    No account?  {" "}
    <Link href="/signup">
      <a>Click me to register</a>
    </Link>{" "} instead.

  </Message>


  
   
  </>
  )
}

export default Login;
