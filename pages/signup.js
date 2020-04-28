import React from 'react'
import {Button, Message, Form, Icon, Segment} from 'semantic-ui-react'
import Link from 'next/link';
import catchErrors from '../utils/catchErrors'

const INITIAL_USER = {
  name: "",
  email: "", 
  password:""
}

function Signup() {
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
  icon="settings"
  header="Get Started"
  content="Register Here"
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
      icon="user"
      iconPosition="left"
      label="Name"
      placeholder="Name"
      name="name"
      value={user.name}
      onChange={handleChange}/>
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
      icon="signup"
      type="submit"
      color="orange"
      content="Register"/>
    </Segment>
  </Form>
  <Message attached="botton" warning>
    <Icon name="help" />
    Already registered? {" "}
    <Link href="/login">
      <a>Login Here</a>
    </Link>{" "} instead.

  </Message>


  
   
  </>
  )
}

export default Signup;
