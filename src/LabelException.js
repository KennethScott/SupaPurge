export class LabelException extends Error {
  constructor(message) {
    super(message);
    this.name = 'LabelException';
  }
}
