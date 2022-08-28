import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useEffect, useState } from 'react';
import useProfile from '../../../hooks/useProfile';
import TotalOrderLineChartCard from '../Default/TotalOrderLineChartCard';
import { URL_API } from '../../../core/constant';
import axios from 'axios';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import toRupiah from 'utils/toRupiah';

const DashboardSeller = () => {
    const [summarys, setSummarys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [profile] = useProfile();

    const getSummarys = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}/summary/${profile.id}`
            });
            if (result.status === 200) {
                const { data } = result.data;

                setSummarys(data);
                // console.log(data);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getSummarys();
    }, []);

    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard
                            value1={summarys.totalProducts}
                            text1="Total Product"
                            style={{
                                background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard value2={summarys.totalOrders} text2="Total Order" />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard value2={toRupiah(summarys.totalIncome || 0)} text2="Total Income" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DashboardSeller;
