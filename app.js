import express from 'express'
import connection from './database/db.js'
import user from './models/User.js'
import router from './routes/main.route.js'
import { constants } from './services/utils/constants.js'
import { response } from './services/utils/response.js'
import { not_found } from './controllers/main.controller.js'
const app = express()
const port = process.env.PORT

app.use(express.json())

await connection()

app.use('/api', router)

const {status} = constants.response

app.get('*', not_found)
// const first_user = new user({
//   name: 'Jhon',
//   nickname: 'jjatt',
//   cel:'3214567898',
//   password:'123'
// })

// try {
//   await first_user.save()
// } catch (error) {
//   console.log(error);
// }


app.listen(port, () => console.log(`Server on port: ${port}`))