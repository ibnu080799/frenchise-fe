import { useEffect, useState } from 'react';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import MainCard from 'ui-component/cards/MainCard';
import { Avatar, Button, Grid } from '@mui/material';
import { URL_DOMAIN } from 'core/constant';
import { useNavigate } from 'react-router';
import { getOrderAll, getOrderBySeller } from 'services/order';
import useProfile from 'hooks/useProfile';
import toRupiah from 'utils/toRupiah';

const ListOrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [profile] = useProfile();
    const navigate = useNavigate();

    const getData = () => {
        console.log(profile);
        if (profile.role === 'seller') {
            getOrderBySeller((result) => {
                const data = result.data.map((value) => {
                    value = {
                        id: value.id,
                        image: null,
                        name: value.Item.name,
                        buyer: value.User.name,
                        email: value.User.email,
                        statusPayment: value.statusPayment,
                        price: value.Item.price,
                        brand: value.Item.Brand.name
                    };

                    return value;
                });
                setOrders(data);
            }, profile.id);
        } else {
            getOrderAll((result) => {
                const data = result.data.map((value) => {
                    value = {
                        image: null,
                        name: value.Item.name,
                        buyer: value.User.name,
                        email: value.User.email,
                        statusPayment: value.statusPayment,
                        price: value.Item.price,
                        brand: value.Item.Brand.name
                    };
                    if (value.Upload != null) {
                        value.image = value.Upload.path;
                    }
                    return value;
                });
                setOrders(data);
            });
        }
    };
    console.log(orders);
    useEffect(() => {
        getData();
    }, []);

    const edit = (id) => {
        console.log(id);
        navigate(`/app/orders/${id}`);
    };

    const columns = [
        {
            name: 'name',
            label: 'Nama Barang',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'buyer',
            label: 'Buyer',
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
                sort: true,
                customBodyRender: (value) => <>{toRupiah(value)}</>
            }
        },
        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'email',
            label: 'Email',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'statusPayment',
            label: 'Status Pembayaran',
            options: {
                filter: false
            }
        },
        {
            name: 'id',
            label: 'Action',
            options: {
                filter: false,
                display: profile.role === 'seller',
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => edit(value)}>
                            Edit
                        </Button>
                    </>
                )
            }
        }
    ];

    return (
        <MainCard title="List Order">
            <Grid container spacing={2}>
                <Grid item xs={12} justifyItems="center" alignItems="center">
                    <MUIDataTable
                        title="Order"
                        data={orders}
                        columns={columns}
                        options={{
                            filter: false,
                            download: false,
                            print: false,
                            viewColumns: false,
                            search: false,
                            elevation: 0,
                            selectableRows: 'none'
                        }}
                    />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ListOrderPage;
