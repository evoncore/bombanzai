
class Controls
{

  Keyboard = { 
    key: {
      arrowUp: {
        val: 38,
        action: function() {
          keyArrowUp().pressed();
        }
      },
      arrowDown: {
        val: 40,
        action: function() {
          keyArrowDown().pressed();
        }
      },
      arrowLeft: {
        val: 37,
        action: function() {
          keyArrowLeft().pressed();
        }
      },
      arrowRight: {
        val: 39,
        action: function() {
          keyArrowRight().pressed();
        }
      },
      Spacebar: {
        val: 32,
        action: function() {
          keySpacebar().pressed();
        }
      }
    }
  };

  Joystick = {

  };

}