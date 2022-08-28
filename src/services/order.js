import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '../core/constant';

const getOrderAll = async (cb) => {
    try {
        const orders = await axios({
            method: 'GET',
            url: `${URL_API}/orders?populate=Item.Brand,User`
        });
        cb(orders.data);
    } catch (err) {
        console.log(err);
    }
};

const getOrderBySeller = async (cb, userID) => {
    try {
        const orders = await axios({
            method: 'GET',
            url: `${URL_API}/orders?populate=Item.Brand,User&filters[Item][UserId]=${userID}`
        });
        cb(orders.data);
    } catch (err) {
        console.log(err);
    }
};

const getOrderById = async (cb, id) => {
    try {
        const users = await axios({
            method: 'GET',
            url: `${URL_API}/orders/${id}?populate=Item.Brand,User`
        });
        cb(users.data);
    } catch (err) {
        console.log(err);
    }
};

const updateOrderById = async (value, id) => {
    try {
        const formData = {
            statusPayment: value.statusPayment
        };
        const users = await axios({
            method: 'PUT',
            url: `${URL_API}/orders/${id}`,
            data: formData
        });
        console.log(users);
    } catch (err) {
        console.log(err);
    }
};

export { getOrderAll, getOrderById, getOrderBySeller, updateOrderById };
