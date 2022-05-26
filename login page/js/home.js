//checking authentication state
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        //if the user is loggen in, do the below task
        console.log("user is logged in")
    } else {
        //if user is not logged in, do the below task
        console.log("user is not logged in")
        window.location.href = "index.html";
    }
})

//signing out a user
document.getElementById("logout").onclick = function() {

    firebase.auth().signOut().then(() => {
        alert("User logged out successfully")
        window.location.href = "index.html";
    })
}