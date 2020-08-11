import React from "react";
import "./styles.css";

function Certificate({ theme, certificate, onClick }) {
  const dateToString = (date) => {
    var months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "December",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  return (
    <div className={`certificate template-${theme.id}`} onClick={onClick}>
      <img className="image" src={theme.path} alt="certificate background" />
      <div className="content">
        <div className="title">{"Piagam Penghargaan"}</div>
        <div className="to">Dengan Bangga diberikan Kepada :</div>
        <div className="penerima">{certificate.penerima}</div>
        <div className="to">Sebagai</div>
        <div className="penghargaan">{certificate.penghargaan}</div>
        <div className="deskripsi">{certificate.deskripsi}</div>
        <div>
          <div className="pull-right ttj">
            <span>{`${certificate.tempat}, ${dateToString(
              certificate.tanggal
            )}`}</span>
            <br />
            <span>{certificate.jabatan_pemberi}</span>
            <div className="pemberi">
              <u>{certificate.pemberi}</u>
              <br />
              {`Nip.${certificate.nip_pemberi}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
