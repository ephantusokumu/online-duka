const baseUrl = 
process.env.NODE_ENV === "production"
? 'https: //dplu.com.sh' :
'http://localhost:3000'

export default baseUrl;