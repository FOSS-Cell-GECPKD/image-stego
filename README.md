# image-stego

[![Join the chat at https://gitter.im/FOSS-Cell-GECPKD/image-stego](https://badges.gitter.im/FOSS-Cell-GECPKD/image-stego.svg)](https://gitter.im/FOSS-Cell-GECPKD/image-stego?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<br>
Image steganography refers to hiding information i.e. text, images or audio files in another image or video files. The current project aims to use steganography for an image with text using bit replacing technique with React. This hidden information can be retrieved only through proper decoding technique.
<br>
Languages used:
<ul>
  <li>
    <a href="https://reactjs.org/">  React Js </a> 
    <ul>
      <li>Javascript</li>
      <li>HTML</li>
      <li>CSS</li>
      <li>
      <a href="https://material-ui.com/"> Material UI Framework </a> 
  </li>
   </ul>
    
 </ul>
 <h3>Working Diagram</h3>
<img src="https://media.geeksforgeeks.org/wp-content/uploads/2-72.png">
Technique of Encryption
<p>
  <h3>LSB based Image steganography:</h3>
    <p>  LSB-Steganography is a steganography technique in which we hide messages inside an image by replacing Least significant bit of image with the bits of message to be hidden.As the LSB is only changed, the human eys cannot detect the changes in it. </p>
    <ul>
      <h3>Encryption Algorithm</h3>
       <li>Begin
        <li>Input: Cover_Image, Secret_Message<!--Secret key--> ;
        <li>Transfer Secret_Message into Text;
  <!--  <li>Zip Text_File;   -->
  <!--  <li>Convert Secret_Key into Binary_Codes; --> 
        <li>Convert Text to Binary_Codes;
        <li>Set BitsPerUnit to Zero;
        <li>Encode Message to Binary_Codes;
        <li>Add by 2 unit for bitsPerUnit;
        <li>Output: Stego_Image;
       <li>End
    </ul>
    <ul>
      <h3>Decryption Algorithm</h3>
       <li>Begin
        <li>Input: Stego_Image
<!--    <li>Compare Secret_Key;  -->
       <li>Calculate BitsPerUnit;
        <li>Decode All_Binary_Codes;
        <li>Shift by 2 unit for bitsPerUnit;
        <li>Convert Binary_Codes to Text;
       <li>Open Text;
        <li>Output Secret_Message;
       <li>End
    </ul>
  </p>
</p>
<pre>
<h4>Function used in steganography.js to encode the message</h4>
  <code>
  // Encodes message using LSB method
  function encodeMessage(colors, message) {
    let messageBits = getBitsFromNumber(message.length);
    messageBits = messageBits.concat(getMessageBits(message));
    let history = [];
    let pos = 0;
    while (pos < messageBits.length) {
      let loc = getNextLocation(history, colors.length);
      colors[loc] = setBit(colors[loc], 0, messageBits[pos]);
      while ((loc + 1) % 4 !== 0) {
        loc++;
      }
      colors[loc] = 255;
      pos++;
    }
  };
</code>
<h4>Function used in steganography.js to decode the message</h4>
<code>
  // Decodes message from the image
  function decodeMessage(colors) {
    let history = [];
    let messageSize = getNumberFromBits(colors, history);
    if ((messageSize + 1) * 16 > colors.length * 0.75) {
      return '';
    }
    if (messageSize === 0) {
      return '';
    }
    let message = [];
    for (let i = 0; i < messageSize; i++) {
      let code = getNumberFromBits(colors, history);
      message.push(String.fromCharCode(code));
    }
    return message.join('');
  };
</code>
</pre>
<hr>
<h3>Contributions</h3>

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.
To get this project, Follow the steps (It's Open and free :P )
<p>
<ul>1. Fork the Project
<br> <br>
2. Clone it <code>git clone https://github.com/yourrepo/image-stego.git</code>
<p>
  After cloning, Setup the local machine with requirements (Exclude those which you already have)
  <ul>
    <li>Enter <b>npm i</b> to install the needed node modules (Wait for completion)</li>
    <li>Enter <b>npm start</b> (Wait for some time and your localhost will wake up)</li>
  </ul>
</p>
3. Create your Feature Branch <code>git checkout -b feature/changedFeature</code>
<br> <br>
4. Commit your Changes <code>git commit -m 'Add some AmazingFeature'</code>
<br> <br>
5. Push to the Branch <code>git push origin feature/changedFeature</code>
<br> <br>
6. Open a Pull Request
 <br> <br>
<img src="https://miro.medium.com/max/624/1*IelAxduwS_YtpsrlRe1d0Q.png">
</p>
<hr>
