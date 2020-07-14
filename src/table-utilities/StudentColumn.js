import React from "react";
import { HasUploadedStatus, ActionColumn, columnWidth } from "./";
import { STUDENT_COU } from "../constants/routes";

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
    headerStyle: () => columnWidth(150),
  },
  {
    dataField: "nisn",
    text: "NISN",
    sort: true,
    headerStyle: () => columnWidth(150),
  },
  {
    dataField: "nama_ibu",
    text: "Nama Ibu",
    sort: true,
    headerStyle: () => columnWidth(150),
  },
  {
    dataField: "alamat",
    text: "Alamat",
  },
  {
    dataField: "tahun_masuk",
    text: "Tahun",
  },
  {
    dataField: "url_rapor",
    text: "Rapor",
    formatter: (cellContent, row) => {
      return <HasUploadedStatus isUploaded={row.url_rapor} />;
    },
    headerStyle: () => columnWidth(60),
  },
  {
    dataField: "url_kk",
    text: "KK",
    formatter: (cellContent, row) => {
      return <HasUploadedStatus isUploaded={row.url_kk} />;
    },
    headerStyle: () => columnWidth(50),
  },
  {
    dataField: "url_akte",
    text: "Akta",
    formatter: (cellContent, row) => {
      return <HasUploadedStatus isUploaded={row.url_akte} />;
    },
    headerStyle: () => columnWidth(50),
  },
  {
    dataField: "url_ktp",
    text: "KTP",
    formatter: (cellContent, row) => {
      return <HasUploadedStatus isUploaded={row.url_ktp} />;
    },
    headerStyle: () => columnWidth(50),
  },
  {
    dataField: "action",
    text: "",
    isisDummyField: true,
    headerStyle: () => columnWidth(100),
    formatter: (cellContent, row) => {
      return (
        <ActionColumn
          isUploaded={row.uuid}
          editTo={`${STUDENT_COU}/${row.uuid}`}
        />
      );
    },
  },
];
