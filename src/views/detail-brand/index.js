// material-ui
import { LoadingButton } from '@mui/lab';
import {
    Typography,
    Button,
    Grid,
    CircularProgress,
    Skeleton,
    Avatar,
    Chip,
    Card,
    CardContent,
    CardHeader,
    ListItem,
    ListItemAvatar,
    ListItemText,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Alert
} from '@mui/material';
import { Box, fontFamily } from '@mui/system';
import { IconCalendar, IconTag, IconUsers } from '@tabler/icons';
import axios from 'axios';
import { IMG_DEFAULT, URL_API, URL_DOMAIN } from 'core/constant';
import useProfile from 'hooks/useProfile';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toRupiah from 'utils/toRupiah';

// ==============================|| SAMPLE PAGE ||============================== //

const DetailBrandPage = () => {
    const [profile] = useProfile();

    const params = useParams();

    const [isFound, setIsFound] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [dataBrand, setDataBrand] = useState(null);

    const [form, setForm] = useState({
        statusPayment: null,
        userId: profile?.id,
        price: 0,
        itemId: null
    });

    const get = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}/brands/slug/${params.slug}?populate=Item.Upload,Upload,User`
            });

            if (result.status === 200) {
                const { data } = result.data;

                if (data.Items.length > 0) {
                    data.Items.sort((a, b) => a.price - b.price);
                }

                setDataBrand(data);
                setIsLoading(false);
                // setIsFound(true);
            }
        } catch (error) {
            setIsFound(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        get();
    }, []);

    const handleChangePackage = (id) => {
        const item = dataBrand.Items.find((i) => i.id === id);
        console.log(item);
        setForm({
            ...form,
            price: item.price,
            itemId: item.id
        });
    };

    const createOrder = async () => {
        setIsSubmitted(true);
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL_API}/orders`,
                data: form
            });

            if (result.status === 200) {
                Swal.fire('Berhasil', 'Permintaan Berhasil Dilakukan', 'success');
                setIsSubmitted(false);
                // setIsFound(true);
            }
        } catch (error) {
            setIsSubmitted(false);
            Swal.fire('Gagal', 'Permintaan Gagal!', 'error');
        }
    };

    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangular" animation="wave" height={200} sx={{ backgroundColor: '#F2F4F7', borderRadius: 2 }} />
            ) : (
                <Box
                    borderRadius={2}
                    minHeight={200}
                    padding={3}
                    sx={{
                        backgroundColor: '#F2F4F7'
                    }}
                >
                    <Grid container p={1} spacing={5}>
                        <Grid item container alignItems="center" spacing={4}>
                            <Grid item>
                                <Avatar
                                    src={(dataBrand?.Upload?.path && `${URL_DOMAIN}${dataBrand?.Upload?.path}`) || IMG_DEFAULT}
                                    variant="rounded"
                                    sx={{ height: 150, width: 150 }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom sx={{ fontSize: 20, fontWeight: 400 }}>
                                    {dataBrand?.name}
                                </Typography>

                                {dataBrand?.Items.length > 0 && (
                                    <Typography sx={{ fontSize: 32, fontWeight: 500 }}>
                                        {toRupiah(dataBrand.Items[0].price, { formal: false, spaceBeforeUnit: true, floatingPoint: 0 })}
                                    </Typography>
                                )}

                                {dataBrand?.Items.length === 0 && (
                                    <Chip label="Paket Belum Tersedia" sx={{ borderRadius: 2, marginTop: 0.5 }} />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            )}

            <Grid container marginTop={1} spacing={5}>
                <Grid item lg={8}>
                    <Typography variant="h3" marginBottom={3}>
                        Profil Brand
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                        {dataBrand?.description}
                    </Typography>

                    <Grid container marginTop={3} columnSpacing={4} sx={{ p: 0 }} direction="column">
                        <Grid item>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: 'secondary.main', color: 'white' }}>
                                        <IconCalendar />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Mulai Beroperasi" secondary={moment(dataBrand?.startOperation).format('LL')} />
                            </ListItem>
                        </Grid>
                        <Grid item>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: 'secondary.main', color: 'white' }}>
                                        <IconUsers />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Jumlah Karyawan" secondary={dataBrand?.totalEmployees} />
                            </ListItem>
                        </Grid>
                        <Grid item>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: 'secondary.main', color: 'white' }}>
                                        <IconTag />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Kategori" secondary={dataBrand?.category} />
                            </ListItem>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4}>
                    <Card sx={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.05)' }}>
                        <CardHeader title="Pilih Paket Kemitraan" />
                        <CardContent sx={{ pt: 0 }}>
                            {profile === null && (
                                <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                                    <Button sx={{ marginRight: 3 }} variant="outlined" fullWidth>
                                        Masuk untuk memilih paket
                                    </Button>
                                </Link>
                            )}
                            {profile !== null && (
                                <>
                                    {dataBrand?.Items.length > 0 ? (
                                        <>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={form.category}
                                                    onChange={(e) => handleChangePackage(e.target.value)}
                                                >
                                                    {dataBrand.Items.map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <Typography sx={{ fontSize: 20, fontWeight: 500 }} marginTop={2}>
                                                {toRupiah(form.price, { formal: false, spaceBeforeUnit: true, floatingPoint: 0 })}
                                            </Typography>
                                        </>
                                    ) : (
                                        <Alert severity="info">Paket Belum tersedia</Alert>
                                    )}

                                    <FormControl fullWidth sx={{ marginTop: 4 }}>
                                        <InputLabel id="demo-simple-select-label">Pembayaran</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Pembayaran"
                                            name="statusPayment"
                                            value={form.statusPayment}
                                            onChange={(e) => setForm({ ...form, statusPayment: e.target.value })}
                                        >
                                            <MenuItem value="dp">DP</MenuItem>
                                            <MenuItem value="cicilan">Cicilan</MenuItem>
                                            <MenuItem value="cash">Cash</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {profile.role === 'buyer' && (
                                        <LoadingButton
                                            sx={{ marginTop: 5 }}
                                            variant="contained"
                                            disabled={form.itemId === null || form.statusPayment === null}
                                            disableElevation
                                            color="secondary"
                                            fullWidth
                                            loading={isSubmitted}
                                            onClick={createOrder}
                                        >
                                            Daftar Kemitraan
                                        </LoadingButton>
                                    )}
                                </>
                            )}

                            {/* <LoadingBu */}
                        </CardContent>
                    </Card>
                    {/* <Typography variant="body1">{dataBrand?.description}</Typography> */}
                </Grid>
            </Grid>

            <Grid container marginTop={4}>
                <Grid item lg={8}>
                    <Typography variant="h3" marginBottom={3}>
                        Daftar Paket
                    </Typography>

                    {dataBrand?.Items.length > 0 ? (
                        dataBrand?.Items.map((item) => (
                            <Card sx={{ marginBottom: 3 }}>
                                <CardContent>
                                    <Grid container columnSpacing={1}>
                                        <Grid item lg={2}>
                                            <Avatar
                                                src={`${URL_DOMAIN}${item.Upload?.path}` || IMG_DEFAULT}
                                                variant="rounded"
                                                sx={{ height: 100, width: 100 }}
                                            />
                                        </Grid>
                                        <Grid item lg={10}>
                                            <Typography sx={{ fontSize: 20, fontWeight: 400 }} marginBottom={2}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="h3" marginBottom={3}>
                                                {toRupiah(item.price, { formal: false, spaceBeforeUnit: true, floatingPoint: 0 })}
                                            </Typography>
                                            <Typography marginBottom={2}>{item.description}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>Belum tersedia</Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default DetailBrandPage;
