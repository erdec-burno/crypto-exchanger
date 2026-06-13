import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layouts/public-layout.tsx', [
    index('./routes/public/index.tsx'),
    route('login', './routes/public/login.tsx'),
    route('support', './routes/public/support.tsx'),
    route('terms', './routes/public/terms.tsx'),
  ]),
  layout('./layouts/private-layout.tsx', [
    route('dashboard', './routes/private/dashboard.tsx'),
    route('settings', './routes/private/settings.tsx'),
    route('profile', './routes/private/profile.tsx'),
    route('logout', './routes/private/logout.tsx'),
  ]),
] satisfies RouteConfig;
