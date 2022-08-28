import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getProducts, removeProduct } from 'services/product';
import MUIDataTable from 'mui-datatables';
import MainCard from 'ui-component/cards/MainCard';
import { Avatar, Button, Grid } from '@mui/material';
import { URL_DOMAIN } from 'core/constant';
import toRupiah from 'utils/toRupiah';
import useProfile from 'hooks/useProfile';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [profile] = useProfile();

    const getData = () => {
        const filter = profile.role === 'seller' ? `&userId=${profile.id}` : '';
        getProducts((result) => {
            const data = result.data.map((value) => {
                value = {
                    ...value,
                    image: null,
                    brandName: value.Brand.name
                };
                if (value.Upload != null) {
                    value.image = value.Upload.path;
                }
                return value;
            });
            setProducts(data);
            // console.log(data);
        }, filter);
    };

    useEffect(() => {
        getData();
    }, []);

    const hapus = (id) => {
        removeProduct(+id, getData);
    };

    const edit = (id) => {
        navigate(`/app/products/${id}`);
    };

    const columns = [
        {
            name: 'name',
            label: 'Nama Product',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'price',
            label: 'Harga',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => <>{toRupiah(value)}</>
            }
        },
        {
            name: 'image',
            label: 'Gambar',
            options: {
                filter: false,
                customBodyRender: (value) => <Avatar alt="Remy Sharp" src={`${URL_DOMAIN}${value}`} />
            }
        },
        {
            name: 'description',
            label: 'Deskripsi',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => `${value.substr(0, 50)}...`
            }
        },
        {
            name: `brandName`,
            label: 'Brand',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'id',
            label: 'Action',
            options: {
                display: profile.role === 'seller',
                filter: false,
                customBodyRender: (value) => (
                    <div>
                        <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => edit(value)}>
                            Edit
                        </Button>
                        <Button variant="outlined" onClick={() => hapus(value)} color="error">
                            Hapus
                        </Button>
                    </div>
                )
            }
        }
    ];

    const options = {
        filter: false,
        download: false,
        print: false,
        viewColumns: false,
        search: false,
        elevation: 0,
        selectableRows: 'none'
    };

    return (
        <MainCard title="List Products">
            <Grid container spacing={2}>
                <Grid item xs={12} justifyItems="center" alignItems="center">
                    <MUIDataTable data={products} columns={columns} options={options} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ProductsPage;
