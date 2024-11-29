export function generateRandomText(length){
    const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=,./<?>:|"1234567890';
    let text = '';
    for (let i = 0; i < length; i++) {
        text += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return text;
}

export function generateRandomNr(length){
    const chars = '123456789';
    let number = '';
    for (let i = 0; i < length; i++) {
        number += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return number;
}

export function generateIBAN(countryCode, bankIdentifier, accountLength = 16) {
    if (!/^[A-Z]{2}$/.test(countryCode)) {
        throw new Error('Country code must be 2 uppercase letters.');
    }

    if (!/^[A-Z0-9]+$/.test(bankIdentifier)) {
        throw new Error('Bank identifier must be alphanumeric.');
    }

    const accountNumber = Array.from({ length: accountLength }, () =>
        Math.floor(Math.random() * 10)
    ).join('');

    let iban = `${countryCode}00${bankIdentifier}${accountNumber}`;

    const ibanNumeric = (iban
        .slice(4) + iban.slice(0, 4))
        .replace(/[A-Z]/g, letter => String(letter.charCodeAt(0) - 55));

    const checkDigits = 98n - (BigInt(ibanNumeric) % 97n);

    const formattedCheckDigits = String(checkDigits).padStart(2, '0');

    iban = `${countryCode}${formattedCheckDigits}${bankIdentifier}${accountNumber}`;

    return iban;
}