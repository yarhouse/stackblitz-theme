import { HttpErrorResponse } from '@angular/common/http';

/**
 * Inspects an `HttpErrorResponse` from an Allogy java service for a `developerMessage` property value
 * to be output to the console, and returns one of 3 messages:
 *
 * • The java service `userMessage`, if it exists
 *
 * • An optional `altMsg` if a `userMessage` does not exist
 *
 * • A generic catch-all message of "An unknown error occurred"
 */
export function httpErrMsgs(error: HttpErrorResponse, altMsg: string = 'An unknown error occurred'): string {
    if (error.error?.developerMessage) {
        console.error(error.status, error.error.developerMessage);
    }
    return error.error?.userMessage ? `${error.status}: ${error.error?.userMessage}` : altMsg;
}
