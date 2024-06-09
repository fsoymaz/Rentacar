package com.tobeto.pair8.core.utilities.exceptions.entityException;

public class PasswordMismatchException extends RuntimeException {
    public PasswordMismatchException(String message) {
        super(message);
    }
}