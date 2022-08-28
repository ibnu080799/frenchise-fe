import { AppBar, Box, Button, Container, CssBaseline, Grid, Stack, Toolbar, Typography } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import useProfile from 'hooks/useProfile';

// project imports

const navItems = ['Home', 'About', 'Contact'];
// ==============================|| CUSTOM LAYOUT ||============================== //

const CustomLayout = () => {
    const theme = useTheme();

    const location = useLocation();

    const [profile] = useProfile();

    const handleLogout = async () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div style={{ backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar
                component="nav"
                enableColorOnDark
                position="static"
                color="inherit"
                elevation={0}
                sx={{
                    pt: 2,
                    pb: 2,
                    bgcolor: theme.palette.background.default,
                    backdropFilter: 'blur(20px)'
                }}
            >
                <Container>
                    <Grid container direction="row" alignItems="center" display="flex" justifyContent="space-between">
                        <Grid item>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Typography sx={{ fontFamily: 'Poppins', fontSize: 24, fontWeight: 500 }}>
                                    Buka<span style={{ color: '#673ab7' }}>franchise</span>
                                </Typography>
                            </Link>
                        </Grid>
                        {profile === null && (
                            <Grid item spacing={2}>
                                <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                                    <Button sx={{ marginRight: 3 }} variant="outlined">
                                        Masuk
                                    </Button>
                                </Link>
                                <Link to="/auth/register" style={{ textDecoration: 'none' }}>
                                    <Button disableElevation variant="contained" color="secondary">
                                        Daftar
                                    </Button>
                                </Link>
                            </Grid>
                        )}
                        {profile !== null && (
                            <Grid item spacing={2}>
                                {profile.role === 'buyer' && (
                                    <Link to="/pesanan-saya" style={{ textDecoration: 'none' }}>
                                        <Button sx={{ marginRight: 3 }} color="secondary">
                                            Pesanan Saya
                                        </Button>{' '}
                                        &nbsp;
                                    </Link>
                                )}
                                {(profile.role === 'admin' || profile.role === 'seller') && (
                                    <Link to="/app" style={{ textDecoration: 'none' }}>
                                        <Button sx={{ marginRight: 3 }} color="secondary">
                                            Dashboard
                                        </Button>
                                    </Link>
                                )}
                                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                                    Keluar
                                </Button>{' '}
                                &nbsp;
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </AppBar>
            <Container sx={{ marginTop: 5 }}>
                {/* header */}

                {/* main content */}
                <Outlet />
            </Container>
        </div>
    );
};

export default CustomLayout;
