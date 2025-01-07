$('.slider').slick({
    centerMode: true, // Enables center mode
    centerPadding: '40px', // Space on the sides of the center slide
    dots: true, // Add navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at a time (1 main, 2 partial)
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // 3 seconds between slides
    responsive: [
        {
            breakpoint: 768, // For smaller screens
            settings: {
                slidesToShow: 1, // Show only 1 slide on small screens
                centerMode: true,
                centerPadding: '20px',
            }
        }
    ]
});