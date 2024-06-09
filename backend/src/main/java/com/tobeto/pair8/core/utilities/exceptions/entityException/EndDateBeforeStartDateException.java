package com.tobeto.pair8.core.utilities.exceptions.entityException;

public class EndDateBeforeStartDateException extends RuntimeException {
    public EndDateBeforeStartDateException(String message) {
        super(message);
    }
}
