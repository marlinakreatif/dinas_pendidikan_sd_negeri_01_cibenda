import React, { Component } from "react";
import { withFirebase } from "../firebase-config";
import readXlsxFile from "read-excel-file";
import { Table, Button } from "react-bootstrap";
import { TableCaption } from "../utilities/table";
import { Loading } from "../components";
import dateFormat from "date-format";
import { ROUTES } from "../constants";

class StudentImport extends Component {
  state = {
    isLoading: false,
    students: [],
  };

  /**
   * index columns :
   * 0 : nama
   * 1 : nisn
   * 2 : alamat
   * 3 : tempat lahir
   * 4 : tanggal lahir
   * 5 : nama ibu
   * 6 : tahun masuk
   */
  onFileChange = (event) => {
    let files = event.target.files;
    this.setState({
      isLoading: true,
    });
    readXlsxFile(files[0]).then((rows) => {
      if (rows.length > 2) {
        let data = [];
        rows.forEach((row, index) => {
          if (index > 0) {
            let date =
              typeof row[4] === "string"
                ? new Date(row[4])
                : this.getDateFromExcelDate(row[4]);
            data.push({
              nama: row[0],
              nisn: row[1],
              alamat: row[2],
              tempat_lahir: row[3],
              tanggal_lahir: date,
              nama_ibu: row[5],
              tahun_masuk: `${row[6]}`,
            });
          }
        });
        this.setState({
          students: data,
          isLoading: false,
        });
      }
    });
  };

  getDateFromExcelDate = (excelDate) => {
    console.log("EXCEL DATE", excelDate);
    let e0date = new Date(0); // epoch "zero" date
    let offset = e0date.getTimezoneOffset(); // tz offset in min

    // calculate Excel xxx days later, with local tz offset
    return new Date(0, 0, excelDate - 1, 0, -offset, 0);
  };

  batchSaveData = () => {
    const { students } = this.state;
    const { firebase } = this.props;
    this.setState({ isLoading: true });
    let batch = firebase.batch();
    students.forEach((student) => {
      let studentDocRef = firebase.db.collection("students").doc();
      batch.set(studentDocRef, { ...student });
    });
    // Commit the batch
    batch
      .commit()
      .then(() => {
        this.setState({
          isLoading: false,
        });
        this.props.history.push(ROUTES.STUDENTS);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const { students, isLoading } = this.state;
    return (
      <div className="content-layout">
        {isLoading && <Loading />}
        <TableCaption icon="fa-users" title="Impor Data Siswa/Siswi" />
        <hr />
        <Table bordered>
          <thead>
            <tr>
              <th colSpan={6}>
                {"Pilih File XLSX : "}
                <input
                  type="file"
                  name="studentXlsx"
                  onChange={this.onFileChange}
                  accept=".xlsx"
                />
              </th>
              <th width="200">
                <a href="/TEMPLATE.xlsx" download>
                  <div className="btn btn-light">
                    <i className="fa fa-download" aria-hidden="true"></i>
                    {" Template Data"}
                  </div>
                </a>
              </th>
            </tr>
            <tr>
              <th>Nama</th>
              <th>NISN</th>
              <th>Alamat</th>
              <th>Nama Ibu</th>
              <th>Tempat Lahir</th>
              <th>Tanggal Lahir</th>
              <th>Tahun Masuk</th>
            </tr>
          </thead>
          {students.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={7}>
                  <center>Data Siswa Kosong</center>
                </td>
              </tr>
            </tbody>
          )}
          {students.length > 0 && (
            <tbody>
              {students.map((data, index) => {
                return (
                  <tr key={"table" + index}>
                    <td>{data.nama}</td>
                    <td>{data.nisn}</td>
                    <td>{data.alamat}</td>
                    <td>{data.nama_ibu}</td>
                    <td>{data.tempat_lahir}</td>
                    <td>
                      {dateFormat.asString("dd-MM-yyyy", data.tanggal_lahir)}
                    </td>
                    <td>{data.tahun_masuk}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={7}>
                  <Button type="button" onClick={this.batchSaveData}>
                    Simpan
                  </Button>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
    );
  }
}

export default withFirebase(StudentImport);
