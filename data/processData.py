import requests
import json
import os
import time
from random import randint

class ProcessJson(object):

    def __init__(self, dataFile, outputFolder):
        self.dataFile = dataFile
        self.data = self._load_json()["data"]
        self.outputFolder = outputFolder
        self._safe_make_directory("./"+outputFolder)


    def _load_json(self):
        with open(self.dataFile) as json_data:
            data = json.load(json_data,)
        return data

    def _get_safe_item_name(self, item):
        lowerCaseName = item["titleText"].lower()
        safeItemName = "_".join(lowerCaseName.split(" "))
        return safeItemName

    def _safe_make_directory(self, path):
        if not os.path.exists(path):
            os.makedirs(path)
            return True
        return False

    def _make_item_folder(self, safeItemName):
        relPath = self.outputFolder+"/"+safeItemName
        imgPath = relPath+"/images"
        svgPath = relPath+"/svg"
        paths = [relPath, imgPath, svgPath]
        [self._safe_make_directory(path) for path in paths]
        return relPath

    def _download_image(self, item, safeItemName, itemPath):
        rawUrl = item["imageUrl"]
        imgUrl = rawUrl
        if(rawUrl[:2] == "//"):
            imgUrl = "http://"+rawUrl[2:]
        splitUrl = imgUrl.split(".")
        imgSuffix = splitUrl[len(splitUrl)-1]
        itemFileName = safeItemName+"."+imgSuffix
        f = open(itemPath+"/images/"+itemFileName,'wb')
        f.write(requests.get(imgUrl).content)
        f.close()

    def process(self):
        for item in self.data:
            safeItemName = self._get_safe_item_name(item)
            itemNotExist = self._safe_make_directory(self.outputFolder+"/"+safeItemName)

            if itemNotExist:
                itemPath = self._make_item_folder(safeItemName)
                self._download_image(item, safeItemName, itemPath)
                print("Processed "+safeItemName)
                # waitTime = randint(0, 9)
                # waitTime *= randint(0, 9)
                # time.sleep(waitTime)

if __name__ == "__main__":
    processor = ProcessJson('subscriptionData.json', "subscriptions")
    processor.process()
