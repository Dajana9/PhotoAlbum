console.log('test')

const fileUpload = document.querySelector('.js-image-upload')
const imagePreview = document.querySelector('.js-preview')
const container = document.querySelector("#container");
const garbage = document.querySelector('.garbage')

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
    
    setTranslate(getRndInteger(-100,100), getRndInteger(-50,50), image);
    image.rotate = getRndInteger(0,50)
    setRotate(image.rotate, image);

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
}

function onMouseoverImage(e) {
  activeItem = e.target;
  e.target.classList.add("hovered");
  if (flag === 0 && activeItem) {
    if (e.shiftKey){
      image_rotation += e.deltaY
      activeItem.style.transform = "rotate("+image_rotation+"deg)";
    }
    if (e.altKey){
      image_rotation += e.deltaY
      activeItem.style.transform = "scale("+image_rotation+"px)";
    }
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
        drag(e)
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
  helper = activeItem;

  garbage.onmouseover = function(e,helper){
    deleteImage(e,helper);
  }
  activeItem.onmousemove = null
  activeItem = null;
  active = false;
  }

}

function drag(e) {
  if (active){
  activeItem.currentX = e.clientX - activeItem.initialX;
  activeItem.currentY = e.clientY - activeItem.initialY;

  activeItem.xOffset = activeItem.currentX;
  activeItem.yOffset = activeItem.currentY;

  setTranslate(activeItem.xOffset, activeItem.yOffset, activeItem);
  }
}

function setTranslate(xPos, yPos, e) {
  e.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  e.style.transform += "rotate(" + e.rotate +"deg)";
}

function setRotate(degree, e) {
  e.style.transform += "rotate(" + degree +"deg)";
}

function isOverflown(e) {
  e.style.zIndex += 1
}

function deleteImage(e, activeItem) {
  console.log('delete');
  var img_del = document.getElementById(activeItem.id);
  img_del.parentNode.removeChild(img_del);
}