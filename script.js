const fileInput = document.getElementById('file');
const encryption = document.getElementById('encryption');
const decryption = document.getElementById('decryption');
const filePreview = document.getElementById('file-preview');
const downloadButton = document.getElementById('download');

function previewTextFile() {
	const reader = new FileReader();
	const file = fileInput.files[0];
	reader.readAsText(file);
	reader.onload = function() {
	  filePreview.textContent = reader.result;
	};
}
function caesarCipher(str, shift) {
	let result = "";
	for (let i = 0; i < str.length; i++) {
	  let charCode = str.charCodeAt(i);
	  let newCharCode;
	  if (charCode >= 48 && charCode <= 57) { // numeric character
		newCharCode = ((charCode - 48 + shift) % 10) + 48; // shift the numeric character code
	  } else if (charCode >= 65 && charCode <= 90) { // uppercase letter
		newCharCode = ((charCode - 65 + shift) % 26) + 65; // shift the uppercase letter code
	  } else if (charCode >= 97 && charCode <= 122) { // lowercase letter
		newCharCode = ((charCode - 97 + shift) % 26) + 97; // shift the lowercase letter code
	  } else { // other character (such as punctuation or whitespace)
		newCharCode = charCode; // leave it unchanged
	  }
	  result += String.fromCharCode(newCharCode);
	}
	return result;
}
function encryptFile() {
	const file = fileInput.files[0];
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function() {
		const plaintext = reader.result;
		const ciphertext = caesarCipher(plaintext, 5);
		filePreview.textContent = ciphertext;
		downloadButton.addEventListener('click', () => {
			const blob = new Blob([ciphertext], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = file.name.replace('.txt', '') + '_encrypted.txt';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		})
	};
  }
function decryptFile() {
	const reader = new FileReader();
	const file = fileInput.files[0];
	reader.readAsText(file);
	reader.onload = function() {
		filePreview.textContent = reader.result;
	};
}

