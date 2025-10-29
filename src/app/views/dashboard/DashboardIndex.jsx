import { observer } from "mobx-react";
import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import GlobitsBreadcrumb from "../../common/GlobitsBreadcrumb";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    contentIndex: {
        backgroundImage:
            "linear-gradient(-45deg, #2196F3 0%, #2196F3 33%, #00BFA5 100%)",
        backgroundAttachment: "fixed",
        padding: "30px",
        height: "400px",
    },
    indexBg: {
        left: "-2px",
        width: "100%",
        bottom: "-32px",
        height: "auto",
        position: "absolute",
        transform: "scale(1.1,0.8)",
        transformOrigin: "bottom",
    },
    indexCard: {
        background: "#fff",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "8px",
        padding: "16px",
    },
    indexBreadcrumb: {
        marginBottom: "30px",
    },
}));

export default observer(function EthnicsIndex() {

    const { t } = useTranslation();

    const classes = useStyles();

    return (
        <div className={classes.contentIndex}>
            <div className={classes.indexBreadcrumb}>
                <GlobitsBreadcrumb routeSegments={[{ name: t("Dashboard.dashboard") }]} />
            </div>
            <Grid className={classes.indexCard} container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <h3>{t('welcome')}</h3>
                </Grid>
            </Grid>
        </div>
    );
});
