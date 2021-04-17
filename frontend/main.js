import 'core-js/stable';
import 'regenerator-runtime/runtime'
import Login from './validators/formLogin';



const login = new Login('.form-login')
const cadastro = new Login('.form-cadastro')
login.init()
cadastro.init()

//import './assets/css/style.css';
