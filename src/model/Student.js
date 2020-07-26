export class Student {
  constructor(
    nisn,
    nama,
    alamat,
    nama_ibu,
    tempat_lahir,
    tanggal_lahir,
    tahun_masuk
  ) {
    this.nisn = nisn ? nisn : "";
    this.nama = nama ? nama : "";
    this.nama_ibu = nama_ibu ? nama_ibu : "";
    this.alamat = alamat ? alamat : "";
    this.tempat_lahir = tempat_lahir ? tempat_lahir : "";
    this.tanggal_lahir = tanggal_lahir ? tanggal_lahir : new Date('11/22/1991');
    this.tahun_masuk = tahun_masuk ? tahun_masuk : "";
    this.url_kk = "";
    this.url_akte = "";
    this.url_ktp = "";
    this.url_rapor = "";
  }
}
