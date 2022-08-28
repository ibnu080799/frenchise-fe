// material-ui
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { getOrderById, updateOrderById } from 'services/order';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const EditOrderPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState({});

    const [form, setForm] = useState({
        statusPayment: ''
    });

    useEffect(() => {
        getOrderById((result) => {
            setOrder({ ...result.data });
            setForm({ statusPayment: result.data.statusPayment });
        }, params.id);
    }, []);

    const submitHandler = () => {
        updateOrderById(form, params.id).then(() => navigate('/app/orders'));
    };

    console.log(form);

    return (
        <MainCard title="Edit Orders">
            {order.Item != null ? (
                <>
                    {' '}
                    <Grid container spacing={2}>
                        <Grid item xs={7} justifyItems="center" alignItems="center">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <span>Nama Brand</span>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            size="small"
                                            value={order.Item.Brand.name}
                                            style={{ 'margin-top': '8px' }}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>Nama Produk</span>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            size="small"
                                            value={order.Item.name}
                                            style={{ 'margin-top': '8px' }}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>Harga</span>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            size="small"
                                            value={order.Item.price}
                                            style={{ 'margin-top': '8px' }}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>Nama Pembeli</span>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            size="small"
                                            value={order.User.name}
                                            style={{ 'margin-top': '8px' }}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>Email Pembeli</span>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            size="small"
                                            value={order.User.email}
                                            style={{ 'margin-top': '8px' }}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <span>Status Payment</span>
                                    <FormControl fullWidth>
                                        <FormControl fullWidth>
                                            <Select
                                                id="demo-simple-select"
                                                name="statusPayment"
                                                value={form.statusPayment}
                                                onChange={(e) => setForm({ ...form, statusPayment: e.target.value })}
                                            >
                                                <MenuItem value="dp">DP</MenuItem>
                                                <MenuItem value="cicilan">Cicilan</MenuItem>
                                                <MenuItem value="cash">Cash</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained" sx={{ mr: 1 }} color="success" onClick={() => submitHandler()}>
                                        Edit Orders
                                    </Button>
                                    <Button variant="contained" onClick={() => navigate('/app/orders')}>
                                        Kembali
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : (
                'Loading...'
            )}
        </MainCard>
    );
};

export default EditOrderPage;
