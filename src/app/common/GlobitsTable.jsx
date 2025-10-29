import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
import GlobitsPagination from "./GlobitsPagination";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  globitsTableWraper: {
    // maxHeight: "400px",
    // overflowY: "auto",
  },
}));

export default function GlobitsTable(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    data,
    columns,
    totalPages,
    handleChangePage,
    setRowsPerPage,
    pageSize,
    pageSizeOption,
    totalElements,
    page,
    selection,
    handleSelectList,
  } = props;

  return (
    <div className={classes.globitsTableWraper}>
      <MaterialTable
        data={data}
        columns={columns}
        parentChildData={(row, rows) => {
          var list = rows.find((a) => a.id === row.parentId);
          return list;
        }}
        options={{
          selection: selection ? true : false,
          actionsColumnIndex: -1,
          paging: false,
          search: false,
          toolbar: false,
          maxBodyHeight: "300px",
          headerStyle: {
            backgroundColor: "#e3f2fd",
            // color: "#fff",
            position: "sticky",
          },
          // rowStyle: (rowData, index) => ({
          //   backgroundColor: index % 2 === 1 ? "rgb(237, 245, 251)" : "#FFF",
          // }),
        }}
        onSelectionChange={(rows) => {
          handleSelectList(rows);
        }}
        localization={{
          body: {
            emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
          },
        }}
      />
      <GlobitsPagination
        totalPages={totalPages}
        handleChangePage={handleChangePage}
        setRowsPerPage={setRowsPerPage}
        pageSize={pageSize}
        pageSizeOption={pageSizeOption}
        totalElements={totalElements}
        page={page}
      />
    </div>
  );
}
