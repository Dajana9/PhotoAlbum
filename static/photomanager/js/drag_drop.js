console.log('test')

const fileUpload = document.querySelector('.js-image-upload')
const imagePreview = document.querySelector('.js-preview')
const container = document.querySelector("#container");

var activeItem = null;
var image_rotation = 0 
var active = false; //for drag
var flag = 0 //check if key clicked after/before drag/drop
var counter = 0; //for image id

fileUpload.addEventListener('change', add_image)

function add_image(event) {
  const uploadedFiles = fileUpload.files;
  if (uploadedFiles.length === 0) return;
  for (i = 0; i < uploadedFiles.length; i++) {
    const imageFile = uploadedFiles[i];
    const image = document.createElement('img');
    image.src = window.URL.createObjectURL(imageFile);
    counter++;
    image.id = counter;
    imagePreview.append(image);
    image.xOffset = getRndInteger(-100,100)
    image.yOffset = getRndInteger(-50,50)
    image.rotate = getRndInteger(0,50);
    image.scale = 1;
    setTranslate(image);

    image.addEventListener("mousedown", dragStart, false);
    image.addEventListener("mouseup", dragEnd, false);
    image.addEventListener("mouseover", onMouseoverImage);
    image.addEventListener("mouseout", onMouseoutImage);
  }
  // send imageFile to server
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function onMouseoutImage(e){
  e.target.classList.remove("hovered");
  window.removeEventListener("keydown", keyDown, false);

}

function keyDown(e,activeItem){
  var key = e.keyCode || e.charCode;
  if (flag === 0 && activeItem) {
    if (key == '82'){
      activeItem.rotate += 10;
      setTranslate(activeItem);
    }
    if (key == '87'){
      activeItem.rotate -= 10;
      setTranslate(activeItem);
    }
    if (key == '107'){
      activeItem.scale += 0.1;
      setTranslate(activeItem);
    }
    if (key == '109'){
      activeItem.scale -= 0.1;
      setTranslate(activeItem);
    }
    if (key == '46'){
      deleteImage(activeItem);
    }
  }
}

function onMouseoverImage(e) {
  activeItem = e.target;
  e.target.classList.add("hovered");
  console.log('mouseover', activeItem);
  window.onkeydown = function(event) {
    keyDown(event,activeItem);
  }
}

function dragStart(e) {
  flag = 1
  active = true;
  activeItem = e.target;
  if (activeItem){
    if (!activeItem.xOffset) {
      activeItem.xOffset = 0;
    }
    if (!activeItem.yOffset) {
      activeItem.yOffset = 0;
    }       
    activeItem.initialX = e.clientX - activeItem.xOffset;
    activeItem.initialY = e.clientY - activeItem.yOffset;
    activeItem.ondragstart = function(e) {
      return false;
    };
    activeItem.onmousemove = function(e) {
        drag(e);
     }
  }
}

function dragEnd(e) {
  flag = 0
  if (activeItem){
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;
    //check if it is overflowen and than +1
    isOverflown(activeItem);  
    active = false;
  }

}

function drag(e) {
  if (active){
    activeItem.currentX = e.clientX - activeItem.initialX;
    activeItem.currentY = e.clientY - activeItem.initialY;

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem);
  }
}

function setTranslate(e) {
  e.style.transform = "translate3d(" + e.xOffset + "px, " + e.yOffset + "px, 0)";
  e.style.transform += "rotate(" + e.rotate +"deg)";
  e.style.transform += "scale(" + e.scale +")";
}

function isOverflown(e) {
  e.style.zIndex += 1
}

function deleteImage(e) {
  var img_del = document.getElementById(e.id);
  img_del.parentNode.removeChild(img_del);
}