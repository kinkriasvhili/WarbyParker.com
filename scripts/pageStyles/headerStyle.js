export function headerStyle() {
  // Select elements for EyeGlasses
  const buttonEyeGlasses = document.getElementById("eyeGlassesBtn-js");
  const windowEyeGlasses = document.getElementById("windoweyeGlasses-js");

  // Select elements for SunGlasses
  const buttonSunGlasses = document.getElementById("EyeGlasses-js");
  const windowSunGlasses = document.getElementById("windowsunGlasses-js");

  // select elements for getPrescription
  const buttongetPrescription = document.getElementById(
    "getPrescriptionBtn-js"
  );
  const windowgetPrescription = document.getElementById(
    "windowgetPrescription-js"
  );

  //header middle
  const middleHeaderElement = document.querySelector(".header-middle");
  // Function to toggle visibility
  function toggleWindow(button, window, classNameOn, classNameOff) {
    if (!window.classList.add(classNameOn)) {
      window.classList.add(classNameOn);
    } else {
      window.classList.remove(classNameOn);
    }
  }

  // Function to handle clicks outside
  function handleClickOutside(event) {
    // Check for EyeGlasses
    if (
      !windowEyeGlasses.contains(event.target) &&
      !buttonEyeGlasses.contains(event.target)
    ) {
      if (windowEyeGlasses.classList.contains("show-window-eyeGlasses")) {
        windowEyeGlasses.classList.remove("show-window-eyeGlasses");
        windowEyeGlasses.classList.add("show-window-eyeGlasses-off");
      }
    }

    // Check for SunGlasses
    if (
      !windowSunGlasses.contains(event.target) &&
      !buttonSunGlasses.contains(event.target)
    ) {
      if (windowSunGlasses.classList.contains("show-window-sunGlasses")) {
        console.log("hello");
        windowSunGlasses.classList.remove("show-window-sunGlasses");
        windowSunGlasses.classList.add("show-window-sunGlasses-off");
      }
    }

    // Check for getPrescription
    if (
      !windowgetPrescription.contains(event.target) &&
      !buttongetPrescription.contains(event.target)
    ) {
      if (
        windowgetPrescription.classList.contains("show-window-getPrescription")
      ) {
        windowgetPrescription.classList.remove("show-window-getPrescription");
        windowgetPrescription.classList.add("show-window-getPrescription-off");
      }
    }
  }
  // Add event listeners to buttons

  buttonEyeGlasses.addEventListener("click", () =>
    toggleWindow(
      buttonEyeGlasses,
      windowEyeGlasses,
      "show-window-eyeGlasses",
      "show-window-eyeGlasses-off"
    )
  );
  buttonSunGlasses.addEventListener("click", () =>
    toggleWindow(
      buttonSunGlasses,
      windowSunGlasses,
      "show-window-sunGlasses",
      "show-window-sunGlasses-off"
    )
  );
  buttongetPrescription.addEventListener("click", () =>
    toggleWindow(
      buttongetPrescription,
      windowgetPrescription,
      "show-window-getPrescription",
      "show-window-getPrescription-off"
    )
  );
  // Add event listener to document for clicks outside
  document.addEventListener("click", handleClickOutside);

  const menuIcon = document.getElementById("menu-icon");
  menuIcon.addEventListener("click", function () {
    if (menuIcon.classList.contains("fa-bars")) {
      middleHeaderElement.classList.add("header-middle-on");
      document.body.style.overflow = "hidden";
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-x");
    } else {
      middleHeaderElement.classList.remove("header-middle-on");
      document.body.style.overflow = "auto";

      menuIcon.classList.remove("fa-x");
      menuIcon.classList.add("fa-bars");
    }
  });

  // button choose
  const chooseButtons = document.querySelectorAll(".btn-choose-glasses");
  chooseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!button.classList.contains("active")) {
        chooseButtons.forEach((button) => {
          if (button.classList.contains("active")) {
            button.classList.remove("active");
          }
        });
        button.classList.add("active");
      }
    });
  });
}
