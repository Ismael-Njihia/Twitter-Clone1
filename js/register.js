//sign up a user onclick of the signup button
document.getElementById("signUp").onclick = function() {

    //get data from input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    //hide the sign up button
    document.getElementById("signUp").style.display = "none";

    //show signing in button
    document.getElementById("signingUp").style.display = "block";

    //run a firebase function to sign up the user
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred) => {

        const theuserId = userCred.user.uid;

        firebase.firestore().collection("users").doc(theuserId).set({
            userEmail: email,
            userName: username,
            userId: theuserId

        }).then(() => {
            //if the sign up is successful redirect to home page
            window.location.href = "home.html";
        })

    }).catch((error) => {
        //if user is not successfully signed up, we are going to catch the error message

        //getting the exact error message
        const mss = error.message;

        //showing the error message on Bootsrap's toast
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)

        document.getElementById("toast-body").innerText = mss
        toast.show()

        //showing the signup button
        document.getElementById("signUp").style.display = "block";

        //hiding the signing up button
        document.getElementById("signingUp").style.display = "none";


    })

}