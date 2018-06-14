import { NfeModule } from './nfe.module';

describe('NfeModule', () => {
  let nfeModule: NfeModule;

  beforeEach(() => {
    nfeModule = new NfeModule();
  });

  it('should create an instance', () => {
    expect(nfeModule).toBeTruthy();
  });
});
