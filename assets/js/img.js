document.querySelectorAll("#galery img").forEach(function (self) {
  self.addEventListener("mouseenter", function () {
    document.querySelector("#big_img").src = self.src;
    document.querySelector("#big_img").classList = "big";
  });
});

document.querySelectorAll("#galery img").forEach(function (self) {
  self.addEventListener("mouseleave", function () {
    document.querySelector("#big_img").src = self.src;
    document.querySelector("#big_img").classList = "inv";
  });
});
