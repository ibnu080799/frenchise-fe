import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '../core/constant';

const addProducts = async (values) => {
    try {
        const formData = new FormData();

        const { name, price, description, UserId, BrandId } = values;

        const tempObj = {
            name,
            price,
            description,
            UserId,
            BrandId
        };

        formData.append('image', values.image);

        formData.append('data', JSON.stringify(tempObj));

        const result = await axios({
            method: 'POST',
            url: `${URL_API}/items`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        Swal.fire('Berhasil', 'Add Produk Berhasil!', 'success');
        return result;
    } catch (err) {
        console.log(err);
        Swal.fire('Gagal', err.response.data.message, 'error');
        return err.response;
    }
};

const getProducts = async (cb, filter) => {
    try {
        const result = await axios({
            method: 'GET',
            url: `${URL_API}/items?populate=Brand,Upload,User${filter}`
        });
        cb(result.data);
    } catch (err) {
        console.log(err);
    }
};

const getProductById = async (cb, id) => {
    try {
        const result = await axios({
            method: 'GET',
            url: `${URL_API}/items/${id}?populate=Brand,Upload`
        });
        cb(result.data);
    } catch (err) {
        console.log(err);
    }
};

const updateProduct = async (values) => {
    try {
        const formData = new FormData();

        const { name, price, description, UserId, BrandId, id } = values;

        const tempObj = {
            name,
            price,
            description,
            UserId,
            BrandId
        };
        if (typeof images === 'object') {
            formData.append('image', values.image, values.image.name);
        }
        formData.append('data', JSON.stringify(tempObj));

        const result = await axios({
            method: 'PUT',
            url: `${URL_API}/items/${id}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        Swal.fire('Berhasil', 'Update Product Berhasil!', 'success');

        return result;
    } catch (err) {
        console.log(err);
        Swal.fire('Gagal', 'Update Product Gagal!', 'error');
        return err;
    }
};

const removeProduct = async (id, getProduct) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios({
                    method: 'DELETE',
                    url: `${URL_API}/items/${id}`
                });

                if (res.status === 200) {
                    await getProduct();
                }
                Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
            }
        });
    } catch (err) {
        console.log(err);
    }
};

export { addProducts, getProducts, getProductById, updateProduct, removeProduct };
