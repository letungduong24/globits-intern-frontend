import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ConstantList from "../appConfig";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: {
    display: "flex",
    color: "#fff!important",
    fontWeight: "700!important",
    textTransform: "capitalize",
    fontSize: "2.125rem",
  },
  location: {
    display: "flex",
    color: "#fff!important",
    fontSize: "12px",
  },
}));

const GlobitsBreadcrumb = ({ routeSegments }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  console.log(routeSegments);
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {routeSegments ? (
          <Fragment>
            <span className="">
              {routeSegments[routeSegments.length - 1]["name"]}
            </span>
          </Fragment>
        ) : null}
      </div>
      <div className={classes.location}>
        <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>
          {t("general.you_are_here")}&nbsp;&nbsp;
        </span>
        <NavLink to={ConstantList.ROOT_PATH}>{t("general.home")}</NavLink>
        {routeSegments
          ? routeSegments.map((route, index) => (
              <Fragment key={index}>
                <span>&nbsp; &nbsp;/&nbsp; &nbsp;</span>

                <span className="">{route.name}</span>
              </Fragment>
            ))
          : null}
      </div>
    </div>
  );
};

export default GlobitsBreadcrumb;
