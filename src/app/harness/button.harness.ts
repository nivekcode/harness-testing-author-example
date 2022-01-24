// @dynamic
import {ComponentHarness} from "@angular/cdk/testing";

export class AwesomeButtonHarness extends ComponentHarness {

  static hostSelector = 'button';

  async click() {
    await (await this.host()).click();
  }
}
