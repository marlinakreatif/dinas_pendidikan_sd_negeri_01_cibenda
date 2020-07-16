export class Student {
  constructor(
    nisn,
    nama,
    alamat,
    nama_ibu,
    tempat_lahir,
    tanggal_lahir,
    url_kk,
    url_akte,
    url_ktp,
    url_rapor,
    tahun_masuk
  ) {
    this.nisn = nisn;
    this.nama = nama;
    this.nama_ibu = nama_ibu;
    this.alamat = alamat;
    this.tempat_lahir = tempat_lahir;
    this.tanggal_lahir = tanggal_lahir;
    this.url_kk = url_kk;
    this.url_akte = url_akte;
    this.url_ktp = url_ktp;
    this.url_rapor = url_rapor;
    this.tahun_masuk = tahun_masuk;
  }
}
