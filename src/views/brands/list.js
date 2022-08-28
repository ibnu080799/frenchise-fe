import { useEffect, useState } from 'react';
import moment from 'moment';
import { getBrandAll } from 'services/brand';
import MUIDataTable from 'mui-datatables';
import MainCard from 'ui-component/cards/MainCard';
import { Avatar, Button, Grid } from '@mui/material';
import { URL_DOMAIN } from 'core/constant';
import { useNavigate } from 'react-router';

const ListBrand = () => {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();
    const getData = () => {
        getBrandAll((result) => {
            const data = result.data.map((value) => {
                value = {
                    ...value,
                    image: null
                };
                if (value.Upload != null) {
                    value.image = value.Upload.path;
                }
                return value;
            });
            setBrands(data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const edit = (id) => {
        console.log(id);
        navigate(`/app/brands/${id}`);
    };

    const columns = [
        {
            name: 'name',
            label: 'Nama Brand',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'startOperation',
            label: 'Didirikan Tgl',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => moment(value).format('DD MMMM YYYY')
            }
        },
        {
            name: 'image',
            label: 'Gambar',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => <Avatar alt="Remy Sharp" src={`${URL_DOMAIN}${value}`} />
            }
        },
        {
            name: 'totalEmployees',
            label: 'Total Karyawan',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'id',
            label: 'Action',
            options: {
                filter: false,
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
        <MainCard title="List Brands">
            <Grid container spacing={2}>
                <Grid item xs={12} justifyItems="center" alignItems="center">
                    <MUIDataTable
                        data={brands}
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

export default ListBrand;
