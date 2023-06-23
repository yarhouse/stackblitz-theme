export function addWbrToEmailAddress(emailAddress: string) {
    return emailAddress = emailAddress ? emailAddress.replace('@', '<wbr>@') : emailAddress;
}
