package com.tpo.ad_destapaciones.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "El Servicio ya se encuentra seleccionado")
public class ServicioDuplicadoException extends Exception {

}
