// material-ui
import {
    Typography,
    Button,
    Grid,
    ImageList,
    ImageListItem,
    CardMedia,
    Stack,
    Skeleton,
    Avatar,
    Chip,
    Backdrop,
    CircularProgress
} from '@mui/material';
import { Box, fontFamily } from '@mui/system';
import axios from 'axios';
import { IMG_DEFAULT, URL_API, URL_DOMAIN } from 'core/constant';
import useProfile from 'hooks/useProfile';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { greetings } from 'utils/greetings';
import toRupiah from 'utils/toRupiah';
// import CardItem from './components/CardItem';

// ==============================|| SAMPLE PAGE ||============================== //

const UserOrdersPage = () => {
    const [profile] = useProfile();
    const location = useLocation();
    const navigate = useNavigate();

    const [dataOrders, setDataOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const get = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}/orders?populate=*&filters[User][id]=${profile.id}&paranoid=false`
            });

            if (result.status === 200) {
                const { data } = result.data;

                setDataOrders(data);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        get();
    }, []);

    const handleCancel = async (id) => {
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
                setIsLoading(true);
                const res = await axios({
                    method: 'DELETE',
                    url: `${URL_API}/orders/${id}`
                });

                if (res.status === 200) {
                    get();
                    Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
                } else {
                    setIsLoading(false);
                }
            }
        });
    };

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Typography variant="h1" gutterBottom sx={{ fontWeight: 500 }}>{`${greetings()}, ${profile?.name}`}</Typography>
            <Typography variant="h4" sx={{ fontWeight: 400, marginBottom: 4 }}>
                Ini adalah riwayat pendaftaran Kemitraan Kamu
            </Typography>
            <MUIDataTable
                data={dataOrders}
                options={{
                    filter: false,
                    download: false,
                    print: false,
                    viewColumns: false,
                    search: false,
                    elevation: 0,
                    selectableRows: false
                }}
                columns={[
                    {
                        name: 'id',
                        label: 'LOGO',
                        options: {
                            filter: false,
                            sort: false,
                            customBodyRender: (value) => {
                                const data = dataOrders.find((item) => item.id === value);
                                const { Brand } = data.Item;
                                const { Upload } = Brand;

                                return <Avatar variant="rounded" sx={{ height: 50, width: 50 }} src={`${URL_DOMAIN}${Upload?.path}`} />;
                            }
                        }
                    },
                    {
                        name: 'id',
                        label: 'KEMITRAAN',
                        options: {
                            filter: false,
                            sort: false,
                            customBodyRender: (value) => {
                                const data = dataOrders.find((item) => item.id === value);

                                const { name, price, Brand } = data.Item;

                                return (
                                    <>
                                        <Typography gutterBottom sx={{ fontWeight: 500 }}>
                                            {Brand.name}
                                        </Typography>
                                        <Typography gutterBottom>{name}</Typography>
                                        <Typography>{toRupiah(price)}</Typography>
                                    </>
                                );
                            }
                        }
                    },
                    {
                        name: 'createdAt',
                        label: 'DIBUAT',
                        options: {
                            filter: false,
                            sort: false,
                            customBodyRender: (value) => moment(value).format('LLL')
                        }
                    },
                    {
                        name: 'statusPayment',
                        label: 'PEMBAYARAN',
                        options: {
                            filter: false,
                            sort: false
                        }
                    },
                    {
                        name: 'id',
                        label: 'STATUS',
                        options: {
                            filter: false,
                            sort: false,
                            customBodyRender: (value) => {
                                const data = dataOrders.find((item) => item.id === value);
                                return (
                                    <>
                                        {data.deletedAt === null ? (
                                            <Chip
                                                label="Pengajuan diproses"
                                                color="success"
                                                sx={{ borderRadius: 2, marginTop: 0.5, bgcolor: '#E4F3EA', color: '#059659' }}
                                            />
                                        ) : (
                                            <Chip
                                                label="Pengajuan dibatalkan"
                                                color="error"
                                                sx={{ borderRadius: 2, marginTop: 0.5, bgcolor: '#FFD1D1', color: '#E00755' }}
                                            />
                                        )}
                                    </>
                                );
                            }
                        }
                    },
                    {
                        name: 'id',
                        label: 'TINDAKAN',
                        options: {
                            filter: false,
                            sort: false,
                            customBodyRender: (value) => {
                                const data = dataOrders.find((item) => item.id === value);

                                return (
                                    <>
                                        {data.deletedAt === null && (
                                            <Button variant="text" color="error" onClick={() => handleCancel(value)} sx={{ mr: 1 }}>
                                                Batalkan
                                            </Button>
                                        )}
                                    </>
                                );
                            }
                        }
                    }
                ]}
            />
        </>
    );
};

export default UserOrdersPage;
