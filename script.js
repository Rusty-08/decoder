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
	// Ensure that shift is within the range 0-25
	shift = shift % 26;
	// Convert the input string to uppercase and split it into an array of characters
	const input = str.toUpperCase().split('');
	// Create an empty array to store the output characters
	const output = [];
	// Iterate over each character in the input array
	input.forEach(char => {
	  // Check if the character is a letter
	  if (char.match(/[A-Z]/)) {
		// Convert the character code to the range 0-25
		const charCode = char.charCodeAt(0) - 65;
		// Apply the shift and wrap around if necessary
		const shiftedCharCode = (charCode + shift + 26) % 26;
		// Convert the shifted character code back to a letter and add it to the output array
		const shiftedChar = String.fromCharCode(shiftedCharCode + 65);
		output.push(shiftedChar);
	  } else {
		// If the character is not a letter, add it to the output array without shifting
		output.push(char);
	  }
	});
	// Join the output array into a single string and return it
	return output.join('');
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

