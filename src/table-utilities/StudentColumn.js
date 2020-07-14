import React from 'react';
import { HasUploadedStatus } from './';

export const STUDENT_COLUMS = [
    {
        dataField: 'uuid',
        text: '',
        hidden: true
    },
    {
        dataField: 'nama',
        text: 'Nama Siswa',
        sort: true
    },
    {
        dataField: 'nisn',
        text: 'NISN',
        sort: true
    },
    {
        dataField: 'alamat',
        text: 'Alamat'
    },
    {
        dataField: 'tahun_masuk',
        text: 'Tahun'
    },
    {
        dataField: 'url_kk',
        text: 'KK',
        formatter: (cellContent, row) => {
            return (<HasUploadedStatus isUploaded={row.url_kk} />)
        }
    },
    {
        dataField: 'url_akte',
        text: 'Akta',
        formatter: (cellContent, row) => {
            return (<HasUploadedStatus isUploaded={row.url_akte} />)
        }
    },
    {
        dataField: 'url_ktp',
        text: 'KTP',
        formatter: (cellContent, row) => {
            return (<HasUploadedStatus isUploaded={row.url_ktp} />)
        }
    },
    {
        dataField: 'url_rapor',
        text: 'Rapor',
        formatter: (cellContent, row) => {
            return (<HasUploadedStatus isUploaded={row.url_rapor} />)
        }
    },

]