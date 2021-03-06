import decode from 'jwt-decode';
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    console.log(token && !this.isTokenExpired(token),'token')
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    //setTimeout(() => window.location.assign('/'), 3000)
  }

  logout() {
    localStorage.removeItem('id_token');
    //setTimeout(window.location.assign('/'), 3000)
    ;
  }
}

export default new AuthService();