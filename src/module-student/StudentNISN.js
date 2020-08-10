import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { TableCaption } from "../utilities/table";
import YearListGenerator from "../utilities/functional/YearListGenerator";
import { Loading, PhotoProfile } from "../components";
import { withFirebase } from "../firebase-config";
import dateFormat from "date-format";

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

const NisnCard = ({ student }) => {
  return (
    <div className="nisn-card">
      <img src="/NISN.jpeg" alt="nisn_bg" />
      <div className="nisn-content">
        <Row>
          <Col sm={3}>Nama</Col>
          <Col>{`: ${student.nama}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>NISN</Col>
          <Col>{`: ${student.nisn}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>Tempat Lahir</Col>
          <Col>{`: ${student.tempat_lahir}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>Tanggal Lahir</Col>
          <Col>{`: ${dateFormat.asString(
            "dd-MM-yyyy",
            student.tanggal_lahir.toDate()
          )}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>Jenis Kelamin</Col>
          <Col>{`: ${student.jenis_kelamin}`}</Col>
        </Row>
        <Row>
          <Col sm={3}>Ibu Kandung</Col>
          <Col>{`: ${student.nama_ibu}`}</Col>
        </Row>
      </div>

      <div className="nisn-pp">
        <PhotoProfile
          uuid={student.uuid}
          url_pp={student.url_pp}
         
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
                    return <NisnCard student={data} key={"index-" + index} />;
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
