import { FormControl, Button, Grid, Input, InputLabel, Select, MenuItem, TextField, Backdrop, CircularProgress } from '@mui/material';
import { IconDeviceFloppy } from '@tabler/icons';
import useProfile from 'hooks/useProfile';
import { useEffect, useState } from 'react';
import { getBrandBySeller, updateBrand } from 'services/brand';
import MainCard from 'ui-component/cards/MainCard';
import moment from 'moment';
import { URL_DOMAIN } from '../../core/constant';

const MyBrandPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [brandImg, setBrandImg] = useState([]);

    const [form, setForm] = useState({
        name: '',
        images: '',
        totalEmployees: '',
        startOperation: '',
        category: '',
        description: ''
    });

    const submitHandler = () => {
        updateBrand(form);
    };

    const [profile] = useProfile();

    useEffect(() => {
        getBrandBySeller((result) => {
            setBrandImg(result.data.Upload?.path ?? null);
            setLoading(false);
            setForm({
                name: result.data.name,
                images: result.data.Upload?.path ?? null,
                totalEmployees: result.data.totalEmployees,
                startOperation: result.data.startOperation,
                category: result.data.category,
                description: result.data.description,
                id: result.data.id
            });
        }, profile?.Brand?.id);
    }, []);

    console.log(form);

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <MainCard title="My Brand">
                <Grid container spacing={2}>
                    <Grid item xs={9} justifyItems="center" alignItems="center">
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        label="Name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        label="Total Employee"
                                        type="number"
                                        value={form.totalEmployees}
                                        onChange={(e) => setForm({ ...form, totalEmployees: e.target.value })}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date"
                                        label="Start Operation"
                                        type="date"
                                        value={moment(form.startOperation).format('YYYY-MM-DD')}
                                        name="startOperation"
                                        // sx={{ width: 220 }}
                                        onChange={(e) => setForm({ ...form, startOperation: e.target.value })}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Category"
                                        name="category"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    >
                                        <MenuItem value="Industri Makanan & Minuman">Industri Makanan & Minuman</MenuItem>
                                        <MenuItem value="Industri Ritel">Industri Ritel</MenuItem>
                                        <MenuItem value="Industri kecantikan dan kesehatan">Industri kecantikan dan kesehatan</MenuItem>
                                        <MenuItem value="Industri pendidikan non formal">Industri pendidikan non formal</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <span>Description</span>
                                <br />
                                <TextField
                                    style={{ marginTop: 8 }}
                                    id="standard-multiline-static"
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    multiline
                                    rows={5}
                                    value={form.description}
                                    placeholder="Masukkan deskripsi"
                                    variant="filled"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        Image
                                        <Button variant="contained" component="label" style={{ marginLeft: '15px' }}>
                                            Upload File
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={(e) => {
                                                    setForm({ ...form, images: e.target.files[0] });
                                                    setBrandImg(URL.createObjectURL(e.target.files[0]));
                                                }}
                                            />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={6}>
                                        Image Sekarang
                                        {form.images === brandImg ? (
                                            <img src={`${URL_DOMAIN}${form.images}`} alt={form.name} width="300" loading="lazy" />
                                        ) : (
                                            <img src={`${brandImg}`} alt={form.name} width="300" loading="lazy" />
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                onClick={() => submitHandler()}
                                sx={{ mt: 3, ml: 2 }}
                                color="success"
                                startIcon={<IconDeviceFloppy />}
                            >
                                Simpan
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default MyBrandPage;
