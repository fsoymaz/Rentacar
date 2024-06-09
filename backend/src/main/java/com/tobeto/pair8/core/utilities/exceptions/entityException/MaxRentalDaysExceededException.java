package com.tobeto.pair8.core.utilities.exceptions.entityException;

public class MaxRentalDaysExceededException extends RuntimeException {
    public MaxRentalDaysExceededException(String message) {
        super(message);
    }
}