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