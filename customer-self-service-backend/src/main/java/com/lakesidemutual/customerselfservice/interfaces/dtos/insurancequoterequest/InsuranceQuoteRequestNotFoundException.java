package com.lakesidemutual.customerselfservice.interfaces.dtos.insurancequoterequest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * You might be wondering why this Exception class is in the dtos package. Exceptions of this type
 * are thrown whenever the client tries to fetch an insurance quote request that doesn't exist. Spring will then
 * convert this exception into an HTTP 404 response.
 * */
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class InsuranceQuoteRequestNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 7849369545115229681L;

	public InsuranceQuoteRequestNotFoundException(String errorMessage) {
		super(errorMessage);
	}
}
