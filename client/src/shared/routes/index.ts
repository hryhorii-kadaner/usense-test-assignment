export const routes = {
  HOME: '/',
} as const;

export type RouteKeys = keyof typeof routes;
export type RouteValues = typeof routes[RouteKeys];
