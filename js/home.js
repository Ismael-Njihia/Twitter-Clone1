//checking authentication state
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        const userId = user.uid;

        //getting the time stamp

        const timeStamp = new Date();


        document.getElementById("tweetBtn").onclick = function() {
            const tweet = document.getElementById("tweetInput").value;

            //sending tweet to the database
            const sendTweet = firebase.firestore().collection("tweets").doc();
            sendTweet.set({
                usertweet: tweet,
                userId: userId,
                timeStamp: timeStamp,
                docId: sendTweet.id,

            }).then(() => {
                window.location.reload();
            })

        }

        //onchange of thetweet input

        document.getElementById("tweetInput").onkeyup = function() {
            const tweet = document.getElementById("tweetInput").value;
            if (tweet == "") {
                document.getElementById("disabledBtn").style.display = "block";
                document.getElementById("tweetBtn").style.display = "none";
            } else {
                document.getElementById("disabledBtn").style.display = "none";
                document.getElementById("tweetBtn").style.display = "block";
            }
        }

        //getting the username
        firebase.firestore().collection("users").doc(userId).get().then((doc) => {
                const username = doc.data().userName;

                document.getElementById("username").innerText = username;
            })
            //
        firebase.firestore().collection("users").get().then((usersnapshot) => {
            usersnapshot.forEach((theUser) => {
                let userId = theUser.data().userId;
                let userName = theUser.data().userName;

                //


                if (userId == userId) {

                    firebase.firestore().collection("tweets").get().then((querySnapshot) => {
                        let content = "";
                        querySnapshot.forEach((doc) => {
                            const theTweet = doc.data().usertweet;
                            const theTime = doc.data().timeStamp;

                            const theDate = theTime.toDate().toDateString();

                            content += '<div class="d-flex" style="border-bottom: 1px solid gray; margin-top:20px; padding-left:30px; padding-right:30px;">';

                            content += '<div class="profilePlaceholder"></div>';
                            content += '<div style="margin-left:20px;">';
                            content += '<div class="d-flex">';
                            content += '<h6 style="margin-top:0px";>' + userName + '</h6>';
                            content += '<p style="margin-bottom:0px; margin-left:10px;">' + theDate + '</p>';
                            content += '</div>';
                            content += '<p style="margin-top:0px;">' + theTweet + '</p>';
                            content += '<div id="bottomtweet" class="d-flex"> <p <i class="bi bi-chat"></i> <p <i class="bi bi-arrow-clockwise"></i> <p <i class="bi bi-heart"></i></P></div>';
                            content += '</div>';
                            content += '</div>';


                        })
                        $("#allTweetsContainer").append(content);
                    })
                }
            })
        })

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