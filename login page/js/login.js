//sign up a user onclick of the sign in button
document.getElementById("signIn").onclick = function() {

    //get data from input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //hide the sign in button
    document.getElementById("signIn").style.display = "none";

    //show signing in button
    document.getElementById("signingIn").style.display = "block";

    //run a firebase function to sign up the user
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCred) => {

        //if the sign up is successful redirect to home page
        window.location.href = "home.html";

    }).catch((error) => {
        //if user is not successfully signed in, we are going to catch the error message

        //getting the exact error message
        const mss = error.message;

        //showing the error message on Bootsrap's toast
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)

        document.getElementById("toast-body").innerText = mss
        toast.show()

        //showing the signin button
        document.getElementById("signIn").style.display = "block";

        //hiding the signing up button
        document.getElementById("signingIn").style.display = "none";

    })


}