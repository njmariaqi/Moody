//require('dotenv').config()
//import 'dotenv/config'
//console.log(process.env)
// import {createClient} from 'pexels';
// const pexelsClient = createClient(process.env.PEXELS_PASS)
// console.log('pass -->', process.env.PEXELS_PASS)


const query = 'nature'

const getImg = async() => {
  try {
    let res = await axios.get('https://api.pexels.com/v1/photos/189349', {
      headers: {'Authorization': '563492ad6f917000010000015cf5ff7c412542d980a62beb2d41dc62'}
    })
    console.log(res.data)
  } catch(err) {
    console.error(err)
  }
}

getImg();
