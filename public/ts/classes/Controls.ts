
class Controls
{

  Keyboard = { 
    key: {
      arrowUp: {
        val: 38, // 87
        action: function() {
          keyArrowUp().pressed();
        }
      },
      arrowDown: {
        val: 40, // 83
        action: function() {
          keyArrowDown().pressed();
        }
      },
      arrowLeft: {
        val: 37, // 65
        action: function() {
          keyArrowLeft().pressed();
        }
      },
      arrowRight: {
        val: 39, // 68
        action: function() {
          keyArrowRight().pressed();
        }
      },
      Spacebar: {
        val: 32,
        action: function() {
          keySpacebar().pressed();
        }
      },
      Pause: {
        val: 80,
        action: function() {
          keyPause().pressed();
        }
      }
    }
  };

  Joystick = {

  };

}