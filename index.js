//->Made it by 1vanbrav0
//Variables

document.addEventListener("DOMContentLoaded", function() {
    var audi = document.getElementById("au");
    var playButton = document.getElementById("heart");
    var isPlaying = false;

    playButton.addEventListener("click", function() {
        if (isPlaying) {
            audi.pause();
            isPlaying = false;
        } else {
            audi.play();
            isPlaying = true;
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var scaleCurve = mojs.easing.path(
        "M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0"
    );
    var el = document.querySelector(".button");
    
    // mo.js timeline obj
    var timeline = new mojs.Timeline();

    // burst animation
    var tween1 = new mojs.Burst({
        parent: el,
        radius: { 0: 100 },
        angle: { 0: 45 },
        y: -10,
        count: 10,
        radius: 100,
        children: {
            shape: "circle",
            radius: 30,
            fill: ["red", "white"],
            strokeWidth: 15,
            duration: 500,
        },
    });

    var tween2 = new mojs.Tween({
        duration: 900,
        onUpdate: function (progress) {
            var scaleProgress = scaleCurve(progress);
            el.style.WebkitTransform = el.style.transform =
                "scale3d(" + scaleProgress + "," + scaleProgress + ",1)";
        },
    });

    var tween3 = new mojs.Burst({
        parent: el,
        radius: { 0: 100 },
        angle: { 0: -45 },
        y: -10,
        count: 10,
        radius: 125,
        children: {
            shape: "circle",
            radius: 30,
            fill: ["white", "red"],
            strokeWidth: 15,
            duration: 400,
        },
    });

    // add tweens to timeline:
    timeline.add(tween1, tween2, tween3);

    // when clicking the button start the timeline/animation:
    var button = document.querySelector(".button");
    button.addEventListener("click", function () {
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        } else {
            timeline.play();
            button.classList.add("active");
        }
    });
});

let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

//-> Function that resets the size of the notes.
function recize_notes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all"
      });
    }
  }
}

//-> Main function that enables all the notes.
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%"
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%"
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%"
          });
        }
      }
    });
  }
}

//-> Function that set up the up paper of the envelope.
function set_up_paper() {
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready
  });
}

//-> Function that starts the up paper transition.
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

//-> Function that allows cut the sticker.
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

document.querySelector(".js-sticker").addEventListener("click", sticker);

window.onresize = function (event) {
  recize_notes();
};
