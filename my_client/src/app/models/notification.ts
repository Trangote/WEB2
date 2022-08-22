export class Notification {
  body?: string;
  title: string;
  createdAt?: string;
  constructor() {
    this.body = '';
    this.title = '';
    this.createdAt = '';
  }
}
