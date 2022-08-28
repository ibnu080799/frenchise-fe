import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { AccountCircleOutlined, CalendarTodayOutlined, MoreHorizOutlined } from '@mui/icons-material';

// Third party
import moment from 'moment';
import PropTypes from 'prop-types';
import { IMG_DEFAULT, URL_DOMAIN } from 'core/constant';
import toRupiah from 'utils/toRupiah';

// Page
const CardItem = ({ data, handleDelete, handleEdit, handleClick }) => {
    const theme = useTheme();

    const { id, name, Upload, Items, category, slug } = data;

    console.log(data);

    return (
        <Card
            sx={{
                cursor: 'pointer',
                minHeight: 350,
                maxHeight: 400,
                '&:hover': {
                    boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.05)'
                }
            }}
            onClick={() => handleClick(slug)}
        >
            <CardContent>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="150"
                    width="200"
                    image={(Upload && `${URL_DOMAIN}${Upload.path}`) || IMG_DEFAULT}
                    sx={{ mb: 2, borderRadius: 2, objectFit: 'cover' }}
                />
                <Typography gutterBottom sx={{ fontSize: 18, fontWeight: 500 }} component="div">
                    {name}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 14, fontWeight: 500 }} component="div">
                    {category}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 14, fontWeight: 400, marginTop: 2 }}>
                    Mulai dari
                </Typography>

                {Items.length > 0 && (
                    <Typography gutterBottom sx={{ fontSize: 18, fontWeight: 500 }}>
                        {toRupiah(Items[0].price, { formal: false, spaceBeforeUnit: true, floatingPoint: 0 })}
                    </Typography>
                )}

                {Items.length === 0 && <Chip label="Paket Belum Tersedia" sx={{ borderRadius: 2, marginTop: 0.5 }} />}
            </CardContent>
        </Card>
    );
};

CardItem.propTypes = {
    data: PropTypes.object,
    handleDelete: PropTypes.func,
    handleClick: PropTypes.func,
    handleEdit: PropTypes.func
};
export default CardItem;
