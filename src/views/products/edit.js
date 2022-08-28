/* eslint-disable prettier/prettier */
// material-ui
import { Box, Grid, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { getProductById, updateProduct } from 'services/product';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import useProfile from 'hooks/useProfile';
import { URL_DOMAIN } from '../../core/constant';

// ==============================|| SAMPLE PAGE ||============================== //

const EditProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [productImg, setProductImg] = useState([]);

  const [profile] = useProfile();

  const [form, setForm] = useState({
    name: '',
    price: 0,
    description: '',
    UserId: profile.id,
    BrandId: profile.Brand.id,
    images: ''
  });

  useEffect(() => {
    getProductById((result) => {
      setProductImg(result.data.Upload.path ?? null);
      setForm({
        name: result.data.name,
        images: result.data.Upload.path ?? null,
        price: result.data.price,
        BrandId: result.data.BrandId,
        description: result.data.description,
        id: result.data.id
      });
    }, params.id);
  }, []);

  const submitHandler = () => {
    updateProduct(form, params.id).then(() => navigate('/app/products'));
  };

  return (
    <MainCard title="Edit Product">
      <Box>
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={7}>
            <span>Nama Produk</span>
            <TextField
              fullWidth
              required
              id="outlined-required"
              size="small"
              value={form.name}
              style={{ 'margin-top': '8px' }}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={7}>
            <span>Harga</span>
            <TextField
              fullWidth
              required
              id="outlined-required"
              size="small"
              value={form.price}
              style={{ 'margin-top': '8px' }}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </Grid>
          <Grid item xs={7}>
            <span item xs={4}>
              Image
            </span>
            <Button variant="contained" component="label" style={{ 'margin-left': '15px' }}>
              Upload File
              <input type="file" hidden onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
            </Button>
          </Grid>
          <Grid item xs={7}>
            <span item xs={4}>
              Image Sekarang
            </span>
            {form.images === productImg ? (
              <img
                style={{ marginLeft: 15 }}
                src={`${URL_DOMAIN}${form.images}`}
                alt={form.name}
                width="300"
                loading="lazy"
              />
            ) : (
              <img style={{ marginLeft: 15 }} src={`${productImg}`} alt={form.name} width="300" loading="lazy" />
            )}
          </Grid>
          <Grid item xs={7}>
            <span>Deskripsi</span>
            <br />
            <TextField
              style={{ marginTop: 8 }}
              id="standard-multiline-static"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              multiline
              rows={5}
              placeholder="Masukkan deskripsi"
              variant="filled"
              value={form.description}
              fullWidth
            />
          </Grid>
          <Grid item xs={7}>
            <Button variant="contained" color="success" onClick={() => submitHandler()}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default EditProductPage;
