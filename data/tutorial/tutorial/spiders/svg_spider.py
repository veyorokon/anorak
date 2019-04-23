import scrapy


class SvgsSpider(scrapy.Spider):
    name = "svgs"
    start_urls = [
        'https://zeit.co/design/icons',
    ]

    def parse(self, response):
        for svg in response.css('svg'):
            aria = svg.css("::attr(aria-label)")
            name = None
            ariaData = None
            if aria.get():
                name = "".join(aria.get().title().split(" "))
                ariaData = aria.get()
            svgData = svg.get()
            yield {
                'name':name,
                'aria': ariaData,
                'svg': svgData
            }
