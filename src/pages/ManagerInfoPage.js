import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper } from '@material-ui/core/';
import {ManagerTableContainer} from "../containers";
import ManagerModalContainer from "../containers/manager/ManagerModalContainer";

const textcolor = '#174A84';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        //paddingBottom: theme.spacing(1),
    },

    tablepart: {
        //paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    menuName: {
        padding: theme.spacing(5),
        color: textcolor,
        fontWeight: '700',
    },
}));


const ProductInfoPage = () => {
    const classes = useStyles();
    return (
        <span>
            <div>
                <Typography className={classes.menuName} variant="h5">
                    b2en 담당자 관리
                </Typography>
            </div>
            <div className={classes.tablepart}>
                <Paper >
                    <Container maxWidth="lg" className={classes.container}>
                        <div >
                            <ManagerTableContainer />
                            <ManagerModalContainer />
                        </div>
                    </Container>
                </Paper>
            </div>
        </span>
    );
}

export default ProductInfoPage;