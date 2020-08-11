export default class CertificateModel {
  constructor(
    penerima,
    pemberi,
    penghargaan,
    nip_pemberi,
    jabatan_pemberi,
    deskripsi,
    tanggal,
    tempat
  ) {
    this.penerima = penerima;
    this.pemberi = pemberi;
    this.nip_pemberi = nip_pemberi;
    this.jabatan_pemberi = jabatan_pemberi;
    this.penghargaan = penghargaan;
    this.deskripsi = deskripsi;
    this.tanggal = tanggal;
    this.tempat = tempat;
  }
}
