export default class {
  constructor(source, google, glosbe) {
    this.source = source;
    this.google = google;
    this.glosbe = glosbe;
    this.date = new Date().toISOString();
  }
}
