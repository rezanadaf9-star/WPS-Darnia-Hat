/* =========================================================
   JITSI PTM MEETING
   ========================================================= */

let jitsiApi = null;
let meetingJoined = false;


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const joinJitsiBtn =
    document.getElementById("joinJitsiBtn");

const topJoinButton =
    document.getElementById("topJoinButton");

const jitsiContainer =
    document.getElementById("jitsi-container");

const jitsiPlaceholder =
    document.getElementById("jitsiPlaceholder");

const meetingStatus =
    document.getElementById("meetingStatus");

const meetingCameraIcon =
    document.getElementById("meetingCameraIcon");


/* =========================================================
   CAMERA WAVE ANIMATION
   ========================================================= */

function setMeetingLive() {

    if (meetingCameraIcon) {
        meetingCameraIcon.classList.add("meeting-live");
    }

}


function setMeetingOffline() {

    if (meetingCameraIcon) {
        meetingCameraIcon.classList.remove("meeting-live");
    }

}


/* =========================================================
   RESTORE CUSTOM SCHOOL MEETING SCREEN
   ========================================================= */

function restoreOwnMeetingScreen() {

    if (jitsiApi) {

        try {
            jitsiApi.dispose();
        } catch (error) {
            console.log("Jitsi dispose error:", error);
        }

        jitsiApi = null;
    }


    jitsiContainer.innerHTML = "";

    jitsiContainer.style.display = "none";

    jitsiPlaceholder.style.display = "flex";


    meetingStatus.textContent = "Not joined";

    meetingStatus.classList.remove("connected");


    meetingJoined = false;


    // Stop camera wave animation
    setMeetingOffline();

}


/* =========================================================
   START EMBEDDED JITSI MEETING
   ========================================================= */

function joinMeeting() {

    if (meetingJoined) {
        return;
    }


    if (
        typeof JitsiMeetExternalAPI === "undefined"
    ) {

        alert(
            "Jitsi is still loading. Please try again."
        );

        return;
    }


    meetingJoined = true;


    // Hide custom placeholder
    jitsiPlaceholder.style.display = "none";


    // Show embedded Jitsi
    jitsiContainer.style.display = "block";


    meetingStatus.textContent = "Connecting...";


    const domain = "meet.jit.si";


    /* =====================================================
       JITSI CONFIGURATION
       ===================================================== */

    const options = {

        roomName: "WelcomePublicSchoolPTM2026",

        width: "100%",

        height: "100%",

        parentNode: jitsiContainer,


        userInfo: {
            displayName: "Parent"
        },


        configOverwrite: {

            // Disable pre-join screen
            prejoinConfig: {
                enabled: false
            },

            // Prevent app/deep-link redirection
            disableDeepLinking: true,

            // Disable Jitsi welcome page
            enableWelcomePage: false,

            // Camera and microphone
            startWithAudioMuted: false,

            startWithVideoMuted: false,

            // Hide lobby button
            securityUi: {
                hideLobbyButton: true
            },

            // Cleaner interface
            disableModeratorIndicator: true,

            hideConferenceSubject: true,

            hideConferenceTimer: true,

            disableInviteFunctions: true,

            disableChat: false
        },


        interfaceConfigOverwrite: {

            SHOW_JITSI_WATERMARK: false,

            SHOW_WATERMARK_FOR_GUESTS: false,

            SHOW_BRAND_WATERMARK: false,

            SHOW_POWERED_BY: false,

            MOBILE_APP_PROMO: false,

            HIDE_DEEP_LINKING_LOGO: true,

            HIDE_INVITE_MORE_HEADER: true,

            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,

            DISABLE_RINGING: true
        }

    };


    /* =====================================================
       CREATE JITSI INSTANCE
       ===================================================== */

    jitsiApi =
        new JitsiMeetExternalAPI(
            domain,
            options
        );


    /* =====================================================
       CURRENT USER SUCCESSFULLY JOINED
       ===================================================== */

    jitsiApi.addEventListener(
        "videoConferenceJoined",
        function () {

            meetingStatus.textContent = "Connected";

            meetingStatus.classList.add("connected");


            /*
             * Activate camera wave animation.
             *
             * Note: At this moment Jitsi is visible,
             * so the custom placeholder is hidden.
             */

            setMeetingLive();

        }
    );


    /* =====================================================
       PARTICIPANT JOINED
       ===================================================== */

    jitsiApi.addEventListener(
        "participantJoined",
        function (event) {

            console.log(
                "Participant joined:",
                event
            );

            /*
             * A participant has entered the room.
             * Keep meeting status live.
             */

            meetingStatus.textContent = "Live now";

            setMeetingLive();

        }
    );


    /* =====================================================
       PARTICIPANT LEFT
       ===================================================== */

    jitsiApi.addEventListener(
        "participantLeft",
        function (event) {

            console.log(
                "Participant left:",
                event
            );

        }
    );


    /* =====================================================
       USER LEAVES THE MEETING
       ===================================================== */

    jitsiApi.addEventListener(
        "videoConferenceLeft",
        function () {

            restoreOwnMeetingScreen();

        }
    );


    /* =====================================================
       JITSI CLOSE EVENT
       ===================================================== */

    jitsiApi.addEventListener(
        "readyToClose",
        function () {

            restoreOwnMeetingScreen();

        }
    );


    /* =====================================================
       JITSI ERROR HANDLER
       ===================================================== */

    jitsiApi.addEventListener(
        "errorOccurred",
        function (error) {

            console.log(
                "Jitsi error:",
                error
            );

        }
    );

}


/* =========================================================
   JOIN PTM BUTTON
   ========================================================= */

if (joinJitsiBtn) {

    joinJitsiBtn.addEventListener(
        "click",
        joinMeeting
    );

}


/* =========================================================
   TOP JOIN MEETING BUTTON
   ========================================================= */

if (topJoinButton) {

    topJoinButton.addEventListener(
        "click",
        function () {

            const meetingSection =
                document.getElementById("ptmMeeting");


            if (meetingSection) {

                meetingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }


            setTimeout(
                joinMeeting,
                500
            );

        }
    );

}


/* =========================================================
   INITIAL STATE
   ========================================================= */

setMeetingOffline();