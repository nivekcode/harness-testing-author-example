import {BaseHarnessFilters, ComponentHarness, HarnessPredicate} from "@angular/cdk/testing";

export class AwesomeSwitchHarness extends ComponentHarness {
  static hostSelector = 'awesome-switch';

  private getInput = this.locatorFor('input');
  private getDisabledSlider = this.locatorForOptional('span.disabled');

  static with(options: BaseHarnessFilters): HarnessPredicate<AwesomeSwitchHarness> {
    return new HarnessPredicate(AwesomeSwitchHarness, options);
  }

  async click() {
    await (await this.host()).click();
  }

  async checked(): Promise<boolean> {
    return await (await this.getInput()).getProperty('checked');
  }

  async focused(): Promise<boolean> {
    return (await this.getInput()).isFocused();
  }

  async readonly(): Promise<boolean> {
    return !!(await this.getDisabledSlider());
  }
}
