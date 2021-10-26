/*!
 *
 * Evgeniy Ivanov - 2021
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var app = {
    pageScroll: '',
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= app.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= app.mdWidth && $(window).width() < app.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= app.smWidth && $(window).width() < app.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < app.smWidth; } // < 768
function isIOS() { return app.iOS(); } // for iPhone iPad iPod
function isTouch() { return app.touchDevice(); } // for touch device


$(document).ready(function() {
    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	// Запрет "отскока" страницы при клике по пустой ссылке с href="#"
	$('[href="#"]').click(function(event) {
		event.preventDefault();
	});

    checkOnResize();

});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (app.resized == windowWidth) { return; }
    app.resized = windowWidth;

	checkOnResize();
});

function checkOnResize() {
}

// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
function srollToId() {
    $('[data-scroll-to]').click( function(){
        let scrolled = $(this).attr('href');
        if ($(scrolled).length != 0) {
            $('html, body').animate({ scrollTop: $(scrolled).offset().top }, 500);
        }
        return false;
    });
}

function toggleTabs() {
    let toggle = $('[data-tab]');
    toggle.on('click', (e) => {
        let self = e.target;
        $('[data-tab]').removeClass('active');
        $(self).addClass('active');
        $('[data-plate]').removeClass('active');
        $('[data-plate='+self.dataset.tab+']').addClass('active');
    });
}
toggleTabs();

// Проверка направления прокрутки вверх/вниз
function checkDirectionScroll() {
    var tempScrollTop, currentScrollTop = 0;

    $(window).scroll(function(){
        currentScrollTop = $(window).scrollTop();

        if (tempScrollTop < currentScrollTop ) {
            app.pageScroll = "down";
        } else if (tempScrollTop > currentScrollTop ) {
            app.pageScroll = "up";
        }
        tempScrollTop = currentScrollTop;

    });
}
checkDirectionScroll();

function toggleDropdown() {
    let drop = '.js-drop';

    $(drop).on('click', function() {
        $(this).toggleClass('open');
    });

    $('.js-drop-list').on('mouseleave', function() {
        $(this).closest(drop).removeClass('open');
    });

    $('body').on('click', function(e){
        if ( $(e.target).closest(drop).length ) {
            return;
        }
        $(drop).removeClass('open');
    });
}
toggleDropdown();

function toggleSubMenu() {
    $('.submenu__curent').on('click', function() {
        $(this).closest('.submenu').toggleClass('open');
    });
}
toggleSubMenu();

function collapsed() {
    let toggle = $('[data-collapse]');

    toggle.on('click', function() {
        let id = $(this).data('collapse'),
            body = $('[data-collapse-body="'+id+'"]'),
            wrap = body.closest('[data-collapse-wrapper]');

        if (id === 'all') {
            $('[data-collapse-wrapper]').removeClass('open');
            $('[data-collapse-body]').slideUp();
        } else {
            wrap.toggleClass('open');
            body.slideToggle();
        }


    });
}
collapsed();
