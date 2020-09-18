function loadImage(e) {
  let reader = new FileReader();
  reader.onload = (event) => {
    let dataUrl = event.target.result;
    let img = new Image();
    img.onload = () => {
      let ctx = document.getElementById('canvas').getContext('2d');
      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    img.src = dataUrl;
  };
  reader.readAsDataURL(e.target.files[0]);
};

function encode() {
  document.getElementById('encoded-image').style.display = 'block';
  let message = document.getElementById('secret').value;
  document.getElementById('secret').value = '';
  let output = document.getElementById('encoded-image');
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  let hash = ' ';
  encodeMessage(imgData.data, hash, message);
  ctx.putImageData(imgData, 0, 0);
  alert('Image encoded!\n Save below image for further use!');
  output.src = canvas.toDataURL();
};

function decode() {
  let password = ' '; // document.getElementById('decode-password').value;
  let ctx = document.getElementById('canvas').getContext('2d');
  let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  let message = decodeMessage(imgData.data, password);
  alert(message);
};

function encodeMessage(colors, hash, message) {
  let messageBits = getBitsFromNumber(message.length);
  messageBits = messageBits.concat(getMessageBits(message));
  let history = [];
  let pos = 0;
  while (pos < messageBits.length) {
    let loc = getNextLocation(history, hash, colors.length);
    colors[loc] = setBit(colors[loc], 0, messageBits[pos]);
    while ((loc + 1) % 4 !== 0) {
      loc++;
    }
    colors[loc] = 255;
    pos++;
  }
};

function decodeMessage(colors, hash) {
  let history = [];
  let messageSize = getNumberFromBits(colors, history, hash);
  if ((messageSize + 1) * 16 > colors.length * 0.75) {
    return '';
  }
  if (messageSize === 0) {
    return '';
  }
  let message = [];
  for (let i = 0; i < messageSize; i++) {
    let code = getNumberFromBits(colors, history, hash);
    message.push(String.fromCharCode(code));
  }
  return message.join('');
};

function getBit(number, location) {
  return ((number >> location) & 1);
};

// sets the bit in 'location' to 'bit' (either a 1 or 0)
function setBit(number, location, bit) {
  return (number & ~(1 << location)) | (bit << location);
};

// returns an array of 1s and 0s for a 2-byte number
function getBitsFromNumber(number) {
  let bits = [];
  for (let i = 0; i < 16; i++) {
    bits.push(getBit(number, i));
  }
  return bits;
};

// returns the next 2-byte number
function getNumberFromBits(bytes, history, hash) {
  let number = 0,
    pos = 0;
  while (pos < 16) {
    let loc = getNextLocation(history, hash, bytes.length);
    let bit = getBit(bytes[loc], 0);
    number = setBit(number, pos, bit);
    pos++;
  }
  return number;
};

// returns an array of 1s and 0s for the string 'message'
function getMessageBits(message) {
  let messageBits = [];
  for (let i = 0; i < message.length; i++) {
    let code = message.charCodeAt(i);
    messageBits = messageBits.concat(getBitsFromNumber(code));
  }
  return messageBits;
};

// gets the next location to store a bit
function getNextLocation(history, hash, total) {
  let pos = history.length;
  let loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total;
  while (true) {
    if (loc >= total) {
      loc = 0;
    } else if (history.indexOf(loc) >= 0) {
      loc++;
    } else if ((loc + 1) % 4 === 0) {
      loc++;
    } else {
      history.push(loc);
      return loc;
    }
  }
};

export {decode, encode, loadImage};