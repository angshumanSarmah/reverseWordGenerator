// Get the current page URL
const currentUrl = window.location.href;
console.log(currentUrl)
// Get all navigation links
const navLinks = document.querySelectorAll('nav ul li a');
console.log(navLinks)

// Loop through each navigation link
navLinks.forEach(link => {
  // Check if the link's href matches the current URL
  if (link.href === currentUrl) {
    // Add the "selected" class to the matching link
    link.parentNode.classList.add('selected');
  }
});


function clearContent() {
    const textarea = document.getElementById("textArea");
    textarea.value = "";
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
    }

    textarea.value = reversedText;
    showToast('converted');
  }

  function showToast(type) {
    document.getElementById(`toast-cleared`).classList.remove();
    document.getElementById(`toast-converted`).classList.remove();
    
    const toast = document.getElementById(`toast-${type}`);
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000); // Display toast for 3 seconds
  }
