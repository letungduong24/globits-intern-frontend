import React from "react";
import { TextField, MenuItem, Grid, makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  paginationBar: {
    padding: "15px 7px",
    float: "right",
    "& > .Mui-selected": {
      color: "#fff",
      backgroundColor: "#2a80c8",
      borderColor: "#2a80c8",
    },
    "& > .Mui-selected::hover": {
      color: "#fff",
      backgroundColor: "#1f5f94",
      borderColor: "#1f5f94",
    },
  },
  rowPerPageSelector: {
    display: "flex",
    "& > p": {
      margin: "5px 0px",
    },
  },
  rowOptions: {
    marginLeft: "15px",
    "& > div": {
      lineHeight: "20px",
    },
    "& > div::before": {
      content: "none",
    },
    "& > div::after": {
      content: "none",
    },
  },
  totalRows: {
    margin: "0px 12px 0px 6px",
    padding: "0px 12px 0px 6px",
    borderRight: "1px solid #000",
  },
  pageGoto: {
    margin: "5px 15px 5px 0",
  },
  gotoInput: {
    width: "50px",
    "& > div::before": {
      content: "none",
    },
    "& > div::after": {
      content: "none",
    },
  },
}));

export default function GlobitsPagination(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  let {
    handleChangePage,
    totalPages,
    setRowsPerPage,
    pageSizeOption,
    totalElements,
    page,
  } = props;
  const [pageSize, setPageSize] = React.useState(props.pageSize);
  const handleChange = (event) => {
    setRowsPerPage(event);
    setPageSize(event.target.value);
  };

  const [pageIndex, setPageIndex] = React.useState(page);
  const handleGo = (event) => {
    if (pageIndex < 1 || pageIndex > totalPages) {
      alert("Hãy nhập số từ 1 dến " + totalPages);
      return;
    }
    handleChangePage(event, Number(pageIndex));
  };
  return (
    <div className={classes.paginationBar}>
      <Grid container spacing={2}>
        <Grid className={classes.rowPerPageSelector} item>
          <p>
            {t("general.total_rows")}
            <span className={classes.totalRows}>{totalElements}</span>
          </p>
          <p>{t("general.rows_per_page")}</p>
          <TextField
            select
            value={pageSize}
            className={classes.rowOptions}
            onChange={handleChange}
          >
            {pageSizeOption.map((option, index) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid className="page-selector" item>
          <Pagination
            count={totalPages}
            shape="rounded"
            page={page}
            color="primary"
            onChange={handleChangePage}
            boundaryCount={1}
            siblingCount={1}
            showFirstButton
            showLastButton
          />
        </Grid>
        {totalPages > 7 && (
          <Grid className={classes.pageGoto} item>
            <p>{t("general.goto_page")}</p>
            <TextField
              className={classes.gotoInput}
              type="number"
              name="pageIndex"
              value={pageIndex}
              onChange={(e) => setPageIndex(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGo(e);
                }
              }}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
