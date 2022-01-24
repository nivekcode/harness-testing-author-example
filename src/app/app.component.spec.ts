import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {ReactiveFormsModule} from "@angular/forms";

import {AwesomeSwitchComponent} from "./components/switch.component";
import {AwesomeSwitchHarness} from "./harness/switch.harness";
import {AwesomeButtonHarness} from "./harness/button.harness";
import {AppComponent} from './app.component';

describe('AppComponent', () => {

  let loader: HarnessLoader;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        AwesomeSwitchComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  })

  it('should reset the switch if we reset the form ', async () => {
    const myAwesomeSwitch = await loader.getHarness(AwesomeSwitchHarness);
    const myAwesomeButton = await loader.getHarness(AwesomeButtonHarness);

    await myAwesomeSwitch.click();
    expect(await myAwesomeSwitch.checked()).toBe(true);

    await myAwesomeButton.click();
    expect(await myAwesomeSwitch.checked()).toBe(false);
  });

});
