const COOKIE_KEY = 'vouge_cookies_consent';
const cookiePopup = document.getElementById('cookiePopup');

if (cookiePopup && localStorage.getItem(COOKIE_KEY) !== 'accepted') {
  cookiePopup.style.display = 'grid';
}

window.acceptCookies = function() {
  localStorage.setItem(COOKIE_KEY, 'accepted');
  if (cookiePopup) cookiePopup.style.display = 'none';
};

window.declineCookies = function() {
  localStorage.setItem(COOKIE_KEY, 'accepted');
  if (cookiePopup) cookiePopup.style.display = 'none';
};