import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { Button, Table, Form } from "react-bootstrap";
import { TableCaption } from "../utilities/table";
import YearListGenerator from "../utilities/functional/YearListGenerator";
import { Loading } from "../components";
import { withFirebase } from "../firebase-config";

const PrintButton = ({ toPrintRef }) => {
  return (
    <ReactToPrint
      trigger={() => {
        return (
          <Button variant="light" block>
            <i className="fa fa-download"></i> {" Print NISN"}
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
    <div
      style={{
        width: "1000px",
        height: "310px",
        margin: "20px 10px",
      }}
    >
      <img src="/NISN.jpeg" alt="" style={{ width: "100%", height: "100%" }} />
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
