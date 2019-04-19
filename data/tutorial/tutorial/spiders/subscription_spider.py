import scrapy
import re
from scrapy import Selector

class SubscriptionSpider(scrapy.Spider):
    name = "subscription"
    start_urls = [
        'https://www.cratejoy.com/',
    ]
    # def parse(self, response):
        # categoriesSelector = "a.topLevelCategory-category"
        # categories = response.css(categoriesSelector)
        # siteMap = {}
        # siteMap['data'] = []
        # for category in categories:
        #     siteMap['data'].append({
        #         'href': category.css("::attr(href)").get(),
        #         'name': category.css("::text").get(),
        #     })
        #
        # print(siteMap)
        # filename = 'cratejoy-map.json'
        # with open(filename, 'wb') as f:
        #     f.write(str(siteMap))

    def parse(self, response):
        categoriesSelector = "a.topLevelCategory-category"
        categories = response.css(categoriesSelector)
        siteMap = {}
        siteMap['data'] = []
        for category in categories[1:]:
            href = category.css("::attr(href)").get()
            yield response.follow(href, self.parse_category)



    def parse_category(self, response):
        selectPagination = response.css("div #pagination-react")
        currentPage = int(selectPagination.css("::attr(data-cur-page)").get())
        totalPages = int(selectPagination.css("::attr(data-page-count)").get())
        nextPage = currentPage+1
        selectCategory = response.css("a.listingResults-sidebar-category.selected")
        rawCategory = selectCategory.css("::text").get()
        category = re.sub('[^A-Za-z0-9]+', ' ', rawCategory).strip()

        while nextPage <= totalPages:
            nextPageUrl = response.url + '?page=' + str(nextPage)
            yield response.follow(nextPageUrl, self.parse_item_list)
            print(category+" Page: "+str(nextPage)+" FINISHED")
            nextPage += 1

    def parse_item_list(self, response):
        items = response.css("div.listing-box")
        selectCategory = response.css("a.listingResults-sidebar-category.selected")
        rawCategory = selectCategory.css("::text").get()
        category = re.sub('[^A-Za-z0-9]+', ' ', rawCategory).strip()
        selectPagination = response.css("div #pagination-react")
        currentPage = int(selectPagination.css("::attr(data-cur-page)").get())

        for item in items:
            selectSubscriptionUrl = item.css("div.product-item")
            selectItemImage = item.css("img.listing-box-image")
            selectTitle = item.css("h5.listing-box-header a")
            selectDescription = item.css("div.product-brief-desc")
            selectItemPrice = item.css("span.listing-box-price-number")
            selectStarRating = item.css("div.RatingStars")
            selectRatingCount = item.css("div.listing-box-ratingCount")
            selectItemPage = item.css("a.normal-link")

            rawTitleText = selectTitle.css("::text").get()
            rawDescriptionText = selectDescription[0].css("::text").get()
            rawItemPrice = selectItemPrice.css("::text").get()
            rawStarRating = selectStarRating.css("::attr(data-stars)").get()
            rawRatingCount = selectRatingCount.css("::text").get()
            rawItemPage = selectItemPage.css("::attr(href)").get()

            itemImageUrl = selectItemImage.css("::attr(data-src)").get()
            subscriptionUrl = selectSubscriptionUrl.css("::attr(data-listing_url)").get()
            titleText = re.sub('\s+', ' ', rawTitleText).split("-")[0].strip()
            descriptionText = re.sub('[^A-Za-z0-9]+', ' ', rawDescriptionText).strip()
            itemPrice = rawItemPrice.replace('$','')
            startRating = rawStarRating
            ratingCount = rawRatingCount
            itemPageUrl = rawItemPage

            yield {
                'imageUrl': itemImageUrl,
                'subscriptionUrl': subscriptionUrl,
                'titleText': titleText,
                'descriptionText': descriptionText,
                'itemPrice': itemPrice,
                'startRating': startRating,
                'ratingCount': ratingCount,
                'itemPageUrl': itemPageUrl,
                'category': category,
                'page': currentPage
            }
