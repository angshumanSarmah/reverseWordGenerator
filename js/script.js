function clearContent() {
  const textarea = document.getElementById("textArea");
  const convertedText = document.getElementById("converted-text");
  textarea.value = "";
  convertedText.value = "";
  showToast('cleared')
}

function convertContent() {
  const textarea = document.getElementById("textArea");
  const text = textarea.value;

  // Get the selected reverse type (words or sentence)
  const reverseType = document.querySelector('input[name="reverseType"]:checked').value;

  let reversedText = "";
  if (reverseType === "words") {
    // Reverse only the words
    const words = text.split(" ");
    reversedText = words.map(word => word.split("").reverse().join("")).join(" ");
  } else if (reverseType === "sentence") {
    // Reverse the whole sentence
    reversedText = text.split("").reverse().join("");
  } else if (reverseType === 'flipWords') {
    reversedText = flipWords(text)
  }
  const convertedText = document.getElementById("converted-text");

  convertedText.value = reversedText;
  showToast('converted');
}

function showToast(type) {
  document.getElementById(`toast-cleared`).classList.remove();
  document.getElementById(`toast-converted`).classList.remove();
  document.getElementById(`toast-copied`).classList.remove();


  const toast = document.getElementById(`toast-${type}`);
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // Display toast for 3 seconds
}


function flipWords(text) {
  const words = text.split(' ');

  // mapping for flipping characters upside down
  const flipChars = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ı', j: 'ɾ', k: 'ʞ', l: 'ʃ', m: 'ɯ', n: 'u', o: 'o', p: 'd',
    q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z', A: '∀', B: 'B', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ',
    G: 'פ', H: 'H', I: 'I', J: 'ſ', K: '⋊', L: '⅂', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ',
    W: 'M', X: 'X', Y: '⅄', Z: 'Z', 0: '0', 1: '⇂', 2: 'ᄅ', 3: 'Ɛ', 4: 'ㄣ', 5: 'ϛ', 6: '9', 7: 'ㄥ', 8: '8', 9: '6', '.': '˙',
    ',': "'", "'": ',', '"': ',,', '`': ',', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
    '<': '>', '>': '<', '&': '⅋', _: '‾', '-': '-', '+': '˛', '=': 'Ǝ', '*': '*', '/': '/', '\\': '\\', '|': '|', '@': '@',
    '#': '#', $: '$', '%': '%', '^': '⌣', '&': '⅋', '~': '~', ';': '؛', ':': ':', '\n': '\n', '\r': '\r', '\t': '\t', ' ': ' '
  };

  const flippedWords = words.map(word => {
    const flippedChars = [...word].map(char => flipChars[char] || char);
    return flippedChars.reverse().join('');
  });

  const flippedSentence = flippedWords.join(' ');

  return flippedSentence;
}


function copyContent() {
  const value = document.getElementById("converted-text").value;
  const copyText = document.createElement("textarea");
  copyText.value = value;
  copyText.style.position = "fixed";
  copyText.style.top = "-1000vh";
  document.body.append(copyText)
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  copyText.remove();
  showToast('copied');
}

function shareCOntent() {
  const selectedOption = document.getElementById('shareOption').value;
  const content = document.getElementById('converted-text').value;

  if (selectedOption === 'whatsapp') {
      shareOnWhatsApp(content);
  } else if (selectedOption === 'link') {
      shareLink();
  } else if (selectedOption === 'mail') {
      shareInMail(content);
  }
}

function shareOnWhatsApp(content) {
  const encodedContent = encodeURIComponent(content);
  window.location.href = `whatsapp://send?text=${encodedContent}`;
}

function shareLink() {
  const urlToShare = window.location.href;

  if (navigator.share) {
      navigator.share({
          title: document.title,
          url: urlToShare
      })
      .then(() => {
          console.log('Link shared successfully!');
      })
      .catch((error) => {
          console.error('Error sharing link:', error);
      });
  } else {
      alert('Link sharing is not supported in this browser.');
  }
}

function shareInMail(content) {
  const subject = 'Shared content from https://reverseword.com/';
  const body = content;
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}