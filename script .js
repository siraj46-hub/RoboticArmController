document.addEventListener("DOMContentLoaded", function() {
    var serverIP = "http://192.168.1.3"; // Replace with your ESP8266's IP address

    function createJoystick(containerId, servo) {
        var joystick = nipplejs.create({
            zone: document.getElementById(containerId),
            mode: 'dynamic',
            position: { left: "50%", top: "50%" }
        });

        joystick.on("move", function(evt, data) {
            if (data.angle) {
                var angle = Math.round(data.angle.degree);
                fetch(`${serverIP}/move?servo=${servo}&angle=${angle}`)
                    .then(response => response.text())
                    .then(console.log)
                    .catch(console.error);
            }
        });
    }

    createJoystick("joystick1", 1);  // Base
    createJoystick("joystick2", 2);  // Shoulder
    createJoystick("joystick3", 3);  // Elbow
    createJoystick("joystick4", 4);  // Wrist
    createJoystick("joystick5", 5);  // Wrist Rotate
    createJoystick("joystick6", 6);  // Grip
});

