# Image-steganography
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
 Working Diagram
<img src="https://media.geeksforgeeks.org/wp-content/uploads/2-72.png">
Technique of Encryption
<p>
  <h4>LSB based Image steganography:</h4>
    <p>  LSB-Steganography is a steganography technique in which we hide messages inside an image by replacing Least significant bit of image with the bits of message to be hidden.As the LSB is only changed, the human eys cannot detect the changes in it. </p>
    <ul>
      <h2>Encryption Algorithm</h2>
       <li>Begin
        <li>Input: Cover_Image, Secret_Message<!--Secret key--> ;
        <li>Transfer Secret_Message into Text_File;
  <!--  <li>Zip Text_File;   -->
  <!--  <li>Convert Secret_Key into Binary_Codes; --> 
        <li>Convert Text_File to Binary_Codes;
        <li>Set BitsPerUnit to Zero;
        <li>Encode Message to Binary_Codes;
        <li>Add by 2 unit for bitsPerUnit;
        <li>Output: Stego_Image;
       <li>End
    </ul>
    <ul>
      <h2>Decryption Algorithm</h2>
       <li>Begin
        <li>Input: Stego_Image
<!--    <li>Compare Secret_Key;  -->
       <li>Calculate BitsPerUnit;
        <li>Decode All_Binary_Codes;
        <li>Shift by 2 unit for bitsPerUnit;
        <li>Convert Binary_Codes to Text_File;
       <li>Open Text_File;
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
To get this project, Follow the steps (It's Open and free :P )
<h4> 1) Fork it to your Repo</h4>
<h4> 2) Clone it</h4>
<h4> 3) Bug?, Solve and give a PR :) </h4>
<img src="https://miro.medium.com/max/624/1*IelAxduwS_YtpsrlRe1d0Q.png">

<hr>
[![Join the chat at https://gitter.im/FOSS-Cell-GECPKD/image-stego](https://badges.gitter.im/FOSS-Cell-GECPKD/image-stego.svg)](https://gitter.im/FOSS-Cell-GECPKD/image-stego?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
