import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <Typography sx={{ fontFamily: 'Poppins', fontSize: 24, fontWeight: 500 }}>
            Buka<span style={{ color: '#673ab7' }}>franchise</span>
        </Typography>
    </ButtonBase>
);

export default LogoSection;
