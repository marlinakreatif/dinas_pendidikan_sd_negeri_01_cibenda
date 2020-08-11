import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { TableCaption } from "../utilities/table";
import YearListGenerator from "../utilities/functional/YearListGenerator";
import { Loading, PhotoProfile } from "../components";
import { withFirebase } from "../firebase-config";
import dateFormat from "date-format";
import QRCode from "qrcode.react";

const PrintButton = ({ toPrintRef }) => {
  return (
    <ReactToPrint
      trigger={() => {
        return (
          <Button variant="light" block>
            <i className="fa fa-print"></i> {" Print NISN"}
          </Button>
        );
      }}
      documentTitle="NISN SISWA"
      content={() => toPrintRef}
      pageStyle="@page { size: auto; margin: 10mm; }"
    />
  );
};

const NisnCard = ({ student, index, updateStudent }) => {
  const {
    nama,
    nisn,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    nama_ibu,
  } = student;
  return (
    <div className="nisn-card">
      <img src="/NISN.jpeg" alt="nisn_bg" />
      <div className="nisn-content">
        <Row>
          <Col sm={3}>Nama</Col>
          <Col>{`: ${nama}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>NISN</Col>
          <Col>{`: ${nisn}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>Tempat Lahir</Col>
          <Col>{`: ${tempat_lahir}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>Tanggal Lahir</Col>
          <Col>{`: ${dateFormat.asString(
            "dd-MM-yyyy",
            tanggal_lahir.toDate()
          )}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>Jenis Kelamin</Col>
          <Col>{`: ${jenis_kelamin}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>Ibu Kandung</Col>
          <Col>{`: ${nama_ibu}`}</Col>
        </Row>
      </div>

      <div className="nisn-pp">
        <PhotoProfile
          uuid={student.uuid}
          url_pp={student.url_pp}
          index={index}
          updateStudent={updateStudent}
        />
      </div>

      <div className="nisn-qr">
        <QRCode
          value={`NISN:${nisn}, Nama:${nama}, Jenis Kelamin: ${jenis_kelamin}, Tempat Lahir:${tempat_lahir}, Tanggal Lahir: ${dateFormat.asString(
            "dd-MM-yyyy",
            tanggal_lahir.toDate()
          )}`}
          size={100}
          level="M"
          includeMargin={true}
        />
      </div>
    </div>
  );
};

class StudentNISN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      tahun_masuk: new Date().getFullYear(),
      years: YearListGenerator(),
      isLoading: false,
    };
    this.componentToPrintRef = React.createRef();
  }

  onYearChange = (event) => {
    const { firebase } = this.props;
    const { value } = event.target;
    this.setState({
      tahun_masuk: value,
      isLoading: true,
    });
    firebase
      .students()
      .where("tahun_masuk", "==", value)
      .get()
      .then((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ uuid: doc.id, ...doc.data() });
        });
        this.setState({
          students: docs,
          isLoading: false,
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };
  updateStudent = (url_pp, index) => {
    let students = this.state.students;
    students[index].url_pp = url_pp;
    this.setState({
      students,
    });
  };
  render() {
    const { students, years, tahun_masuk, isLoading } = this.state;
    return (
      <div className="content-layout">
        {isLoading && <Loading />}
        <Table bordered>
          <thead>
            <tr>
              <th>
                <TableCaption icon="fa-users" title="NISN Generator" />
              </th>
              <th width="200">
                <Form.Control
                  defaultValue={tahun_masuk}
                  as="select"
                  onChange={this.onYearChange}
                  name="tahun_masuk"
                >
                  <option value="" disabled>
                    pilih tahun masuk
                  </option>
                  {years.map((data, index) => {
                    return (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    );
                  })}
                </Form.Control>
              </th>
              <th width="200">
                {students.length > 0 && (
                  <PrintButton toPrintRef={this.componentToPrintRef} />
                )}
              </th>
            </tr>
            <tr></tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
                <div
                  ref={(el) => (this.componentToPrintRef = el)}
                  style={{ minHeight: "100px" }}
                >
                  {students.map((data, index) => {
                    return (
                      <NisnCard
                        student={data}
                        key={"index-" + index}
                        index={index}
                        updateStudent={this.updateStudent}
                      />
                    );
                  })}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} />
              <td width="200" height="60">
                {students.length > 0 && (
                  <PrintButton toPrintRef={this.componentToPrintRef} />
                )}
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default withFirebase(StudentNISN);
