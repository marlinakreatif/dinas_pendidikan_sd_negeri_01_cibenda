import React from "react";
import { HasUploadedStatus, ActionColumn, ColumnWidth } from ".";
import { STUDENT_UPDATE, STUDENT_DOCUMENT } from "../../constants/routes";

export const STUDENT_COLUMS = [
  {
    dataField: "uuid",
    text: "",
    hidden: true,
  },
  {
    dataField: "nama",
    text: "Nama Siswa",
    sort: true,
    headerStyle: () => ColumnWidth(150),
  },
  {
    dataField: "nisn",
    text: "NISN",
    sort: true,
    headerStyle: () => ColumnWidth(150),
  },
  {
    dataField: "nama_ibu",
    text: "Nama Ibu",
    sort: true,
    headerStyle: () => ColumnWidth(150),
  },
  {
    dataField: "alamat",
    text: "Alamat",
  },
  {
    dataField: "tahun_masuk",
    text: "Tahun",
    headerStyle: () => ColumnWidth(100),
  },
  {
    dataField: "url_rapor",
    text: "Rapor",
    formatter: (cellContent, row) => {
      return <HasUploadedStatus isUploaded={row.url_rapor} />;
    },
    headerStyle: () => ColumnWidth(60),
  },
  {
    dataField: "url_kk",
    text: "KK",
    formatter: (cellContent, row) => {
      return <HasUploadedStatus isUploaded={row.url_kk} />;
    },
    headerStyle: () => ColumnWidth(50),
  },
  {
    dataField: "url_akte",
    text: "Akta",
    formatter: (cellContent, row) => {
      return <HasUploadedStatus isUploaded={row.url_akte} />;
    },
    headerStyle: () => ColumnWidth(50),
  },
  {
    dataField: "url_ktp",
    text: "KTP",
    formatter: (cellContent, row) => {
      return <HasUploadedStatus isUploaded={row.url_ktp} />;
    },
    headerStyle: () => ColumnWidth(50),
  },
  {
    dataField: "action",
    text: "",
    isisDummyField: true,
    headerStyle: () => ColumnWidth(100),
    formatter: (cellContent, row) => {
      return (
        <ActionColumn
          isUploaded={row.uuid}
          editTo={`${STUDENT_UPDATE}/${row.uuid}`}
          addDocTo={`${STUDENT_DOCUMENT}/${row.uuid}`}
        />
      );
    },
  },
];
