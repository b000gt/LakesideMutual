const policyManagementBackend =
  process.env.VUE_APP_POLICY_MANAGEMENT_BACKEND || 'http://localhost:8090'

export async function getCustomers(link, filter) {
  if (link) {
    return getJson(link)
  } else {
    return getJson(
      `${policyManagementBackend}/customers?filter=${filter || ''}`
    )
  }
}

export async function getCustomer(customerId) {
  return getJson(`${policyManagementBackend}/customers/${customerId}`)
}

export async function getPolicies(link) {
  if (link) {
    return getJson(link)
  } else {
    return getJson(`${policyManagementBackend}/policies?expand=customer`)
  }
}

export async function getPolicy(policyId, expandCustomer = false) {
  const policy = await getJson(
    `${policyManagementBackend}/policies/${policyId}${
      expandCustomer ? '?expand=customer' : ''
    }`
  )
  return policy
}

export function getPolicyHistory(customerId) {
  return getJson(
    `${policyManagementBackend}/customers/${customerId}/policy-history`
  )
}

export function getActivePolicy(customerId) {
  return getJson(
    `${policyManagementBackend}/customers/${customerId}/active-policy`
  )
}

export async function createPolicy(
  customerId,
  startDate,
  endDate,
  policyType,
  insurancePremium,
  policyLimit,
  agreementItems
) {
  const policy = {
    customerId,
    policyPeriod: {
      startDate,
      endDate
    },
    policyType,
    policyLimit: {
      amount: policyLimit,
      currency: 'CHF'
    },
    insurancePremium: {
      amount: insurancePremium,
      currency: 'CHF'
    },
    insuringAgreement: {
      agreementItems
    }
  }

  return postJson(`${policyManagementBackend}/policies`, policy)
}

export async function computeRiskFactor(customer) {
  const request = {
    birthday: customer.birthday,
    postalCode: customer.postalCode
  }
  return postJson(`${policyManagementBackend}/riskfactor/compute`, request)
}

async function getJson(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  return checkStatus(response)
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  })
  return checkStatus(response)
}

export class ApiError {
  constructor(code, statusText, body) {
    this.code = code
    this.statusText = statusText
    this.body = body
  }
}

export async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    let json
    try {
      json = await response.json()
    } catch (_) {
      throw new ApiError(response.status, response.statusText, '')
    }
    throw new ApiError(response.status, response.statusText, json)
  }
}
