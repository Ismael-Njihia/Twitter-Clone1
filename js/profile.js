//lets check if a user is logged in
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        const userId = user.uid;

        //const userEmail = user.email;

        //document.getElementById("test").innerText = userId;


        firebase.firestore().collection("users").doc(userId).get().then((doc) => {

                const username = doc.data().userName;
                const bio = doc.data().bio;

                document.getElementById("test").innerText = username;
                // document.getElementById("thetittle").innerHTML = username;
                document.getElementById("profName").innerText = username;
                document.getElementById("profUserNamed").innerText = "@twitter" + username;
                document.getElementById("bio").innerText = bio;

                //fill the edit account page
                document.getElementById("edtname").value = username;
                document.getElementById("edtbio").value = bio;
            })
            //update account
        document.getElementById("saveChanges").onclick = function() {

            var edtName = document.getElementById("edtName").value;
            var edtBio = document.getElementById("edtBio").value;

            //summon firebase
            firebase.firestore().collection("users").doc(userId).update({
                userName: edtName,
                bio: edtBio
            }).then(() => {
                window.location.reload();
            })
        }





    } else {
        window.location.href = "index.html";
    }
})