var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");

var buildUrl = "Build";
      var loaderUrl = buildUrl + "/Forming.loader.js";
      var config = {
        dataUrl: buildUrl + "/Forming.data.unityweb",
        frameworkUrl: buildUrl + "/Forming.framework.js.unityweb",
        codeUrl: buildUrl + "/Forming.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "EDPOMP",
        productName: "Forming",
        productVersion: "0.1",
      };

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {

  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
  document.getElementsByTagName('head')[0].appendChild(meta);
  container.className = "unity-mobile";
  canvas.className = "unity-mobile";
  unityShowBanner('WebGL builds are not supported on mobile devices.');
} else {
  canvas.style.width = "60%";
  canvas.style.height = "100%";
}

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
  }).then((unityInstance) => {

  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);