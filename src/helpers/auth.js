export const isAuthenticated = () =>{
    let user = JSON.parse(localStorage.getItem('user'));
    return !!user;
}