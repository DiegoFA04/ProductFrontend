import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  it('should create an instance', () => {
    expect(new AuthenticationGuard()).toBeTruthy();
  });
});
