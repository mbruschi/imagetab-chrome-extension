var keywords_input = document.getElementById('imagekeywords');
var status_output = document.getElementById('status');

function saveOptionsToChromeStorage() {
  keywords_input.disabled = true;
  chrome.storage.sync.set({
    imagekeywords: keywords_input.value
  }, function () {
    keywords_input.disabled = false;
    status_output.textContent = 'Options saved.';
    setTimeout(function () {
      status_output.textContent = '';
    }, 2000);
  });
}

function restoreOptionsFromChromeStorage() {
  chrome.storage.sync.get({
    imagekeywords: 'mountain'
  }, function (items) {
    keywords_input.value = items.imagekeywords;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptionsFromChromeStorage);
document.getElementById('save').addEventListener('click', saveOptionsToChromeStorage);