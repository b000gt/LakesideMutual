// @flow

function getEnvironmentVariable(name: string, defaultValue: string): string {
  return window.__ENV[name] != null
    ? window.__ENV[name]
    : process.env[name] != null
    ? process.env[name]
    : defaultValue
}

export const customerSelfServiceBackend = getEnvironmentVariable(
  "REACT_APP_CUSTOMER_SELF_SERVICE_BACKEND",
  ""
)
export const customerManagementBackend = getEnvironmentVariable(
  "REACT_APP_CUSTOMER_MANAGEMENT_BACKEND",
  ""
)
