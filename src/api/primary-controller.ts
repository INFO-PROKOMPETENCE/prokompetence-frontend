import { ConnectorFlow } from "../typing/connector";
import { URLS } from "./urls";

export class PrimaryConnector<T extends ConnectorFlow> {
  protected urls: (typeof URLS)[T];

  constructor(protected flow: T) {
    this.urls = URLS[this.flow];
  }
}
