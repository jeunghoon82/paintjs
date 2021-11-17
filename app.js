const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const BASIC_COLOR = "#2c2c2c";
const FOCUS = "onFocus";
canvas.width = 700;
canvas.height = 600;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = BASIC_COLOR;
ctx.fillStyle = BASIC_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;

function stopPainting(e) {
  painting = false;
}
function startPainting(e) {
  if (e.button == 0) {
    if (!filling) {
      painting = true;
    } else {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}
function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleColor(e) {
  const color = e.target.style.backgroundColor;
  const prevFoucs = document.querySelector(`.${FOCUS}`);
  prevFoucs.classList.remove(FOCUS);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  e.target.classList.add(FOCUS);
}
function handleRange(e) {
  const size = e.target.value;
  const rangeView = document.getElementById("rangeView");
  ctx.lineWidth = size;
  rangeView.innerText = ` [${size}]`;
}
function handleModeClick() {
  if (filling == true) {
    filling = false;
    mode.innerText = "선";
  } else {
    filling = true;
    mode.innerText = "칠하기";
  }
}
function handleRCM(e) {
  e.preventDefault();
}
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}
function handleClearClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleRCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColor)
);

if (range) {
  range.addEventListener("input", handleRange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}
