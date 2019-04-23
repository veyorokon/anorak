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
        return item["name"]

    def _safe_make_directory(self, path):
        if not os.path.exists(path):
            os.makedirs(path)
            return True
        return False

    def _save_svg(self, item, safeItemName):

        itemFileName = safeItemName+".svg"
        f = open(self.outputFolder+"/"+itemFileName,'wb')
        f.write(item["svg"])
        f.close()

    def process(self):
        for item in self.data:
            if item["name"]:
                safeItemName = self._get_safe_item_name(item)
                self._save_svg(item, safeItemName)
                print("Processed "+safeItemName)


if __name__ == "__main__":
    processor = ProcessJson('svgData.json', "svg")
    processor.process()
