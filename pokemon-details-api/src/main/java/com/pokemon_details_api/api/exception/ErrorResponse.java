package com.pokemon_details_api.api.exception;

import java.time.Instant;

public record ErrorResponse(
        Instant timestamp,
        int status,
        String message,
        String path
) {
}
