/*!
=========================================================
* JohnDoe Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    });
});


// Resume Tabs Functionality
$(document).ready(function() {
    // Tab switching functionality
    $('.tab-btn').on('click', function() {
        var targetTab = $(this).data('tab');
        
        // Remove active class from all buttons and panes
        $('.tab-btn').removeClass('active');
        $('.tab-pane').removeClass('active');
        
        // Add active class to clicked button and corresponding pane
        $(this).addClass('active');
        $('#' + targetTab).addClass('active');
        
        // Animate skill bars when skills tab is shown
        if (targetTab === 'skills') {
            setTimeout(function() {
                $('.skill-progress').each(function() {
                    var width = $(this).data('width');
                    $(this).css('width', width);
                });
            }, 100);
        }
    });
    
    // Animate skill bars on page load if skills tab is active
    setTimeout(function() {
        if ($('#skills').hasClass('active')) {
            $('.skill-progress').each(function() {
                var width = $(this).data('width');
                $(this).css('width', width);
            });
        }
    }, 500);
    
    // Smooth scrolling for navigation links
    $('.navbar-nav .nav-link').on('click', function(e) {
        var target = $(this).attr('href');
        if (target.startsWith('#')) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800);
        }
    });
    
    // Add scroll effect to navbar
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.modern-navbar').addClass('scrolled');
        } else {
            $('.modern-navbar').removeClass('scrolled');
        }
    });
    
    // Portfolio filtering functionality
    $('.filter-btn').on('click', function() {
        var filter = $(this).data('filter');
        
        // Remove active class from all buttons
        $('.filter-btn').removeClass('active');
        // Add active class to clicked button
        $(this).addClass('active');
        
        // Filter portfolio cards
        if (filter === 'all') {
            $('.portfolio-card').fadeIn(500);
        } else {
            $('.portfolio-card').hide();
            $('.portfolio-card[data-category="' + filter + '"]').fadeIn(500);
        }
    });
    
    // Animated counter for statistics
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.data('count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }
    
    // Trigger counter animation when stats section is in view
    $(window).on('scroll', function() {
        var statsSection = $('.modern-stats');
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var sectionTop = statsSection.offset().top;
        
        if (scrollTop + windowHeight > sectionTop + 100) {
            if (!statsSection.hasClass('animated')) {
                statsSection.addClass('animated');
                animateCounters();
            }
        }
    });
    
    // Contact form submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        var form = $(this);
        var submitBtn = $('#submit-btn');
        var successMsg = $('#success-message');
        var errorMsg = $('#error-message');
        
        // Hide any previous messages
        successMsg.hide();
        errorMsg.hide();
        
        // Disable submit button and show loading state
        submitBtn.prop('disabled', true);
        submitBtn.html('<span>Sending...</span><i class="ti-time"></i>');
        
        // Submit form data via AJAX
        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                // Show success message
                successMsg.show();
                form[0].reset(); // Clear form
                
                // Reset button
                submitBtn.prop('disabled', false);
                submitBtn.html('<span>Send Message</span><i class="ti-arrow-right"></i>');
                
                // Scroll to success message
                $('html, body').animate({
                    scrollTop: successMsg.offset().top - 100
                }, 500);
            },
            error: function(xhr, status, error) {
                // Show error message
                errorMsg.show();
                
                // Reset button
                submitBtn.prop('disabled', false);
                submitBtn.html('<span>Send Message</span><i class="ti-arrow-right"></i>');
                
                // Scroll to error message
                $('html, body').animate({
                    scrollTop: errorMsg.offset().top - 100
                }, 500);
            }
        });
    });
});

// google maps
function initMap() {
// Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.674, lng: -73.945},
        zoom: 12,
        scrollwheel:  false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}
