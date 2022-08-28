import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '../core/constant';

const getBrandAll = async (cb) => {
    try {
        const brands = await axios({
            method: 'GET',
            url: `${URL_API}/brands?populate=Upload`
        });
        cb(brands.data);
    } catch (err) {
        console.log(err);
    }
};

const getBrandById = async (cb, id) => {
    try {
        const brands = await axios({
            method: 'GET',
            url: `${URL_API}/brands/${id}?populate=Upload`
        });
        return cb(brands.data);
    } catch (err) {
        return err;
    }
};

const getBrandBySeller = async (cb, id) => {
    try {
        const brands = await axios({
            method: 'GET',
            url: `${URL_API}/brands/${id}?populate=Upload`
        });
        return cb(brands.data);
    } catch (err) {
        return err;
    }
};

const updateBrand = async (values) => {
    try {
        const formData = new FormData();

        const { name, images, totalEmployees, startOperation, category, description, id } = values;

        const tempObj = {
            name,
            totalEmployees,
            startOperation,
            category,
            description
        };

        if (typeof images === 'object') {
            formData.append('image', images, images.name);
        }

        formData.append('data', JSON.stringify(tempObj));

        const brands = await axios({
            method: 'PUT',
            url: `${URL_API}/brands/${id}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        Swal.fire('Berhasil', 'Update Brand Berhasil!', 'success');

        return brands;
    } catch (err) {
        console.log(err);
        Swal.fire('Gagal', 'Update Brand Gagal!', 'error');
        return err;
    }
};

export { getBrandBySeller, getBrandAll, updateBrand, getBrandById };
