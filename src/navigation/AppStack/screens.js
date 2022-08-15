import Login from '../../screens/Login';
import UserRegister from '../../screens/UserScreens/UserRegister';
import SellerRegister from '../../screens/SellerScreens/SellerRegister'
import ProductItem from '../../screens/ProductItem';
import Seller from '../../screens/Seller';
import AppDrawer from '../AppDrawer'
import SellerLogin from '../../screens/SellerScreens/SellerLogin';
import NewProduct from '../../screens/SellerScreens/NewProduct';
import EditProduct from '../../screens/SellerScreens/EditProduct';
import ForgotPassword from '../../screens/ForgotPassword';
import resetPassword from '../../screens/resetPassword'
import VerifyToken from '../../screens/VerifyToken';
import ResultSearch from '../../screens/ResultSearch';

export default [
    {
        name: 'Login',
        component: Login,
    },
    {
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        name: 'VerifyToken',
        component: VerifyToken
    },
    {
        name: 'resetPassword',
        component: resetPassword
    },
    {
        name: 'SellerLogin',
        component: SellerLogin
    },
    {
        name: 'Main',
        component: AppDrawer,
    },
    {
        name: 'UserRegister',
        component: UserRegister,
    },
    {
        name: 'SellerRegister',
        component: SellerRegister,
    },
    {
        name: 'ProductItem',
        component: ProductItem,
    },
    {
        name: 'NewProduct',
        component: NewProduct
    },
    {
        name: 'EditProduct',
        component: EditProduct
    },
    {
        name: 'Seller',
        component: Seller
    },
    {
        name: 'ResultSearch',
        component: ResultSearch,
    },
]