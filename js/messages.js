firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //get the Id of the logged user

        let userId = user.uid;
        //get the timeStamp
        let timeStamp = new Date().getTime();
        //Pull all the users
        firebase.firestore().collection("users").get().then((querySnapshot) => {
            let content = "";
            querySnapshot.forEach((doc) => {

                let FullName = doc.data().userName;
                //console.log(FullName, userId);
                let profileImage = doc.data().profileImage;
                let userId = doc.data().userId;

                content += '<div class="messUserCont" onclick="viewUser(\'' + userId + '\')">';
                content += '<div class="messImgCont">';
                content += '<img src="' + profileImage + '">';
                content += '</div>';
                content += '<div>';
                content += '<h6>' + FullName + '</h6>';
                content += '<p><i class="fa fa-envelope-o" aria-hidden="true"></i></p>'

                content += '</div>';
                content += '</div>';
            })
            $("#showAllUsers").append(content)
        })

        //run view user function
        window.viewUser = function(value) {
            firebase.firestore().collection("users").doc(value).get().then((doc) => {

                    let FullName = doc.data().userName;
                    let profileImage = doc.data().profileImage;

                    document.getElementById("messageUserName").innerText = FullName;
                    document.getElementById("messageUserPic").src = profileImage


                })
                //send message
            document.getElementById("messageButton").onclick = function() {
                let messageInput = document.getElementById("messageInput").value;
                if (messageInput == " ") {
                    document.getElementById("messageButton").style.display = "none";
                }

                let sendMessage = firebase.firestore().collection("messages").doc();
                sendMessage.set({
                    messageTo: value,
                    messageFrom: userId,
                    timeStamp: timeStamp,
                    docId: sendMessage.id,
                    isRead: false,
                    message: messageInput
                }).then(() => {
                    alert("Message sent");
                    window.location.href = "messages.html" + "?" + value;
                })
            }

            //get the messages
            let readMsgUserId = decodeURIComponent(window.location.search);
            let readMsgUserIdRcd = readMsgUserId.substring(1);
            //summn firebase
            firebase.firestore().collection("users").doc(readMsgUserIdRcd).get().then((doc) => {
                    let fullname = doc.data().userName;
                    let profImage = doc.data().profileImage;

                    document.getElementById("messageUserName").innerText = fullname;
                    document.getElementById("messageUserPic").src = profImage
                })
                //read the messages
            firebase.firestore().collection("messages").get().then((querySnapshot) => {
                let content = "";
                querySnapshot.forEach((doc) => {
                    let message = doc.data().message;
                    let messageFrom = doc.data().messageFrom;
                    let messageTo = doc.data().messageTo;

                    if (messageFrom == userId && messageTo == readMsgUserIdRcd) {
                        content += '<div class="myMsgSent">'
                        content += '<p>' + message + '</p>'
                        content += '</div>'
                    } else if (messageTo == userId && messageFrom == readMsgUserIdRcd) {
                        content += '<div class="myMsgReceived">'
                        content += '<p>' + message + '</p>'
                        content += '</div>'

                    }
                })
                $("#allmessages").append(content)
            })


        }


    } else {
        window.location.href = "login.html";
    }
})