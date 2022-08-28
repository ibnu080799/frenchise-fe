import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Backdrop,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { padding } from '@mui/system';
import { addUser } from 'services/user';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const Register = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const submitHandler = (value) => {
        setIsLoading(true);
        addUser(value)
            .then((val) => {
                setIsLoading(false);
                if (val.status !== 500) {
                    setUsers(val);
                    localStorage.setItem('users', JSON.stringify(val.data.data));
                    if (val.data.data.role === 'buyer') {
                        navigate('/');
                    } else {
                        navigate('/app');
                    }
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('err', err);
            });
    };

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    name: '',
                    role: '',
                    name_brand: '',
                    total_employee: '',
                    start_operation: '',
                    category: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    name: Yup.string().max(255).required('Full Name is required'),
                    role: Yup.string().max(255).required('Role is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            submitHandler(values);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-name">Full Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="text"
                                value={values.name}
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.name && errors.name && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <FormControl fullWidth error={Boolean(touched.role && errors.role)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-role">Role</InputLabel>
                            <Select id="demo-simple-select" value={values.role} name="role" style={{ padding: 4 }} onChange={handleChange}>
                                <MenuItem value="buyer">Buyer</MenuItem>
                                <MenuItem value="seller">Seller</MenuItem>
                            </Select>
                            {touched.role && errors.role && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.role}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {values.role === 'seller' ? (
                            <>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-name">Name Brand</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-name"
                                        type="text"
                                        value={values.name_brand}
                                        name="name_brand"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                </FormControl>

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.total_employee && errors.total_employee)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-total_employee">Total Employee</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-total_employee"
                                        type="number"
                                        value={values.total_employee}
                                        name="total_employee"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                </FormControl>

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.total_employee && errors.total_employee)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <TextField
                                        id="date"
                                        style={{ padding: 8 }}
                                        label="Start Operation"
                                        type="date"
                                        name="start_operation"
                                        onChange={handleChange}
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </FormControl>

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.category && errors.category)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-role">Category</InputLabel>
                                    <Select
                                        id="demo-simple-category"
                                        value={values.category}
                                        name="category"
                                        style={{ padding: 4 }}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Industri Makanan & Minuman">Industri Makanan & Minuman</MenuItem>
                                        <MenuItem value="Industri Ritel">Industri Ritel</MenuItem>
                                        <MenuItem value="Industri kecantikan dan kesehatan">Industri kecantikan dan kesehatan</MenuItem>
                                        <MenuItem
                                            value="Industri pendidikan non formal
"
                                        >
                                            Industri pendidikan non formal
                                        </MenuItem>
                                    </Select>
                                    {touched.category && errors.category && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.category}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </>
                        ) : (
                            ''
                        )}

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Register;
