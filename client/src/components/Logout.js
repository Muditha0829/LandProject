function Logout() {
    localStorage.clear("username");
    window.location = "/signin"
}

export default Logout;