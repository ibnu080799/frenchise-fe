import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { gridSpacing } from 'store/constant';
import EarningCard from '../Default/EarningCard';
import { URL_API } from '../../../core/constant';
import axios from 'axios';

const DashboardAdmin = () => {
    const [summarys, setSummarys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getSummarys = async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}/summary`
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

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <EarningCard value1={summarys.totalUsers} text1="Total User" />
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <EarningCard value2={summarys.totalProducts} text2="Total Product" />
                        {/* <TotalIncomeDarkCard /> */}
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <EarningCard value3={summarys.totalOrders} text2="Total Order" />
                        {/* <TotalIncomeLightCard /> */}
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <EarningCard value4={summarys.totalBrand} text2="Total Brand" />
                        {/* <TotalOrderLineChartCard /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DashboardAdmin;
