function idleTimer() {
    let t;
    console.log('it is time to logout');
    //window.onload = resetTimer;
    window.onmousemove = resetTimer; // catches mouse movements
    window.onmousedown = resetTimer; // catches mouse movements
    window.onclick = resetTimer;     // catches mouse clicks
    window.onscroll = resetTimer;    // catches scrolling
    window.onkeypress = resetTimer;  //catches keyboard actions

    function logout() {
        window.location.href = '/logout';  //Adapt to actual logout script
    }

    function reload() {
            window.location = self.location.href;  //Reloads the current page
    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(logout, 5000);  // time is in milliseconds (1000 is 1 second)
        t= setTimeout(reload, 5000);  // time is in milliseconds (1000 is 1 second)
    }
}
console.log('it is time to logout');
idleTimer();