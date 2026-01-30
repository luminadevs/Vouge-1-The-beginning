const NOTICE_KEY = 'vouge_notice_seen';
const noticePopup = document.getElementById('noticePopup');

if (noticePopup && localStorage.getItem(NOTICE_KEY) !== 'seen') {
  noticePopup.style.display = 'grid';
}

window.closeNotice = function() {
  localStorage.setItem(NOTICE_KEY, 'seen');
  if (noticePopup) noticePopup.style.display = 'none';
};