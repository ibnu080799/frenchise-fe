// material-ui
import { FormControl, Button, Grid, Input, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { IconDeviceFloppy } from '@tabler/icons';
import moment from 'moment';
import { URL_DOMAIN } from '../../core/constant';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getBrandById, updateBrand } from 'services/brand';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const EditBrandPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [brandImg, setBrandImg] = useState([]);

    const [form, setForm] = useState({
        name: '',
        images: '',
        totalEmployees: '',
        startOperation: '',
        category: '',
        description: ''
    });

    useEffect(() => {
        getBrandById((result) => {
            setBrands(result.data);
            setBrandImg(result.data.Upload.path ?? null);
            setForm({
                name: result.data.name,
                images: result.data.Upload.path ?? null,
                totalEmployees: result.data.totalEmployees,
                startOperation: result.data.startOperation,
                category: result.data.category,
                description: result.data.description,
                id: result.data.id
            });
        }, params.id);
    }, []);

    const submitHandler = () => {
        updateBrand(form).then(() => navigate('/app/brands'));
    };

    return (
        <MainCard title="Edit Brand">
            <Grid container spacing={2}>
                <Grid item xs={9} justifyItems="center" alignItems="center">
                    <Grid container spacing={2}>
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
                                    style={{ padding: 8 }}
                                    label="Start Operation"
                                    type="date"
                                    value={moment(form.startOperation).format('YYYY-MM-DD')}
                                    name="startOperation"
                                    sx={{ width: 220 }}
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
                        <Grid item xs={7}>
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
                                    <Button variant="contained" component="label" style={{ 'margin-left': '15px' }}>
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
                                        <img
                                            style={{ marginLeft: 15 }}
                                            src={`${URL_DOMAIN}${form.images}`}
                                            alt={form.name}
                                            width="300"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <img style={{ marginLeft: 15 }} src={`${brandImg}`} alt={form.name} width="300" loading="lazy" />
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
                        <Button variant="contained" onClick={() => navigate('/app/brands')} sx={{ mt: 3, ml: 2 }} color="primary">
                            Kembali
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default EditBrandPage;
