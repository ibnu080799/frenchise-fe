// material-ui
import { Button, FormControl, Grid, Input, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { getUserById, updateUserById } from 'services/user';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const EditUserPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        getUserById((result) => {
            setForm({ ...result.data });
        }, params.id);
    }, []);

    const submitHandler = () => {
        updateUserById(form, params.id).then(() => navigate('/app/users'));
    };

    return (
        <MainCard title="Edit User">
            <Grid container spacing={2}>
                <Grid item xs={7} justifyItems="center" alignItems="center">
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <FormControl fullWidth>
                                <InputLabel>Nama</InputLabel>
                                <Input
                                    aria-describedby="my-helper-text"
                                    value={form.name}
                                    required
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl fullWidth>
                                <InputLabel>Email address</InputLabel>
                                <Input
                                    type="email"
                                    aria-describedby="my-helper-text"
                                    value={form.email}
                                    required
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Input aria-describedby="my-helper-text" value={form.role} disabled />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" sx={{ mr: 1 }} color="success" onClick={() => submitHandler()}>
                                Edit User
                            </Button>
                            <Button variant="contained" onClick={() => navigate('/app/users')}>
                                Kembali
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default EditUserPage;
