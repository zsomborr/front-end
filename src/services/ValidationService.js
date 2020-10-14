export default class ValidationService {
  isValidUsername(input) {
    return /^[a-zA-Z0-9_]*$/.test(this._normalize(input));
  }

  isValidLastName(input) {
    return this._isOnlyLetters(input);
  }

  isValidFirstName(input) {
    return this._isOnlyLetters(input);
  }

  isValidPassword(input) {
    return /(?=[A-Za-z0-9@!@#$%&*()\-+=^]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*()\-+=^]).*$/.test(
      String(input)
    );
  }

  _isOnlyLetters(input) {
    return /^[a-zA-Z]+$/.test(this._normalize(input));
  }

  _normalize(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
