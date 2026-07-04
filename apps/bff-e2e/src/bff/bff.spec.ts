import axios from 'axios';

describe('Admin auth', () => {
  it('logs in, restores the current admin, and logs out', async () => {
    const csrf = await getCsrf();
    const loginResponse = await axios.post(`/admin/login`, {
      email: 'admin@example.com',
      password: 'demo1234',
    }, {
      headers: csrf.headers,
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

    const sessionCookie = getResponseCookie(loginResponse, 'admin_session');
    expect(sessionCookie).toContain('admin_session=');
    const authenticatedHeaders = {
      cookie: `${csrf.cookie}; ${sessionCookie}`,
    };

    const meResponse = await axios.get(`/admin/me`, {
      headers: authenticatedHeaders,
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
        headers: {
          ...csrf.headers,
          cookie: authenticatedHeaders.cookie,
        },
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
    const refreshedSessionCookie = getResponseCookie(
      refreshResponse,
      'admin_session',
    );
    const refreshedAuthenticatedHeaders = {
      cookie: `${csrf.cookie}; ${refreshedSessionCookie}`,
    };

    const settingsResponse = await axios.get(`/admin/settings`, {
      headers: refreshedAuthenticatedHeaders,
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
      headers: {
        ...csrf.headers,
        cookie: refreshedAuthenticatedHeaders.cookie,
      },
    });

    expect(logoutResponse.status).toBe(201);
    expect(logoutResponse.headers['set-cookie']?.[0]).toContain(
      'admin_session=',
    );
  });

  it('rejects invalid credentials', async () => {
    const csrf = await getCsrf();

    await expect(
      axios.post(`/admin/login`, {
        email: 'admin@example.com',
        password: 'wrong-password',
      }, {
        headers: csrf.headers,
      }),
    ).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });

  it('rejects unsafe requests without a CSRF token', async () => {
    await expect(
      axios.post(`/admin/login`, {
        email: 'admin@example.com',
        password: 'demo1234',
      }),
    ).rejects.toMatchObject({
      response: {
        status: 403,
      },
    });
  });
});

async function getCsrf(): Promise<{
  cookie: string;
  headers: Record<string, string>;
}> {
  const response = await axios.get('/admin/csrf-token');
  const cookie = getResponseCookie(response, 'csrf_token');
  const csrfToken = response.data?.csrfToken;

  expect(cookie).toContain('csrf_token=');
  expect(csrfToken).toEqual(expect.any(String));

  return {
    cookie,
    headers: {
      cookie,
      'X-CSRF-Token': csrfToken,
    },
  };
}

function getResponseCookie(
  response: { headers: { 'set-cookie'?: string[] } },
  name: string,
): string {
  const cookie = response.headers['set-cookie']?.find((candidate) =>
    candidate.startsWith(`${name}=`),
  );

  if (!cookie) {
    throw new Error(`${name} cookie is missing.`);
  }

  return cookie.split(';')[0];
}
