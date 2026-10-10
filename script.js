const videos = document.querySelectorAll('video');
videos.forEach(video => video.addEventListener('play', () => {
  videos.forEach(other => { if (other !== video) other.pause(); });
}));
function jumpTo(video, time) {
  video.currentTime = time;
  video.scrollIntoView({behavior: 'auto', block: 'center'});
  video.play().catch(() => { video.focus(); });
}
document.querySelectorAll('.chapters').forEach(list => {
  const video = document.getElementById(list.dataset.video);
  const chapters = Array.from(list.querySelectorAll('button[data-time]'));
  chapters.forEach(button => {
    button.setAttribute('aria-label', `Jump to ${button.textContent}: ${button.nextElementSibling?.textContent || ''}`);
    button.addEventListener('click', () => jumpTo(video, Number(button.dataset.time)));
  });
  video.addEventListener('timeupdate', () => {
    chapters.forEach((button, index) => {
      const current = video.currentTime >= Number(button.dataset.time) && (!chapters[index + 1] || video.currentTime < Number(chapters[index + 1].dataset.time));
      button.parentElement.classList.toggle('current', current);
      if (current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  });
});
document.querySelectorAll('.seen button[data-video]').forEach(button => {
  const video = document.getElementById(button.dataset.video);
  button.setAttribute('aria-label', `Play ${video.getAttribute('aria-label')} from ${button.textContent}`);
  button.addEventListener('click', () => jumpTo(video, Number(button.dataset.time)));
});
