(function ($) {

    this.Slider = function () {

        const defaults = {
            container: '.slider',
            slide: '.slider-item',
            loop: false,
            click: true,
            pan: true
        }

        this.options = (
            arguments[0] && typeof arguments[0] === 'object' ?
                { ...defaults, ...arguments[0] } :
                defaults
        )

        init.call(this);

    }

    Slider.prototype.slideTo = function (slide) {

        slide = $(slide)

        if (!slide.hasClass('active')) {

            const slider = slide.closest(this.options.container)

            if (slider && slider.length) {

                positionSlides.call(this, slider, slide)

            }

        }

    }

    function positionSlides(slider, activeSlide=null) {

        slider = $(slider)

        const slides = slider.find(this.options.slide)

        slides.removeClass('active prev next')

        activeSlide = (activeSlide && slides.index(activeSlide) !== -1 ? activeSlide : slides.first())

        activeSlide.css({ '--offset': '' }).addClass('active')

        const prev = prevSlide.call(this, slider, activeSlide)
        const next = nextSlide.call(this, slider, activeSlide)

        prev.css({ '--offset': '' }).addClass('prev')
        next.css({ '--offset': '' }).addClass('next')

        const beforePrev = prevSlide.call(this, slider, prev)
        const afterNext = nextSlide.call(this, slider, next)

        beforePrev.css({ '--offset': 'var(--prev-offset)' })
        afterNext.css({ '--offset': 'var(--next-offset)' })

    }

    function prevSlide(slider, slide) {

        const prevSlide = slide.prev(this.options.slide)

        if (this.options.loop && !prevSlide.length) {

            return slider.find(this.options.slide).last()

        }

        return prevSlide

    }

    function nextSlide(slider, slide) {

        const nextSlide = slide.next(this.options.slide)

        if (this.options.loop && !nextSlide.length) {

            return slider.find(this.options.slide).first()

        }

        return nextSlide

    }

    function init() {

        this.container = $(this.options.container)

        this.container.each( (idx, slider) => {

            positionSlides.call(this, slider)

        } )

        if (this.options.click) {

            this.container.find(this.options.slide).on('click', click.bind(this))

        }

        if (this.options.pan) {

            this.container.on('pointerdown', pointerDown.bind(this))

        }

    }

    function click(event) {

        const slide = $(event.currentTarget)

        const slider = slide.closest(this.options.container)

        if (!slider.data('prevent-click')) {

            this.slideTo(slide)

        }

    }

    function pointerDown(event) {

        const slider = $(event.currentTarget)
        const position = {
            x: event.clientX,
            y: event.clientY
        }

        slider.data('position', position).addClass('pan')

        $(document.body).addClass('slider-grabbed')

        if (this.options.click) {

            setTimeout(() => {

                if (slider.hasClass('pan')) {

                    slider.data('prevent-click', true)

                }

            }, 200)

        }

        $(window).on('pointermove', { slider }, pointerMove.bind(this))
        $(window).on('pointerup', { slider }, pointerUp.bind(this))
        $(window).on('pointercancel', { slider }, pointerUp.bind(this))

    }

    function pointerMove(event) {

        const slider = $(event.data.slider)

        const position = slider.data('position')

        const treshold = slider.width() * 0.05

        const offsetX = event.clientX - position.x

        const offsetInPixel = Math.max(Math.min(Math.abs(offsetX), treshold), 0)


        if (offsetX < 0) {

            slider.find(this.options.slide + '.active').css({ '--offset': `-${offsetInPixel}px` })

        } else {

            slider.find(this.options.slide + '.active').css({ '--offset': `${offsetInPixel}px` })

        }

    }

    function pointerUp(event) {

        const slider = $(event.data.slider)

        const activeSlide = slider.find(this.options.slide + '.active')

        const position = slider.data('position')

        const treshold = slider.width() * 0.05

        const offsetX = event.clientX - position.x

        const offsetY = event.clientY - position.y

        if (Math.abs(offsetY) < 100 && Math.abs(offsetX) > treshold) {

            const slide = (offsetX < 0 ? nextSlide.call(this, slider, activeSlide) : prevSlide.call(this, slider, activeSlide))

            if (slide && slide.length) {

                this.slideTo(slide)

            } else {

                activeSlide.css({ '--offset': '0' })

            }

        } else {

            activeSlide.css({ '--offset': '0' })

        }

        if (this.options.click) {

            setTimeout(() => {

                slider.data('prevent-click', false)

            }, 200)

        }

        slider.removeClass('pan')

        $(document.body).removeClass('slider-grabbed')

        $(window).off('pointermove pointerup pointercancel')

    }

})(jQuery);

(function ($) {

    $(function () {

        const slider = new Slider({
            container: '.card-slider',
            slide: '.card',
            loop: true
            // pan: false,
            // click: false
        })

    });

})(jQuery);