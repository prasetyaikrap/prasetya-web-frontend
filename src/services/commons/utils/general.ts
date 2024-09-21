export function routeToRegex(route: string) {
  // Convert route params (e.g., :id) to regex capture groups (e.g., (\w+))
  const params: string[] = [];
  const pattern = route.replace(/:([^\s/]+)/g, (_, paramName) => {
    params.push(paramName);
    return "([^/]+)"; // Convert to regex capture group
  });
  return { regex: new RegExp(`^${pattern}$`), params };
}
