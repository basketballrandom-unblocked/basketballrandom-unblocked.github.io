(function () {
            var cursorLarge = document.getElementById('cursor-large');
            var cursorSmall = document.getElementById('cursor-small');
            if (!cursorLarge && !cursorSmall) return;
            document.addEventListener('mousemove', function (e) {
                var x = e.clientX + 'px';
                var y = e.clientY + 'px';
                if (cursorLarge) {
                    cursorLarge.style.left = x;
                    cursorLarge.style.top = y;
                }
                if (cursorSmall) {
                    cursorSmall.style.left = x;
                    cursorSmall.style.top = y;
                }
            });
        })();
(function () {
    var fsBtn = document.getElementById('enter-fullscreen');
    var exitBtn = document.getElementById('fullscreen-exit');
    var gamePlayer = document.getElementById('game-player') || document.getElementById('test_app_frame');
    var gameIframe = document.getElementById('game-element') || document.getElementById('test_app_frame');

    if (!fsBtn || !gamePlayer) return;

    function isFull() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    }

    function updateButton() {
        if (isFull()) {
            fsBtn.title = 'Exit fullscreen (Esc)';
            fsBtn.setAttribute('aria-label', 'Exit fullscreen');
            // change icon to close if desired
            fsBtn.querySelector('use').setAttribute('xlink:href', '#closeFullscreenIcon');
        } else {
            fsBtn.title = 'Enter fullscreen (F)';
            fsBtn.setAttribute('aria-label', 'Enter fullscreen');
            fsBtn.querySelector('use').setAttribute('xlink:href', '#enterFullscreenIcon');
        }
    }

    function requestFS() {
        var el = gamePlayer;
        if (el.requestFullscreen) return el.requestFullscreen();
        if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
        if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
        if (el.msRequestFullscreen) return el.msRequestFullscreen();
    }

    function exitFS() {
        if (document.exitFullscreen) return document.exitFullscreen();
        if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
        if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
        if (document.msExitFullscreen) return document.msExitFullscreen();
    }

    fsBtn.addEventListener('click', function (e) {
        if (isFull()) exitFS(); else requestFS();
    });

    exitBtn && exitBtn.addEventListener('click', function () { exitFS(); });

    document.addEventListener('keydown', function (e) {
        // Escape to exit fullscreen
        if (e.key === 'Escape') {
            if (isFull()) exitFS();
        }
    });

    // Listen for fullscreen change to update UI
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (evt) {
        document.addEventListener(evt, function () { updateButton(); });
    });

    // --- Refresh and Jump-to-Controls handlers ---
    var refreshBtn = document.getElementById('refresh-game');
    var jumpBtn = document.getElementById('jump-to-controls');

    if (refreshBtn && gameIframe) {
        refreshBtn.addEventListener('click', function () {
            try {
                refreshBtn.disabled = true;
                var src = gameIframe.getAttribute('src');
                // Force reload by resetting src (preserve scroll position)
                gameIframe.setAttribute('src', '');
                // small timeout to allow blanking then restore
                setTimeout(function () { gameIframe.setAttribute('src', src); refreshBtn.disabled = false; }, 50);
            } catch (err) {
                console.error('Refresh failed', err);
                refreshBtn.disabled = false;
            }
        });
    }

    if (jumpBtn) {
        jumpBtn.addEventListener('click', function () {
            var target = document.getElementById('controls') || gameIframe;
            if (!target) return;
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (target === gameIframe) target.focus();
        });
    }

    // --- Share Game handler ---
    var shareBtn = document.getElementById('Share Game');
    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            const url = window.location.href;
            const title = document.title;
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                });
            } else {
                navigator.clipboard.writeText(url).then(function() {
                    alert('Game link copied to clipboard!');
                }).catch(function(err) {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    }

    // Keyboard shortcut: 'r' to refresh iframe (when not typing)
    document.addEventListener('keydown', function (e) {
        var tag = document.activeElement && document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement && document.activeElement.isContentEditable) return;
        if (e.key === 'r' || e.key === 'R') {
            if (refreshBtn) {
                e.preventDefault();
                refreshBtn.click();
            }
        }
    });

    // Initial state
    updateButton();
})();

(function () {
            var cursorLarge = document.getElementById('cursor-large');
            var cursorSmall = document.getElementById('cursor-small');
            if (!cursorLarge && !cursorSmall) return;
            document.addEventListener('mousemove', function (e) {
                var x = e.clientX + 'px';
                var y = e.clientY + 'px';
                if (cursorLarge) {
                    cursorLarge.style.left = x;
                    cursorLarge.style.top = y;
                }
                if (cursorSmall) {
                    cursorSmall.style.left = x;
                    cursorSmall.style.top = y;
                }
            });
        })();


         document.addEventListener('DOMContentLoaded', function() {
            var collapseEl = document.getElementById('navbarSupportedContent');
            if (!collapseEl) return;
            var buttons = document.querySelectorAll('.navbar-toggler, .mobile-search-btn');
            buttons.forEach(function(button) {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    if (window.bootstrap && bootstrap.Collapse) {
                        var instance = bootstrap.Collapse.getOrCreateInstance(collapseEl);
                        instance.toggle();
                    } else {
                        collapseEl.classList.toggle('show');
                        if (!collapseEl.classList.contains('show')) {
                            var activeDropdown = document.querySelector('.category-dropdown.show');
                            if (activeDropdown) {
                                activeDropdown.classList.remove('show');
                            }
                        }
                    }
                });
            });

            var moreToggle = document.querySelector('.category-dropdown .dropdown-toggle');
            if (moreToggle) {
                moreToggle.addEventListener('click', function(event) {
                    event.preventDefault();
                    if (window.innerWidth <= 991) {
                        this.parentElement.classList.toggle('show');
                    }
                });
            }

            if (window.bootstrap && bootstrap.Collapse) {
                collapseEl.addEventListener('hidden.bs.collapse', function() {
                    var activeDropdown = document.querySelector('.category-dropdown.show');
                    if (activeDropdown) {
                        activeDropdown.classList.remove('show');
                    }
                });
            }
        });