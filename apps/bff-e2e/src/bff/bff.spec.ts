import axios from 'axios';

describe('Admin auth', () => {
  it('logs in, restores the current admin, and logs out', async () => {
    const loginResponse = await axios.post(`/admin/login`, {
      email: 'admin@example.com',
      password: 'demo1234',
    });

    expect(loginResponse.status).toBe(201);
    expect(loginResponse.data).toMatchObject({
      id: 'admin-local',
      email: 'admin@example.com',
      displayName: 'Admin',
      roles: ['admin'],
    });
    expect(loginResponse.data.sessionExpiresAt).toEqual(expect.any(String));
    expect(loginResponse.data.sessionExpiryWarningSeconds).toBe(60);

    const cookie = loginResponse.headers['set-cookie']?.[0];
    expect(cookie).toContain('admin_session=');

    const meResponse = await axios.get(`/admin/me`, {
      headers: { cookie },
    });

    expect(meResponse.status).toBe(200);
    expect(meResponse.data).toMatchObject({
      id: 'admin-local',
      email: 'admin@example.com',
      displayName: 'Admin',
      roles: ['admin'],
    });
    expect(meResponse.data.sessionExpiresAt).toEqual(expect.any(String));
    expect(meResponse.data.sessionExpiryWarningSeconds).toBe(60);

    const refreshResponse = await axios.post(
      `/admin/session/refresh`,
      undefined,
      {
        headers: { cookie },
      },
    );

    expect(refreshResponse.status).toBe(201);
    expect(refreshResponse.headers['set-cookie']?.[0]).toContain(
      'admin_session=',
    );
    expect(refreshResponse.data).toMatchObject({
      id: 'admin-local',
      email: 'admin@example.com',
      displayName: 'Admin',
      roles: ['admin'],
      sessionExpiryWarningSeconds: 60,
    });
    expect(refreshResponse.data.sessionExpiresAt).toEqual(expect.any(String));

    const settingsResponse = await axios.get(`/admin/settings`, {
      headers: { cookie },
    });

    expect(settingsResponse.status).toBe(200);
    expect(settingsResponse.data).toEqual({
      exchangeEnabled: true,
      maintenanceMode: false,
      defaultFiatCurrency: 'USD',
      supportEmail: 'support@example.com',
      sessionTtlSeconds: 28800,
      sessionExpiryWarningSeconds: 60,
    });

    const logoutResponse = await axios.post(`/admin/logout`, undefined, {
      headers: { cookie },
    });

    expect(logoutResponse.status).toBe(201);
    expect(logoutResponse.headers['set-cookie']?.[0]).toContain(
      'admin_session=',
    );
  });

  it('rejects invalid credentials', async () => {
    await expect(
      axios.post(`/admin/login`, {
        email: 'admin@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});
